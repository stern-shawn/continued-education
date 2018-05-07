import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CommentBox extends Component {
  state = {
    comment: '',
  }

  handleChange = (e) => this.setState({ comment: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch saveComment action to redux with the current state of the comment
    this.props.saveComment(this.state.comment);
    // Clear current input
    this.setState({ comment: '' });
  };

  render() {
    return (
      <form className="comment-box" onSubmit={this.handleSubmit}>
        <textarea
          onChange={this.handleChange}
          value={this.state.comment}
        />
        <button action="submit">Submit Comment</button>
      </form>
    );
  }
}

export default connect(null, actions)(CommentBox);
