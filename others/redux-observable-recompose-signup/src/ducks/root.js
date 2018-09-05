import { combineReducers } from 'redux';
import signupDuck from '../features/Signup/Signup.duck';

export default combineReducers({
  signup: signupDuck.reducer,
});
