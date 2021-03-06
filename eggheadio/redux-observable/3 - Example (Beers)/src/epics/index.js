import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { CANCEL_SEARCH, SEARCHED_BEERS, receiveBeers, searchBeersLoading, searchBeersError } from '../actions';

const beers = `https://api.punkapi.com/v2/beers`;
const search = (term) => `${beers}?beer_name=${encodeURIComponent(term)}`;
// const ajax = (term) =>
//   term === 'skull'
//     ? Observable.throw(new Error('Ajax failed'))
//     : Observable.ajax.getJSON(search(term)).delay(5000);

export const searchBeersEpic = (action$, store, deps) =>
  action$.ofType(SEARCHED_BEERS)
    .debounceTime(500, deps.scheduler) // scheduler is an optional param for debounceTime and will be ignored by production code :)
    .filter(action => action.payload !== '')
    .switchMap(({ payload }) => {
      // Set loading state in UI
      const loading = Observable.of(searchBeersLoading(true))

      // In case there are multiple possible reasons to cancel the request 
      const blockers = Observable.merge(
        action$.ofType(CANCEL_SEARCH),
        // action$.ofType(USER_NAVIGATED_AWAY),
      );

      // Define external API call
      const request = deps.ajax.getJSON(search(payload))
        .takeUntil(blockers)
        .map(receiveBeers)
        .catch(err => Observable.of(searchBeersError(err)))

      // Queue up both actions and dispatch in sequence
      return Observable.concat(
        loading,
        request,
      );
    });

export const rootEpic = combineEpics(
  searchBeersEpic,
);
