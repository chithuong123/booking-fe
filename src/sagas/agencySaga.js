import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_AGENCIES_REQUEST, FETCH_AGENCIES_SUCCESS, FETCH_AGENCIES_FAILURE,
  FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FAILURE,
  FETCH_SERVICE_DETAILS_REQUEST, FETCH_SERVICE_DETAILS_SUCCESS, FETCH_SERVICE_DETAILS_FAILURE,
  FETCH_AGENCY_IMAGE_REQUEST, fetchAgencyImageSuccess, fetchAgencyImageFailure
} from '../actions/agencyActions';

import {
  fetchAgenciesApi,
  fetchServicesByAgencyApi,
  fetchServiceDetailsApi,
  fetchAgencyImageApi
} from '../api/agencyApi';  // Import các hàm API từ api/agencyApi

// Worker saga: Lấy danh sách agencies
function* fetchAgenciesSaga() {
  try {
    const response = yield call(fetchAgenciesApi);
    if (response.status === 200) {
      yield put({ type: FETCH_AGENCIES_SUCCESS, payload: response.data });
    } else {
      throw new Error('Không thể lấy danh sách agencies.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put({ type: FETCH_AGENCIES_FAILURE, payload: errorMessage });
  }
}

// Worker saga: Lấy danh sách services của một agency
function* fetchServicesSaga(action) {
  try {
    const response = yield call(fetchServicesByAgencyApi, action.payload);
    if (response.status === 200) {
      yield put({ type: FETCH_SERVICES_SUCCESS, payload: response.data });
    } else {
      throw new Error('Không thể lấy danh sách dịch vụ của agency.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put({ type: FETCH_SERVICES_FAILURE, payload: errorMessage });
  }
}

// Worker saga: Lấy chi tiết một service
function* fetchServiceDetailsSaga(action) {
  try {
    const response = yield call(fetchServiceDetailsApi, action.payload);
    if (response.status === 200) {
      yield put({ type: FETCH_SERVICE_DETAILS_SUCCESS, payload: response.data });
    } else {
      throw new Error('Không thể lấy chi tiết dịch vụ.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put({ type: FETCH_SERVICE_DETAILS_FAILURE, payload: errorMessage });
  }
}

function* fetchAgencyImageSaga() {
  try {
    const response = yield call(fetchAgencyImageApi);
    const agencies = response.data;

    if (agencies.length > 0) {
      const images = agencies.flatMap((agency) => {
        if (typeof agency.image === "string") {
          return agency.image.split(","); // Tách chuỗi thành mảng URL
        }
        return agency.image || []; // Nếu đã là mảng, trả về trực tiếp
      });

      if (images.length > 0) {
        yield put(fetchAgencyImageSuccess(images));
      } else {
        yield put(fetchAgencyImageFailure("Không có hình ảnh cho các agencies này."));
      }
    } else {
      yield put(fetchAgencyImageFailure("Danh sách agencies trống."));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Không thể tải hình ảnh.";
    yield put(fetchAgencyImageFailure(errorMessage));
  }
}

// Watcher saga
export default function* watchAgencySaga() {
  yield takeLatest(FETCH_AGENCIES_REQUEST, fetchAgenciesSaga);
  yield takeLatest(FETCH_SERVICES_REQUEST, fetchServicesSaga);
  yield takeLatest(FETCH_SERVICE_DETAILS_REQUEST, fetchServiceDetailsSaga);
  yield takeLatest(FETCH_AGENCY_IMAGE_REQUEST, fetchAgencyImageSaga);  // Watcher cho FETCH_AGENCY_IMAGE_REQUEST
}
