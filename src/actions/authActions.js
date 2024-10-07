// src/actions/authActions.js

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS';

// Action creator để yêu cầu đăng nhập
export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

// Action creator khi đăng nhập thành công
export const loginSuccess = (message) => ({
  type: LOGIN_SUCCESS,
  payload: message,
});

// Action creator khi đăng nhập thất bại
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Action creator để đăng xuất
export const logout = () => {
  localStorage.removeItem('token');  // Xóa token khỏi localStorage khi logout
  return { type: LOGOUT };
};

// Action creator để cập nhật trạng thái đăng nhập
export const setAuthStatus = (isLoggedIn) => ({
  type: SET_AUTH_STATUS,
  payload: isLoggedIn,
});
