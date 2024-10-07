import axios from 'axios';
import API_ENDPOINTS from './endpoints';  // Sử dụng các endpoint từ endpoints.js

// Hàm đăng ký người dùng mới
export const registerUserApi = (userData) => {
  return axios.post(API_ENDPOINTS.REGISTER, userData);
};
