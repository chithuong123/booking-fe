const BASE_URL = 'http://localhost:3001';

const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  PROFILE: `${BASE_URL}/api/profile`,
  UPDATE_PASSWORD: `${BASE_URL}/api/profile/password`,
  AGENCIES: `${BASE_URL}/api/agencies`,
  SERVICES_BY_AGENCY: `${BASE_URL}/api/services/agency`,
  SERVICE_DETAILS: `${BASE_URL}/api/services`,
  GET_BOOKINGS: `${BASE_URL}/api/bookings/user`,  // GET danh sách bookings của user
  CREATE_BOOKING: `${BASE_URL}/api/bookings`,  // POST để tạo booking mới
  REGISTER: `${BASE_URL}/api/auth/register`,
};

export default API_ENDPOINTS;
