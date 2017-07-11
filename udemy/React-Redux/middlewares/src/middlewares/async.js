import axios from 'axios';
import { FETCH_USERS, FETCH_USERS_SUCCESS } from '../actions/types';

export default function({ dispatch }) {
  return next => action => {
    // If the action is not of type FETCH_USERS, don't interact with it; pass on to next middleware
    if (action.type !== FETCH_USERS) {
      return next(action);
    }

    // This action is the type we want to intercept. Perform the axios request for data,
    // and dispatch a new success action with the response once the request resolves
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => dispatch({ type: FETCH_USERS_SUCCESS, payload: response}));
  }
}
