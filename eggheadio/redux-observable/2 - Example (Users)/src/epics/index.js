import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { FETCH_USER, fetchUserFulfilled } from '../actions';

const fetchUserEpic = action$ => 
  action$.ofType(FETCH_USER)
    .switchMap(({ payload }) => Observable.ajax.getJSON(`https://api.github.com/users/${payload}`)
      .map(user => fetchUserFulfilled(user))
    );

export const rootEpic = combineEpics(
  fetchUserEpic,
);
