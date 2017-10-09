import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

const Users = (props) => {
  return (
    <div>
      <ul>
        {props.users.map(login =>
          <li key={login}>
            {login}
            <button type="button" onClick={() => props.fetchUser(login)}>Load user</button>
          </li>
        )}
      </ul>
      {props.loading && <p>Please wait!</p>}
      {props.current && <User {...props.current} />}
    </div>
  );
};

const User = (props) =>
  <div>
    {props.name} ({props.login})
    <img src={props.avatar_url} />
  </div>

const mapState = (state) => state;

const mapDispatch = {
  fetchUser,
};

export default connect(mapState, mapDispatch)(Users);
