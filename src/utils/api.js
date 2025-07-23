import axios from "axios";


const api = axios.create({
  baseURL: 'https://chungnam4team-g9e7dze4hhdnhccg.koreacentral-01.azurewebsites.net', // 백엔드 API 주소
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// // 토큰 자동 포함 (선택)
// api.interceptors.request.use((config) => {
//   const token = 'your-access-token'; // 필요시 AsyncStorage에서 불러오기
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


export default api;