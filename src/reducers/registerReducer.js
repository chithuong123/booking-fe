// src/reducers/registerReducer.js

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'REGISTER_USER_SUCCESS':
      return { ...state, loading: false, successMessage: action.payload };
    case 'REGISTER_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
