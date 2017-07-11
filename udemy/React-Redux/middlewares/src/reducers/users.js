import { FETCH_USERS_SUCCESS } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_USERS_SUCCESS:
      return [...state, ...action.payload.data];
    default:
      return state;
  }
}
