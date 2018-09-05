import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '/ducks/root';
import rootEpic from '/epics/root';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(promiseMiddleware({ promiseTypeDelimiter: '/' }), epicMiddleware, logger)
    )
  );

  epicMiddleware.run(rootEpic);

  return store;
}
