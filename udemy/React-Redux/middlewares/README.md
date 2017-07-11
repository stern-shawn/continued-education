# Getting a deeper understanding of Redux Middlewares
I've previously made use of Redux-Observable Epics as a middleware for handling async actions in my applications, but didn't necessarily have a clear understanding of how Redux middlewares worked. This exercise was a great chance to get a better idea of how middlewares work by implementing one of my own!

## Situation
In the example app we've set up, there is a UserList component which renders a card for each user in the redux store's `users` field. In order to populate the users field, the component dispatches a `fetchUsers()` action before mounting using the `componentWillMount()` hook as shown in the below snippets.

*Note: I have since updated the reducer and middleware to be more best-practice oriented... creating ajax requests inside of a reducer seems like a major anti-pattern to me as a developer, so I updated the repo to perform the async actions inside the middlewares. Changes reflected in the code, you can refer to the commit log to see the updates to async.js and the reducers.*

UserList.js:
```JavaScript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUser = (user) => {
    ...
  }

  render() {
    return (
      <div className="user-list">
        {this.props.users.map(this.renderUser)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, actions)(UserList);

```

users.js (reducer):
```JavaScript
import { FETCH_USERS_SUCCESS } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_USERS_SUCCESS:
      return [...state, ...action.payload.data];
    default:
      return state;
  }
}
```
reducers.js (root app reducer):
```JavaScript
import { combineReducers } from 'redux';
import usersReducer from './users';

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
```
Note that nothing too fancy is going on here. The function `fetchUsers()` simply dispatches an action of type `FETCH_USERS`. When the reducer receives an action of type `FETCH_USERS_SUCCESS` it merges that action's payload into `state` (actually, the `users` variable within the state tree), and this update to the value is propogated down to the UserList since it is subscribed via `connect()`. The component re-renders based on the updated value of `this.props.users`, and we see some user cards courtesy of the API endpoint's response!

*(In a production app I would have a case for `FETCH_USERS` that set some loading state booleans to true or such so the component would conditionally render a loading indicator instead of being blank while the ajax resolves, but this is just an exercise in middleware so I didn't want to spend time on a pattern I'm already familiar with.)*

But wait a second... where did `FETCH_USERS_SUCCESS` even come from? That's where our middleware comes into play.

In a nutshell, dispatched redux actions follow this pattern:

- Actions are dispatched
- Actions are passed through middlewares (if any)
- Actions are received by the reducers

Each middleware can look at the incoming action and then perform any number of operations. It could simply allow the action to go on to the next middleware in the chain, perform some manipulations on an action's payload to normalize data from an API before sending it to the application, or even dispatch a new action into the middleware chain!

In this specific case, we're using it to take care of the async action of fetching data from an API endpoint then populating the `users` field in state with said data.

First we define our middleware...

middlewares/async.js:
```JavaScript
import axios from 'axios';
import { FETCH_USERS, FETCH_USERS_SUCCESS } from '../actions/types';

export default function({ dispatch }) {
  return next => action => {
    // If the action is not of type FETCH_USERS, don't interact with it; pass on to next middleware
    if (action.type !== FETCH_USERS) {
      return next(action);
    }

    // This action is the type we want to intercept. Perform the axios request for data,
    // and dispatch a new success action with the response once the request resolves
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => dispatch({ type: FETCH_USERS_SUCCESS, payload: response}));
  }
}
```
Here, we are filtering all incoming actions and deciding what to do based on its type. If the action is anything but `FETCH_USERS`, it will simply be ignored and passed on to the next handler in the middleware chain, or the reducers if nothing else remains. If the action IS of the type `FETCH_USERS`, this escape hatch is ignored, and the middleware executes an ajax request to an API. Once the Promise from axios is resolved, the middleware dispatches a brand new action of type `FETCH_USERS_SUCCESS` with the API response as its payload. This brand new action will go to the very beginning of the Redux reducer flow and once again pass through our middleware chain, but this time it won't have the correct type, and will be simply passed on to the user reducer, where its data will be merged into the store and our application can finally render it!

This is a very simple example of what middlewares are capable of. Personally I will continue to use Redux-Observables in most of my projects as I believe RxJS is incredibly powerful, but I will do so having a much greater general understanding of what is going on behind the scenes.
