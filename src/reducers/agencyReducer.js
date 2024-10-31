const initialState = {
  agencies: [],
  services: [],
  serviceDetails: null,
  image: '',    // Lưu một ảnh duy nhất (nếu cần)
  images: [],   // Lưu danh sách nhiều ảnh
  loading: false,
  error: null,
};

export default function agencyReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_AGENCIES_REQUEST':
    case 'FETCH_SERVICES_REQUEST':
    case 'FETCH_SERVICE_DETAILS_REQUEST':
    case 'FETCH_AGENCY_IMAGE_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_AGENCIES_SUCCESS':
      return { ...state, agencies: action.payload, loading: false };

    case 'FETCH_SERVICES_SUCCESS':
      return { ...state, services: action.payload, loading: false };

    case 'FETCH_SERVICE_DETAILS_SUCCESS':
      return { ...state, serviceDetails: action.payload, loading: false };

    case 'FETCH_AGENCY_IMAGE_SUCCESS':
      return {
        ...state,
        image: action.payload[0] || '',       // Gán ảnh đầu tiên cho `image` nếu cần
        images: action.payload || [],         // Gán toàn bộ mảng vào `images`
        loading: false
      };

    case 'FETCH_AGENCIES_FAILURE':
    case 'FETCH_SERVICES_FAILURE':
    case 'FETCH_SERVICE_DETAILS_FAILURE':
    case 'FETCH_AGENCY_IMAGE_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
