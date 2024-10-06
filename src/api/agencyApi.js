import axios from 'axios';
import API_ENDPOINTS from './endpoints';

// Hàm lấy danh sách agencies
export const fetchAgenciesApi = () => {
  return axios.get(API_ENDPOINTS.AGENCIES);
};

// Hàm lấy danh sách services của một agency
export const fetchServicesByAgencyApi = (agencyId) => {
  return axios.get(`${API_ENDPOINTS.SERVICES_BY_AGENCY}/${agencyId}`);
};

// Hàm lấy chi tiết một service
export const fetchServiceDetailsApi = (serviceId) => {
  return axios.get(`${API_ENDPOINTS.SERVICE_DETAILS}/${serviceId}`);
};

export const fetchAgencyImageApi = () => axios.get(API_ENDPOINTS.AGENCIES); // Tương tự như phần trước
