import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentDidMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        {this.props.message}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  message: state.auth.message,
})

export default connect(mapStateToProps, actions)(Feature);
