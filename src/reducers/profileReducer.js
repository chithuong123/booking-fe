// src/reducers/profileReducer.js

const initialState = {
  profile: {
    username: '',
    email: '',
  },
  loading: false,
  error: null,
  passwordSuccess: null,
  passwordError: null,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROFILE_REQUEST':
    case 'UPDATE_PROFILE_REQUEST':
    case 'UPDATE_PASSWORD_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_PROFILE_SUCCESS':
      return { ...state, profile: action.payload, loading: false };

    case 'FETCH_PROFILE_FAILURE':
    case 'UPDATE_PROFILE_FAILURE':
    case 'UPDATE_PASSWORD_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_PASSWORD_SUCCESS':
      return { ...state, loading: false, passwordSuccess: 'Password updated successfully' };

    case 'UPDATE_PROFILE_SUCCESS':
      return { ...state, loading: false };

    default:
      return state;
  }
}
