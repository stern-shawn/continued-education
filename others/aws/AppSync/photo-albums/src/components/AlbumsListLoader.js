import React from 'react'
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

const AlbumsListLoader = () => (
  <Connect query={graphqlOperation(ListAlbums)}>
    {({ data, loading, errors }) => {
      if (loading) return <div>Loading...</div>
      if (!data.listAlbums) return

      return <AlbumsList albums={data.listAlbums.items} />
    }}
  </Connect>
)

export default AlbumsListLoader
