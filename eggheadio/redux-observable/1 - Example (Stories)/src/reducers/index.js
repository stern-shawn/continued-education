import { FETCH_STORIES, FETCH_STORIES_FULFILLED } from '../actions';

const initialState = {
  stories: [],
  loading: false,
};

export default function storiesReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_STORIES:
      return {
        ...state,
        stories: [],
        loading: true,
      };
    case FETCH_STORIES_FULFILLED:
      return {
        ...state,
        stories: action.payload,
        loading: false,
      };
    default: return state;
  }
}
