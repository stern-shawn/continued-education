import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class SignIn extends Component {
  handleFormSubmit = ({ email, password }) => {
    console.log(email, password);
  }
  
  render() {
    // Pull out our helpers injected by redux-form
    const {
      handleSubmit,
      fields: { email, password },
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
})(SignIn);
