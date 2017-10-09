import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { SEARCHED_BEERS, receiveBeers, searchBeersLoading, searchBeersError } from '../actions';

const beers = `https://api.punkapi.com/v2/beers`;
const search = (term) => `${beers}?beer_name=${encodeURIComponent(term)}`;
const ajax = (term) =>
  term === 'skull'
    ? Observable.throw(new Error('Ajax failed'))
    : Observable.ajax.getJSON(search(term));

const searchBeersEpic = action$ =>
  action$.ofType(SEARCHED_BEERS)
    .debounceTime(500)
    .filter(action => action.payload !== '')
    .switchMap(({ payload }) => {
      // Set loading state in UI
      const loading = Observable.of(searchBeersLoading(true))
      // Define external API call
      const request = ajax(payload)
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
