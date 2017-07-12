import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER } from './types';

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
        
        // -Redirect to /feature route
        browserHistory.push('/feature');
      })
      .catch(err => {

      });

    

    // If the request is bad...
    // -Update the error value in the store/display it
  }
}
