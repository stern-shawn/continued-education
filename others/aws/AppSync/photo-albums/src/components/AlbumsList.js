import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Connect } from 'aws-amplify-react'
import { graphqlOperation } from 'aws-amplify'
import { Header, List, Segment } from 'semantic-ui-react'
import { makeComparator } from '../utils'

const ListAlbums = `query ListAlbums {
  listAlbums(limit: 9999) {
    items {
      id
      name
    }
  }
}`

const SubscribeToNewAlbums = `
  subscription OnCreateAlbum {
    onCreateAlbum {
      id
      name
    }
  }
`

const AlbumsList = ({ albums }) => (
  <Segment>
    <Header as="h3">My Albums</Header>
    <List divided relaxed>
      {albums.sort(makeComparator('name')).map(album => (
        <List.Item key={album.id}>
          <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
        </List.Item>
      ))}
    </List>
  </Segment>
)

class AlbumsListLoader extends Component {
  // When we get data about a new album, we need to put in into an object with the same shape as the original query
  // results, but with the new data merged in
  onNewAlbum = (prevQuery, newData) => ({
    ...prevQuery,
    listAlbums: {
      ...prevQuery.listAlbums,
      items: [...prevQuery.listAlbums.items, newData.onCreateAlbum],
    },
  })

  render() {
    return (
      <Connect
        query={graphqlOperation(ListAlbums)}
        // Listen to SubscribeToNewAlbums subscription
        subscription={graphqlOperation(SubscribeToNewAlbums)}
        // Handle new subscription messages
        onSubscriptionMsg={this.onNewAlbum}
      >
        {({ data, loading, errors }) => {
          if (loading) return <div>Loading...</div>
          if (errors.length > 0) return <div>{JSON.stringify(errors)}</div>
          if (!data.listAlbums) return null

          return <AlbumsList albums={data.listAlbums.items} />
        }}
      </Connect>
    )
  }
}

export default AlbumsListLoader
