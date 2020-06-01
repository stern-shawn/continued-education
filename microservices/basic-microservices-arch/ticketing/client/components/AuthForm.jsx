import { useState } from 'react';
import Router from 'next/router';

import { useRequest } from '../hooks/useRequest';

export const AuthForm = ({ isSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: `/api/users/${isSignIn ? 'signin' : 'signup'}`,
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign {isSignIn ? 'In' : 'Up'}</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign {isSignIn ? 'In' : 'Up'}</button>
    </form>
  );
};
