import { RECEIVED_BEERS, SEARCHED_BEERS, SEARCHED_BEERS_ERROR } from '../actions';

const initialState = {
  beers: [],
  messages: [],
  loading: false,
};

export default function beersReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCHED_BEERS:
      return {
        ...state,
        loading: true,
        messages: [],
      };
    case SEARCHED_BEERS_ERROR:
      return {
        ...state,
        loading: false,
        messages: [{ type: 'error', text: action.payload }]
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
