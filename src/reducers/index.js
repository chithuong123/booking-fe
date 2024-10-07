// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import agencyReducer from './agencyReducer';
import bookingReducer from './bookingReducer';
import registerReducer from './registerReducer';
import serviceReducer from './serviceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  agency: agencyReducer,
  booking: bookingReducer,
  register: registerReducer,
  service: serviceReducer,
});

export default rootReducer;
