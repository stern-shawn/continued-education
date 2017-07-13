import { 
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      console.log('User authenticated');
      return { ...state, authenticated: true, error: '' };
    case UNAUTH_USER:
      console.log('User un-authenticated');
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      console.log('Error in log-in');
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
