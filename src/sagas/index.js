// src/sagas/index.js
import { all } from 'redux-saga/effects';
import authSaga from './authSaga';  // Import mặc định
import watchProfileSaga from './profileSaga';  // Import profile saga
import watchAgencySaga from './agencySaga';
import watchBookingSaga from './bookingSaga';
import watchRegisterSaga from './registerSaga';
import watchServiceSaga from './serviceSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    watchProfileSaga(),
    watchAgencySaga(),
    watchBookingSaga(),
    watchRegisterSaga(),
    watchServiceSaga(),
  ]);
}
