import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_BOOKINGS_REQUEST, FETCH_BOOKINGS_SUCCESS, FETCH_BOOKINGS_FAILURE,
  CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAILURE
} from '../actions/bookingActions';
import { fetchBookingsApi, createBookingApi } from '../api/bookingApi';  // Import các hàm API

// Worker saga: Thực hiện khi action FETCH_BOOKINGS_REQUEST được dispatch
function* fetchBookingsSaga() {
  try {
    console.log("Fetching bookings...");  // Log để kiểm tra saga có được gọi
    const response = yield call(fetchBookingsApi);
    console.log("Bookings fetched:", response.data);  // Log kết quả trả về
    yield put({ type: FETCH_BOOKINGS_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put({ type: FETCH_BOOKINGS_FAILURE, payload: errorMessage });
  }
}

// Worker saga: Thực hiện khi action CREATE_BOOKING_REQUEST được dispatch
function* createBookingSaga(action) {
  try {
    yield call(createBookingApi, action.payload);  // Gọi API để tạo booking mới
    yield put({ type: CREATE_BOOKING_SUCCESS });   // Dispatch success action khi tạo thành công
    alert('Đặt lịch thành công!');  // Hiển thị thông báo thành công (nếu cần)
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put({ type: CREATE_BOOKING_FAILURE, payload: errorMessage });
  }
}

// Watcher saga: Theo dõi các action
export default function* watchBookingSaga() {
  yield takeLatest(FETCH_BOOKINGS_REQUEST, fetchBookingsSaga);  // Theo dõi action fetch bookings
  yield takeLatest(CREATE_BOOKING_REQUEST, createBookingSaga);  // Theo dõi action create booking
}
