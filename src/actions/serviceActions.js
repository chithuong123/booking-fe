// Action types
export const FETCH_SERVICE_DETAIL_REQUEST = 'FETCH_SERVICE_DETAIL_REQUEST';
export const FETCH_SERVICE_DETAIL_SUCCESS = 'FETCH_SERVICE_DETAIL_SUCCESS';
export const FETCH_SERVICE_DETAIL_FAILURE = 'FETCH_SERVICE_DETAIL_FAILURE';

// Action creators
export const fetchServiceDetailRequest = (serviceId) => (
  {
  type: FETCH_SERVICE_DETAIL_REQUEST,
  payload: serviceId,
});

export const fetchServiceDetailSuccess = (serviceDetail) => ({
  type: FETCH_SERVICE_DETAIL_SUCCESS,
  payload: serviceDetail,
});

export const fetchServiceDetailFailure = (error) => ({
  type: FETCH_SERVICE_DETAIL_FAILURE,
  payload: error,
});
