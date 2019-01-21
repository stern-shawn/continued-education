import React, { Component } from 'react'
import { Connect } from 'aws-amplify-react'
import { graphqlOperation } from 'aws-amplify'
import AlbumsList from './AlbumsList'

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
