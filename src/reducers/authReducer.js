// src/reducers/authReducer.js

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, isLoggedIn: true };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false };
    case 'SET_AUTH_STATUS':
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
}
