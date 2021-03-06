import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {
  // Conditionally render the sign in/up links if user is not authenticated,
  // or the sign out link if they are authenticated
  renderLinks = () => {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key="feature">
          <Link className="nav-link" to="/feature">Feature</Link>
        </li>,
        <li className="nav-item" key="signout">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      ];
    }

    return [
      <li className="nav-item" key="signin">
        <Link className="nav-link" to="/signin">Sign In</Link>
      </li>,
      <li className="nav-item" key="signup">
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </li>,
    ];
  }

  render() {
    const {
      userProfile,
      userProfile: { firstName, lastName },
      authenticated,
    } = this.props;

    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Redux Auth</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
        {authenticated && userProfile && <div>{`Welcome back, ${firstName} ${lastName}!`}</div>}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  userProfile: state.auth.userProfile,
});

export default connect(mapStateToProps)(Header);
