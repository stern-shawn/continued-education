import React from 'react'
import { Connect } from 'aws-amplify-react'
import { graphqlOperation } from 'aws-amplify'
import { Header, Segment } from 'semantic-ui-react'
import S3ImageUpload from './S3ImageUpload';

const GetAlbum = `query GetAlbum($id: ID!) {
  getAlbum(id: $id) {
    id
    name
  }
}`

const AlbumDetails = ({ album }) => (
  <Segment>
    <Header as="h3">{album.name}</Header>
    <S3ImageUpload albumId={album.id}/>
    <p>TODO: Show photos for this album</p>
  </Segment>
)

const AlbumDetailsLoader = ({ id }) => (
  <Connect query={graphqlOperation(GetAlbum, { id })}>
    {({ data, loading, errors }) => {
      if (loading) return <div>Loading...</div>
      if (errors.length > 0) return <div>{JSON.stringify(errors)}</div>
      if (!data.getAlbum) return

      return <AlbumDetails album={data.getAlbum} />
    }}
  </Connect>
)

export default AlbumDetailsLoader
