import React from 'react'
import { Header, List, Segment } from 'semantic-ui-react'
import { makeComparator } from '../utils'

const AlbumsList = ({ albums }) => (
  <Segment>
    <Header as="h3">My Albums</Header>
    <List divided relaxed>
      {albums.sort(makeComparator('name')).map(album => (
        <li key={album.id}>{album.name}</li>
      ))}
    </List>
  </Segment>
)

export default AlbumsList
