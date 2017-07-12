import { 
  AUTH_USER,
  UNAUTH_USER,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      console.log('User authenticated');
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      console.log('User un-authenticated');
      return { ...state, authenticated: false };
    default:
      return state;
  }
}
