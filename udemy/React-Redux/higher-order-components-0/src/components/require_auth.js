import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    // Define the contextTypes property on the Authentication class. 'static' keyword lets us define
    // it here instead of doing Authentication.contextTypes ={...} outside of the declaration
    // This exposes context that is otherwise hidden by React unless explicitly defined to avoid abuse
    static contextTypes = {
      router: React.PropTypes.object,
    }

    componentWillMount() {
      // Redirect user to home if they are not authenticated
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    // Add in an update hook so that if the user signs out (which will update the authentication prop)
    // we run a check and do a forced redirect to home
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    // Render the passed component, and pass down any addition properties that we've added using ES6 spread
    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: state.authenticated,
  });

  return connect(mapStateToProps)(Authentication);
};
