import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { searchBeersEpic } from './index';
import { searchBeers, SEARCHED_BEERS_LOADING, RECEIVED_BEERS } from '../actions';

it('should perform a search', function() {
  const action$ = ActionsObservable.of(searchBeers('shawn'));

  const deps = {
    ajax: {
      getJSON: () => Observable.of([{ name: 'shawn' }]),
    },
    // alerts from react native, for example, could be other dependencies to mock! 
  };

  const output$ = searchBeersEpic(action$, null, deps);

  output$.toArray().subscribe(actions => {
    expect(actions.length).toBe(2);

    expect(actions[0].type).toBe(SEARCHED_BEERS_LOADING);
    expect(actions[1].type).toBe(RECEIVED_BEERS);
  });
});
