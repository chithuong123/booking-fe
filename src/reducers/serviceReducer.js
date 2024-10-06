const initialState = {
  serviceDetail: null,
  loading: false,
  error: null,
};

export default function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_SERVICE_DETAIL_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_SERVICE_DETAIL_SUCCESS':
      return { ...state, serviceDetail: action.payload, loading: false };
    case 'FETCH_SERVICE_DETAIL_FAILURE':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
