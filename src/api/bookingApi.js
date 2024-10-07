import axios from 'axios';
import API_ENDPOINTS from './endpoints';  // Import các API endpoints

// Hàm lấy danh sách bookings
export const fetchBookingsApi = () => {
  const token = localStorage.getItem('token');
  return axios.get(API_ENDPOINTS.GET_BOOKINGS, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const createBookingApi = (bookingData) => {
  const token = localStorage.getItem('token');
  return axios.post(API_ENDPOINTS.CREATE_BOOKING, bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
