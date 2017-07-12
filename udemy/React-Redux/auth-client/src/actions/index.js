import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
} from './types';

const API_URL = 'http://localhost:3000';

export function signinUser({ email, password}) {
  return (dispatch) => {
    // Submit email/pass to server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(res => {
        // If the credentials are good...
        // -Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // -Save the JWT for later use
        localStorage.setItem('token', res.data.token);
        // -Redirect to /feature route
        browserHistory.push('/feature');
      })
      .catch(err => {
        dispatch(authError('Bad login!')); // Update this later
      });

    // If the request is bad...
    // -Update the error value in the store/display it
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signoutUser() {
  // When the user logs out:
  // -Clear the JWT from local storage
  localStorage.removeItem('token');
  // -Dispatch the action to set the user auth state to false
  return { type: UNAUTH_USER };
}
