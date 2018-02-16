import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends PureComponent {
  render() {
    console.log(this.props);
    const {
      data: {
        loading,
        songs,
      },
    } = this.props;

    if (loading) return <div>Loading...</div>;

    return (
      <div>
        { songs &&
          <ul>
            { songs.map((song) => <li key={song.id}>{song.title}</li>) }
          </ul>
        }
      </div>
    );
  }
}

SongList.propTypes = {

};

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
