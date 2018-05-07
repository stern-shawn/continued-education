import React, { Component } from 'react';
import Header from './Header';
import CommentBox from './comment_box';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <CommentBox />
      </div>
    );
  }
}
