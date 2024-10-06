const initialState = {
  agencies: [],
  services: [],
  serviceDetails: null,
  image: '',
  loading: false,
  error: null,
};

export default function agencyReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_AGENCIES_REQUEST':
    case 'FETCH_SERVICES_REQUEST':
    case 'FETCH_SERVICE_DETAILS_REQUEST':
    case 'FETCH_AGENCY_IMAGE_REQUEST':  // Thêm cho request hình ảnh
      return { ...state, loading: true, error: null };

    case 'FETCH_AGENCIES_SUCCESS':
      return { ...state, agencies: action.payload, loading: false };

    case 'FETCH_SERVICES_SUCCESS':
      return { ...state, services: action.payload, loading: false };

    case 'FETCH_SERVICE_DETAILS_SUCCESS':
      return { ...state, serviceDetails: action.payload, loading: false };

    case 'FETCH_AGENCY_IMAGE_SUCCESS':  // Thêm cho thành công lấy hình ảnh
      return { ...state, image: action.payload, loading: false };

    case 'FETCH_AGENCIES_FAILURE':
    case 'FETCH_SERVICES_FAILURE':
    case 'FETCH_SERVICE_DETAILS_FAILURE':
    case 'FETCH_AGENCY_IMAGE_FAILURE':  // Thêm cho thất bại lấy hình ảnh
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
