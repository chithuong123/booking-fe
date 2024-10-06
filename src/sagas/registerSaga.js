import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  REGISTER_USER_REQUEST,
  registerUserSuccess,
  registerUserFailure
} from '../actions/registerActions';
import { registerUserApi } from '../api/registerApi';  // Import hàm API

// Worker saga: Thực hiện khi action REGISTER_USER_REQUEST được dispatch
function* registerUserSaga(action) {
  try {
    const response = yield call(registerUserApi, action.payload);
    const token = `Bearer ${response.data.token}`;  // Thêm tiền tố "Bearer "
    localStorage.setItem('token', token);  // Lưu token vào localStorage
    axios.defaults.headers.common['Authorization'] = token;  // Thiết lập header Authorization
    yield put(registerUserSuccess(response.data.message));
  } catch (error) {
    const errorMessage = error.response?.data?.errors?.join(', ') || 'There was an error registering the user!';
    yield put(registerUserFailure(errorMessage));
  }
}

// Watcher saga
export default function* watchRegisterSaga() {
  yield takeLatest(REGISTER_USER_REQUEST, registerUserSaga);
}
