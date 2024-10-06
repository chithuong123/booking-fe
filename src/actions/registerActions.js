// src/actions/registerActions.js

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

// Action creators cho đăng ký
export const registerUserRequest = (userData) => ({
  type: REGISTER_USER_REQUEST,
  payload: userData,
});

export const registerUserSuccess = (message) => ({
  type: REGISTER_USER_SUCCESS,
  payload: message,
});

export const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});
