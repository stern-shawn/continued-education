import React from 'react'
import { Header, List, Segment } from 'semantic-ui-react'
import { makeComparator } from '../utils'

const AlbumsList = ({ albums }) => (
  <Segment>
    <Header as="h3">My Albums</Header>
    <List divided relaxed>
      {albums.sort(makeComparator('name')).map(album => (
        <List.Item key={album.id}>{album.name}</List.Item>
      ))}
    </List>
  </Segment>
)

export default AlbumsList
