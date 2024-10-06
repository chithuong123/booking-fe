import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginApi } from '../api/authApi';

// Worker saga để xử lý đăng nhập
function* loginSaga(action) {
  try {
    const response = yield call(loginApi, action.payload);
    const token = `Bearer ${response.data.token}`;  // Thêm tiền tố "Bearer "
    localStorage.setItem('token', token);  // Lưu token vào localStorage
    axios.defaults.headers.common['Authorization'] = token;  // Thiết lập header Authorization
    yield put({ type: 'LOGIN_SUCCESS', payload: { message: response.data.message } });
  } catch (error) {
    const errorMsg = error.response?.data?.errors?.join(', ') || 'There was an error logging in!';
    yield put({ type: 'LOGIN_FAILURE', payload: { error: errorMsg } });
  }
}

// Watcher saga: theo dõi LOGIN_REQUEST
export default function* watchLoginSaga() {
  yield takeLatest('LOGIN_REQUEST', loginSaga);
}
