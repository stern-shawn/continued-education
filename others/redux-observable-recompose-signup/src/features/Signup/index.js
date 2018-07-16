import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { path, prop } from 'ramda';
import { compose, withHandlers } from 'recompose';
import signupDuck from './Signup.duck';

import './Signup.scss';

const getTargetValue = path(['target', 'value']);

const Signup = ({ handleSubmit, loading, updateUsername, updatePassword }) => (
  <form onSubmit={handleSubmit}>
    <h3 className="title">Redux-Observable Form Magic</h3>
    <input className="input" placeholder="Username" onChange={updateUsername} />
    <input className="input" type="password" placeholder="Password" onChange={updatePassword} />
    <button className={cn('button is-primary', { 'is-loading': loading })}>Sign Up</button>
  </form>
);

const enhance = compose(
  connect(prop('signup'), signupDuck.actions),
  withHandlers({
    handleSubmit: ({ username, password, sendSignupInfo }) => event => {
      event.preventDefault();
      sendSignupInfo({ username, password });
    },
    updateUsername: ({ setUsername }) => compose(
      setUsername,
      getTargetValue
    ),
    updatePassword: ({ setPassword }) => compose(
      setPassword,
      getTargetValue
    ),
  })
);

export default enhance(Signup);
