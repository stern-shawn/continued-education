import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Feature from './components/feature';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SignOut from './components/auth/SignOut';
import Welcome from './components/Welcome';

import RequireAuth from './components/auth/requireAuth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If the user has a token, consider them to already be signed in
if (token) {
  // Update state prior to render. Store has the dispatch method built in so we can dispatch actions
  // at this level of the app!
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="feature" component={RequireAuth(Feature)} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
        <Route path="signout" component={SignOut} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
