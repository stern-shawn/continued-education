import axios from 'axios';

const API_URL = 'http://localhost:3000';

export function signinUser({ email, password}) {
  return (dispatch) => {
    // Submit email/pass to server
    axios.post(`${API_URL}/signin`, { email, password });

    // If the credentials are good...
    // -Update state to indicate user is authenticated
    // -Save the JWT for later use
    // -Redirect to /feature route

    // If the request is bad...
    // -Update the error value in the store/display it
  }
}
