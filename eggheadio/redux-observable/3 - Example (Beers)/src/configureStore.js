import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducer from './reducers';
import { ajax } from 'rxjs/observable/dom/ajax';
import { rootEpic } from './epics';

export default function configureStore(deps = {}) {
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
      ajax,
      ...deps, // test dependencies. These come AFTER ajax and will overwrite it if defined :)
    }
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware),
    ),
  );
}
