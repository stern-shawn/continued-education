import { CLEAR_STORIES, LOAD_STORIES } from '../actions';

const initialState = {
  items: [],
};

const stories = [
  {
    title: "Headline 1",
    body: "Lorem ipstuff",
    id: 0,
  },
  {
    title: "Ayyyy lmao",
    body: "Generic af",
    id: 1,
  },
];

export default function storiesReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_STORIES:
      return {
        items: stories.slice(),
      };
    case CLEAR_STORIES:
      return {
        items: [],
      };
    default: return state;
  }
}
