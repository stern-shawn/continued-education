import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../../queries/fetchSongs';

class SongCreate extends Component {
  state = {
    title: '',
  }

  handleChange = (e) => this.setState({ title: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { mutate } = this.props;
    const { title } = this.state;

    // Invoke the mutate function passed to our component via graphql HOC as props
    // and pass in the title variable (object keys match so no need to write title: title)
    // At the moment we only have ONE mutation tied to the component, so it's that simple
    mutate({
      variables: {
        title,
      },
      // On completion, also execute this array of queries. Shortened from query: query to just query
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'))
      // .catch(() => ) we could also add a catch for if the mutation failed
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Song Title:</label>
          <input onChange={this.handleChange} value={this.state.title} />
        </form>
      </div>
    );
  }
}

// Here we can write the mutation as a function of query instead of with a hardcoded title value
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
