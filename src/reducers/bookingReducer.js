const initialState = {
  bookings: [],
  loading: false,
  error: null,
  success: false,  // Thêm trạng thái để biết khi nào việc tạo booking thành công
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    // Xử lý khi fetch bookings
    case 'FETCH_BOOKINGS_REQUEST':
      return { ...state, loading: true, error: null, success: false };
    case 'FETCH_BOOKINGS_SUCCESS':
      return { ...state, bookings: action.payload, loading: false, error: null };
    case 'FETCH_BOOKINGS_FAILURE':
      return { ...state, loading: false, error: action.payload, success: false };

    // Xử lý khi tạo booking mới
    case 'CREATE_BOOKING_REQUEST':
      return { ...state, loading: true, error: null, success: false };
    case 'CREATE_BOOKING_SUCCESS':
      return { ...state, loading: false, error: null, success: true };
    case 'CREATE_BOOKING_FAILURE':
      return { ...state, loading: false, error: action.payload, success: false };

    default:
      return state;
  }
}
