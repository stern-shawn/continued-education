import { RECEIVED_BEERS, SEARCHED_BEERS } from '../actions';

const initialState = {
  beers: [],
  loading: false,
};

export default function beersReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCHED_BEERS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVED_BEERS:
      return {
        ...state,
        beers: action.payload,
        loading: false,
      };
    default: return state;
  }
}
