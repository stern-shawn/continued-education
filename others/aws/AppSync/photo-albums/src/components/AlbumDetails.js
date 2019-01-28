import React from 'react'
import { S3Image } from 'aws-amplify-react'
import { API, graphqlOperation } from 'aws-amplify'
import { Divider, Form, Header, Segment } from 'semantic-ui-react'
import S3ImageUpload from './S3ImageUpload'

// todo: add fullsize to query and support fullsize detail modal/route?
const GetAlbum = `query GetAlbum($id: ID!, $nextTokenForPhotos: String) {
  getAlbum(id: $id) {
    id
    name
    photos(sortDirection: DESC, nextToken: $nextTokenForPhotos) {
      nextToken
      items {
        thumbnail {
          width
          height
          key
        }
      }
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

const AlbumDetails = ({ album, hasMorePhotos, loadMorePhotos, loadingPhotos }) =>
  !album ? (
    'Loading Album...'
  ) : (
    <Segment>
      <Header as="h3">{album.name}</Header>
      <S3ImageUpload albumId={album.id} />
      <PhotosList photos={album.photos.items} />
      {hasMorePhotos && (
        <Form.Button
          onClick={loadMorePhotos}
          icon="refresh"
          disabled={loadingPhotos}
          content={loadingPhotos ? 'Loading...' : 'Load more photos'}
        />
      )}
    </Segment>
  )

class AlbumDetailsLoader extends React.Component {
  state = {
    nextTokenForPhotos: null,
    hasMorePhotos: true,
    album: null,
    loading: true,
  }

  componentDidMount() {
    this.loadMorePhotos()
  }

  loadMorePhotos = async () => {
    if (!this.state.hasMorePhotos) return

    this.setState({ loading: true })
    const { data } = await API.graphql(
      graphqlOperation(GetAlbum, { id: this.props.id, nextTokenForPhotos: this.state.nextTokenForPhotos }),
    )

    let album
    if (this.state.album === null) {
      album = data.getAlbum
    } else {
      album = this.state.album
      album.photos.items = album.photos.items.concat(data.getAlbum.photos.items)
    }

    this.setState({
      album,
      loading: false,
      nextTokenForPhotos: data.getAlbum.photos.nextToken,
      hasMorePhotos: data.getAlbum.photos.nextToken !== null,
    })
  }

  render() {
    return (
      <AlbumDetails
        loadingPhotos={this.state.loading}
        album={this.state.album}
        loadMorePhotos={this.loadMorePhotos}
        hasMorePhotos={this.state.hasMorePhotos}
      />
    )
  }
}

export default AlbumDetailsLoader
