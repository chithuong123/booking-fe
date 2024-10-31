import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  REGISTER_USER_REQUEST,
  registerUserSuccess,
  registerUserFailure
} from '../actions/registerActions';
import { setAuthStatus } from '../actions/authActions'; // Action để cập nhật trạng thái isLoggedIn
import { registerUserApi } from '../api/registerApi';  // Import hàm API

// Worker saga: Thực hiện khi action REGISTER_USER_REQUEST được dispatch
function* registerUserSaga(action) {
  try {
    const response = yield call(registerUserApi, action.payload);
    const token = `Bearer ${response.data.token}`;  // Thêm tiền tố "Bearer "
    localStorage.setItem('token', token);  // Lưu token vào localStorage
    axios.defaults.headers.common['Authorization'] = token;  // Thiết lập header Authorization
    yield put(registerUserSuccess(response.data.message));

    // Cập nhật trạng thái isLoggedIn
    yield put(setAuthStatus(true));  // Cập nhật trạng thái đăng nhập

    // Điều hướng về trang chủ sau khi đăng ký thành công
    window.location.href = '/';
  } catch (error) {
    // Kiểm tra lỗi 400 và thông báo "Email already exists"
    const errorMessage =
      error.response?.status === 400 && error.response?.data?.errors?.includes("Email already exists")
        ? 'Email đã tồn tại. Vui lòng chọn email khác.'
        : error.response?.data?.errors?.join(', ') || 'Đã xảy ra lỗi khi đăng ký!';

    yield put(registerUserFailure(errorMessage));
  }
}

// Watcher saga
export default function* watchRegisterSaga() {
  yield takeLatest(REGISTER_USER_REQUEST, registerUserSaga);
}
