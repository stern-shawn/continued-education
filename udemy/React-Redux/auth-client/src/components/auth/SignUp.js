import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {
  render() {
    const {
      handleSubmit,
      fields: { email, password, passwordConfirm },
    } = this.props;

    return (
      <form>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input {...passwordConfirm} type="password" className="form-control" />
        </fieldset>

        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
}, null, actions)(SignUp);
