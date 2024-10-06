// src/sagas/profileSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchProfileApi, updateProfileApi, updatePasswordApi } from '../api/profileApi';

// Actions
const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

// Saga fetch profile
function* fetchProfileSaga() {
  try {
    const response = yield call(fetchProfileApi);
    yield put({ type: FETCH_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_PROFILE_FAILURE, payload: error.message });
  }
}

// Saga update profile
function* updateProfileSaga(action) {
  try {
    yield call(updateProfileApi, action.payload);
    yield put({ type: UPDATE_PROFILE_SUCCESS });
  } catch (error) {
    yield put({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
  }
}

// Saga update password
function* updatePasswordSaga(action) {
  try {
    yield call(updatePasswordApi, action.payload);
    yield put({ type: UPDATE_PASSWORD_SUCCESS });
  } catch (error) {
    yield put({ type: UPDATE_PASSWORD_FAILURE, payload: error.message });
  }
}

// Watcher saga
export default function* watchProfileSaga() {
  yield takeLatest(FETCH_PROFILE_REQUEST, fetchProfileSaga);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfileSaga);
  yield takeLatest(UPDATE_PASSWORD_REQUEST, updatePasswordSaga);
}
