import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../../queries/fetchSongs';

class SongList extends PureComponent {
  onSongDelete = (id) => {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

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
            { songs.map(({ id, title }) => (
                <li key={id} className="collection-item">
                  {title}
                  <i
                    className="material-icons right"
                    onClick={() => this.onSongDelete(id)}
                  >
                    delete
                  </i>
                </li>
              ))
            }
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

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// With this old version of apollo we can't pass in multiple args to the graphql helper like with
// the redux connect(mapProps, actions) HOC. But we CAN wrap multiple instances around each other
// so we can attach mutatations and queries in this way...
export default graphql(mutation)(
  graphql(query)(SongList)
);
