import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { LOAD_STORIES } from '../actions';

function loadStoriesEpic(action$) {
  return action$
    .filter(action => action.type === LOAD_STORIES)
    .do(action => console.log(action))
    .ignoreElements();
}

export const rootEpic = combineEpics(
  loadStoriesEpic,
);
