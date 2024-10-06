// Action types cho GET bookings
export const FETCH_BOOKINGS_REQUEST = 'FETCH_BOOKINGS_REQUEST';
export const FETCH_BOOKINGS_SUCCESS = 'FETCH_BOOKINGS_SUCCESS';
export const FETCH_BOOKINGS_FAILURE = 'FETCH_BOOKINGS_FAILURE';

// Action types cho POST booking (tạo booking mới)
export const CREATE_BOOKING_REQUEST = 'CREATE_BOOKING_REQUEST';
export const CREATE_BOOKING_SUCCESS = 'CREATE_BOOKING_SUCCESS';
export const CREATE_BOOKING_FAILURE = 'CREATE_BOOKING_FAILURE';

// Action creators cho GET bookings
export const fetchBookingsRequest = () => ({
  type: FETCH_BOOKINGS_REQUEST,
});

export const fetchBookingsSuccess = (bookings) => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const fetchBookingsFailure = (error) => ({
  type: FETCH_BOOKINGS_FAILURE,
  payload: error,
});

// Action creators cho POST booking (tạo booking mới)
export const createBookingRequest = (bookingData) => ({
  type: CREATE_BOOKING_REQUEST,
  payload: bookingData,
});

export const createBookingSuccess = () => ({
  type: CREATE_BOOKING_SUCCESS,
});

export const createBookingFailure = (error) => ({
  type: CREATE_BOOKING_FAILURE,
  payload: error,
});
