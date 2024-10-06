// Action types
export const FETCH_AGENCIES_REQUEST = 'FETCH_AGENCIES_REQUEST';
export const FETCH_AGENCIES_SUCCESS = 'FETCH_AGENCIES_SUCCESS';
export const FETCH_AGENCIES_FAILURE = 'FETCH_AGENCIES_FAILURE';

export const FETCH_SERVICES_REQUEST = 'FETCH_SERVICES_REQUEST';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_FAILURE = 'FETCH_SERVICES_FAILURE';

export const FETCH_SERVICE_DETAILS_REQUEST = 'FETCH_SERVICE_DETAILS_REQUEST';
export const FETCH_SERVICE_DETAILS_SUCCESS = 'FETCH_SERVICE_DETAILS_SUCCESS';
export const FETCH_SERVICE_DETAILS_FAILURE = 'FETCH_SERVICE_DETAILS_FAILURE';

export const FETCH_AGENCY_IMAGE_REQUEST = 'FETCH_AGENCY_IMAGE_REQUEST';
export const FETCH_AGENCY_IMAGE_SUCCESS = 'FETCH_AGENCY_IMAGE_SUCCESS';
export const FETCH_AGENCY_IMAGE_FAILURE = 'FETCH_AGENCY_IMAGE_FAILURE';

// Action creators
export const fetchAgenciesRequest = () => ({ type: FETCH_AGENCIES_REQUEST });
export const fetchServicesRequest = (agencyId) => ({ type: FETCH_SERVICES_REQUEST, payload: agencyId });
export const fetchServiceDetailsRequest = (serviceId) => ({ type: FETCH_SERVICE_DETAILS_REQUEST, payload: serviceId });

// Action creators
export const fetchAgencyImageRequest = () => ({
  type: FETCH_AGENCY_IMAGE_REQUEST,
});

export const fetchAgencyImageSuccess = (image) => ({
  type: FETCH_AGENCY_IMAGE_SUCCESS,
  payload: image,
});

export const fetchAgencyImageFailure = (error) => ({
  type: FETCH_AGENCY_IMAGE_FAILURE,
  payload: error,
});