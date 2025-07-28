import axios from "axios";
import { BACKEND_URL } from '@env';
import { 
  getAccessToken, 
  getRefreshToken,
  saveAccessToken,
  deleteTokens,
} from "./tokenStorage";


const api = axios.create({
  baseURL: BACKEND_URL, // 백엔드 API 주소
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};


// // 토큰 자동 포함 (선택)
api.interceptors.request.use(async(config) => {
  // await deleteTokens();
  const token = await getAccessToken(); 
  // const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMSIsInJvbGUiOiJVU0VSIiwidHlwZSI6IkFDQ0VTUyIsImlhdCI6MTc1MzcwNjAzOCwiZXhwIjoxNzUzNzA5NjM4fQ.V1ha2MpraJ24Yv9WCRIjarRe-xLP3j6X1zzlg7FpzDeL-121WKc8zOWIJ5pTee4SWiQr6xVnpwYlIrhkI2Ic1w"
  if (token) {
    console.log("header token:  ",token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ 응답 인터셉터: accessToken 만료 시 → refreshToken으로 재발급
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // accessToken 만료(401) + 중복 재시도 방지
    if (error.response?.status === 401 && error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: token => {
              originalRequest.headers.Authorization = "Bearer " + token;
              resolve(api(originalRequest));
            },
            reject: err => {
              reject(err);
            },
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token found");

        const res = await axios.post(`${BACKEND_URL}/api/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        await saveAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // 💥 재시도
      } catch (refreshError) {
        processQueue(refreshError, null);
        await deleteTokens(); // 모든 토큰 삭제
        // ❗ 여기에 로그아웃 처리나 로그인 페이지 이동 로직 넣을 수 있음
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export default api;