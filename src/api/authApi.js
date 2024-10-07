// src/api/authApi.js
import axios from 'axios';
import API_ENDPOINTS from './endpoints'; // Import các API endpoints

// Hàm gọi API đăng nhập
export const loginApi = (credentials) => {
  return axios.post(API_ENDPOINTS.LOGIN, credentials);
};

// Hàm gọi API đăng ký
export const registerApi = (data) => {
  return axios.post(API_ENDPOINTS.REGISTER, data);
};

// Hàm gọi API lấy thông tin người dùng
export const fetchProfileApi = () => {
  return axios.get(API_ENDPOINTS.PROFILE);
};
