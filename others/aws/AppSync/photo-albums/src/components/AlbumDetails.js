import React from 'react'
import { Connect, S3Image } from 'aws-amplify-react'
import { graphqlOperation } from 'aws-amplify'
import { Divider, Header, Segment } from 'semantic-ui-react'
import S3ImageUpload from './S3ImageUpload'

// todo: add fullsize to query and support fullsize detail modal/route?
const GetAlbum = `query GetAlbum($id: ID!) {
  getAlbum(id: $id) {
    id
    name
    photos {
      items {
        thumbnail {
          key
        }
      }
      nextToken
    }
  }
}`

const PhotosList = ({ photos }) => (
  <>
    <Divider hidden />
    {photos.map(photo => (
      <S3Image
        key={photo.thumbnail.key}
        imgKey={photo.thumbnail.key.replace('public/', '')}
        style={{ display: 'inline-block', paddingRight: '5px' }}
      />
    ))}
  </>
)

const AlbumDetails = ({ album }) => (
  <Segment>
    <Header as="h3">{album.name}</Header>
    <S3ImageUpload albumId={album.id} />
    <PhotosList photos={album.photos.items} />
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
