import React, { Component } from 'react';
import Header from './Header';
import CommentBox from './comment_box';
import CommentList from './comment_list';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <CommentBox />
        <CommentList />
      </div>
    );
  }
}
