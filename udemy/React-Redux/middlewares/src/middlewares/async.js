import axios from 'axios';

export default function({ dispatch }) {
  return next => action => {
    // If the action is not a promise, don't interact with it, just pass it along
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // This action has a promise, wait for it to resolve, then dispatch a new action
    // with the resolved Promise's data as the payload
    action.payload
      .then(response => dispatch({ ...action, payload: response}));
  }
}
