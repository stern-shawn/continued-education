# Using Higher-Order Components in React

This repo is a simple example of studying HOCs and applying them to React-Redux based applications.

In a nutshell, HOCs enable us to extend the functionality of an existing component (generally we call the result an 'Enhanced' or 'Composed' component). While many devs may not be aware of what a HOC is, if they've ever used React-Redux, they have already used HOCs unknowingly!

The react-redux `connect(mapStateToProps, mapDispatchToProps)(Component)` pattern is an example of using the connect() HOC to extend a React component such that its `this.props` is actually connected to values and actions in the Redux store. Without this HOC, React-Rudux components wouldn't be so easily connected to application state or be able to dispatch actions, which would make for a terrible development experience...

## HOCs for Auth
In this particular example, I'm experimenting with using HOCs to make it so users have to be signed in to view certain routes in a React application. For example, say I have a /resources page which has sensitive data, and I only want authenticated users to view it, how would we use a HOC to implement this?

Lets implement a HOC that would handle this for us (assume I've already implemented the Redux store, actions, etc so that there is an authentication variable which tracks user auth status):

```JavaScript
export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object,
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: state.authenticated,
  });

  return connect(mapStateToProps)(Authentication);
};
```

Let's break this down a little bit while ignoring the contextTypes code (this is just to give us access to React-Router so we can programatically redirect the user).

In a nutshell, the `Authentication` class exported by this HOC simply renders the passed component (say, our protected content component), while extending it with the `componentWillMount()` and `componentWillUpdate()` lifecycle hooks. The underlying component is rendered exactly the same way it would be without being wrapped in the HOC (unless the props passed using `...this.props` somehow manages to override a prop expected by `ComposedComponent`...).

Inside of the `componentWillMount()` hook, we check to see if the user is authenticated. If so, nothing averse happens and rendering continues as normal. If not, the HOC tells React-Router to redirect the user to the home page since they are not authorized to view the protected content.
```JavaScript
componentWillMount() {
  if (!this.props.authenticated) {
    this.context.router.push('/');
  }
}
```

Suppose the user is logged in, views the restricted content, and then logs out while still on the protected page? What should happen? Usually, they would be redirected to a home page or signin form to confirm that they have been successfully logged out. However, just using `componentWillMount()` will not accomplish this. This is where `componentWillUpdate()` kicks in. If the `authenticated` variable is changed, this will send new props to every component and trigger re-renders. `componentWillMount()` is passed a property called `nextProps` which lets us peek at the updated values and respond to it before the props are used. In this situation, we can peek at the new, incoming value of `authenticated`, and if it has been changed to `false`, redirect the user out of the protect area to Home.
```JavaScript
componentWillUpdate(nextProps) {
  if (!nextProps.authenticated) {
    this.context.router.push('/');
  }
}
```
But wait, how is our HOC even aware of the `authenticated` variable and its value? The answer is the `connect()` HOC that we see used when we return the `Authentication` component!
```JavaScript
import { connect } from 'react-redux';

...

  const mapStateToProps = (state) => ({
    authenticated: state.authenticated,
  });

  return connect(mapStateToProps)(Authentication);
```

This component sounds great, but how do we actually make us of it in an application to protect a route? Here is a sample of how it would be employed in a very, very simple app:

```JavaScript
...

import requireAuth from './components/require_auth';

...

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="resources" component={requireAuth(Resources)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
```

Note that if the user navigates to `/resources`, the app will render not the `Resources` component directly, but the `Authentication` component (which we've imported as `requireAuth()`) with `Resources` as the child component to be wrapped.

And that's a basic method of implementing authentication control in React-Redux using HOCs. Obviously this only covers how to protect content on the client side, and not the matter of actually establishing if the user is authenticated by communicating with the server and then putting that value into Redux. That will be covered in a later project more specific to that idea (hopefully using JWTs which I'm curious to learn).
