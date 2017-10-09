import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { SEARCHED_BEERS, receiveBeers } from '../actions';

const beers = `https://api.punkapi.com/v2/beers`;
const search = (term) => `${beers}?beer_name=${encodeURIComponent(term)}`;
const ajax = (term) => Observable.ajax.getJSON(search(term));

const searchBeersEpic = action$ => 
  action$.ofType(SEARCHED_BEERS)
    .debounceTime(500)
    .switchMap(({ payload }) =>
      ajax(payload)
        .map(receiveBeers)
    );

export const rootEpic = combineEpics(
  searchBeersEpic,
);
