import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      // Redirect user to home if they are not authenticated
      if (!this.props.authenticated) {
        browserHistory.push('/');
      }
    }

    // Add in an update hook so that if the user signs out (which will update the authentication prop)
    // we run a check and do a forced redirect to home
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        browserHistory.push('/');
      }
    }

    // Render the passed component, and pass down any addition properties that we've added using ES6 spread
    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
  });

  return connect(mapStateToProps)(Authentication);
};
