import axios from "axios";
import { BACKEND_URL } from '@env';
import { getAccessToken } from "./tokenStorage";


const api = axios.create({
  baseURL: BACKEND_URL, // 백엔드 API 주소
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// // 토큰 자동 포함 (선택)
api.interceptors.request.use(async(config) => {
  // const token = await getAccessToken(); // 필요시 AsyncStorage에서 불러오기
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwicm9sZSI6IkFETUlOIiwidHlwZSI6IkFDQ0VTUyIsImlhdCI6MTc1MzY3NTY3NywiZXhwIjoxNzUzNjc5Mjc3fQ.VAFfBMfXTzW2g4UxI5tn6yXJ7REWG8drvs3t3Th8l76V_5_T3lVOsl7vVjn8T5t6J-SW18go3KwVd1J0OwGefg"
  if (token) {
    // console.log("header token:  ",token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;