import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricCreate extends Component {
  state = {
    content: '',
  };

  // Destructure the living heck out of the native event :)
  handleChange = ({ target: { value: content } }) =>
    this.setState({ content });

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId,
      },
    }).then(() => this.setState({ content: '' }))
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Add a Lyric</label>
          <input
            value={this.state.content}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddLyric($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
