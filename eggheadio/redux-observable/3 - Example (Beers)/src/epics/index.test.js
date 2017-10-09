import { Observable } from 'rxjs';
import { VirtualTimeScheduler } from 'rxjs/scheduler/VirtualTimeScheduler';
import { ActionsObservable } from 'redux-observable';
import { searchBeersEpic } from './index';
import { searchBeers, SEARCHED_BEERS_LOADING, RECEIVED_BEERS } from '../actions';
import configureStore from '../configureStore';

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

// High level test to check that dispatching an action will be caught by the epic and update state 
it('should perform a search (redux)', function() {
  const scheduler = new VirtualTimeScheduler();
  const deps = {
    ajax: {
      getJSON: () => Observable.of([{ name: 'shawn' }]),
    },
    scheduler,
    // alerts from react native, for example, could be other dependencies to mock! 
  };

  const store = configureStore();
  const action = searchBeers('shawn');

  store.dispatch(action);

  // Flushing the scheduler forces it to execute any queued actions (if we're using debouncing, etc)
  // and act synchronous so we can test our expect() 
  scheduler.flush();

  console.log(store.getState());
  expect(store.getState().beers.length).toBe(1);
});
