import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { path, prop } from 'ramda';
import { compose, withHandlers } from 'recompose';
import signupDuck from './Signup.duck';

import './Signup.scss';

const getTargetValue = path(['target', 'value']);

const Signup = ({
  handleSubmit,
  id,
  loading,
  password,
  username,
  success,
  updateUsername,
  updatePassword,
  ...rest
}) => (
  <form onSubmit={handleSubmit}>
    {console.log(rest)}
    <h3 className="title">Redux-Observable Form Magic</h3>
    {success && <p className="has-text-success">{`Success! Your id is ${id}`}</p>}
    <input
      className="input"
      onChange={updateUsername}
      placeholder="Username"
      type="text"
      value={username || ''}
    />
    <input
      className="input"
      onChange={updatePassword}
      placeholder="Password"
      type="password"
      value={password || ''}
    />
    <button className={cn('button is-primary', { 'is-loading': loading })}>Sign Up</button>
  </form>
);

const enhance = compose(
  connect(prop('signup'), signupDuck.actions),
  withHandlers({
    handleSubmit: ({ username, password, sendSignupInfo, sendPromise }) => event => {
      event.preventDefault();
      sendSignupInfo({ username, password });
      sendPromise({ username, password });
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
