// src/api/profileApi.js
import axios from 'axios';
import API_ENDPOINTS from './endpoints';  // Import các API endpoints

// Hàm lấy thông tin profile
export const fetchProfileApi = () => {
  const token = localStorage.getItem('token');
  return axios.get(API_ENDPOINTS.PROFILE, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Hàm cập nhật thông tin profile
export const updateProfileApi = (profile) => {
  const token = localStorage.getItem('token');
  return axios.put(API_ENDPOINTS.PROFILE, profile, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Hàm cập nhật mật khẩu
export const updatePasswordApi = (passwords) => {
  const token = localStorage.getItem('token');
  return axios.put(API_ENDPOINTS.UPDATE_PASSWORD, passwords, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
