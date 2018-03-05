import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../../queries/fetchSong';
import { Link } from 'react-router';


class SongDetail extends Component {
  render() {
    const {
      data: {
        loading,
        song,
      },
    } = this.props;

    if (loading) return <div>Loading...</div>;

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);
