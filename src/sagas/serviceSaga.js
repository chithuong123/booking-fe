import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_SERVICE_DETAIL_REQUEST,
  fetchServiceDetailSuccess,
  fetchServiceDetailFailure,
} from '../actions/serviceActions';
import { fetchServiceDetailApi } from '../api/serviceApi';

function* fetchServiceDetailSaga(action) {
  try {
    const response = yield call(fetchServiceDetailApi, action.payload);
    yield put(fetchServiceDetailSuccess(response.data));
  } catch (error) {
    yield put(fetchServiceDetailFailure(error.message));
  }
}

export default function* watchServiceSaga() {
  yield takeLatest(FETCH_SERVICE_DETAIL_REQUEST, fetchServiceDetailSaga);
}
