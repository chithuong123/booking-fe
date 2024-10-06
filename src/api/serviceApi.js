import axios from 'axios';
import API_ENDPOINTS from './endpoints';

// Hàm để lấy chi tiết của một dịch vụ
export const fetchServiceDetailApi = (serviceId) => {
  return axios.get(`${API_ENDPOINTS.SERVICE_DETAILS}/${serviceId}`);
};
