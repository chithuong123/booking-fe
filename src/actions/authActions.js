// src/actions/authActions.js

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS';

// Action creators cho đăng nhập
export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (message) => ({
  type: LOGIN_SUCCESS,
  payload: message,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setAuthStatus = (isLoggedIn) => ({
  type: SET_AUTH_STATUS,
  payload: isLoggedIn,
});
