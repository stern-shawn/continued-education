import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { clear, LOAD_STORIES } from '../actions';

const loadStoriesEpic = action$ => 
  action$.ofType(LOAD_STORIES)
    .switchMap(() => Observable.of(clear()).delay(2000));

export const rootEpic = combineEpics(
  loadStoriesEpic,
);
