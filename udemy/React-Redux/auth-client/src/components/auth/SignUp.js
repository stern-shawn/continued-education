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
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input {...passwordConfirm} type="password" className="form-control" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>

        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

const validate = (formProps) => {
  const errors = {};

  if (!formProps.email) {
    errors.email = "Please enter an email";
  }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
};

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate,
}, null, actions)(SignUp);
