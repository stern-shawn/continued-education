import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../../queries/fetchSongs';

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
          <ul className="collection">
            { songs.map((song) => <li key={song.id} className="collection-item">{song.title}</li>) }
          </ul>
        }
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

SongList.propTypes = {

};

// const query = gql`
//   {
//     songs {
//       id
//       title
//     }
//   }
// `;

export default graphql(query)(SongList);
