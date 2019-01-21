import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Header, Input, Segment } from 'semantic-ui-react'

class NewAlbum extends Component {
  state = {
    albumName: '',
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = async event => {
    event.preventDefault()
    const NewAlbum = `mutation NewAlbum($name: String!) {
      createAlbum(input: {name: $name}) {
        id
        name
      }
    }`

    const result = await API.graphql(graphqlOperation(NewAlbum, { name: this.state.albumName }))
    console.info(`Created album with id ${result.data.createAlbum.id}`)
  }

  render() {
    return (
      <Segment>
        <Header as="h3">Add a new album</Header>
        <Input
          type="text"
          placeholder="New Album Name"
          icon="plus"
          iconPosition="left"
          action={{ content: 'Create', onClick: this.handleSubmit }}
          name="albumName"
          value={this.state.albumName}
          onChange={this.handleChange}
        />
      </Segment>
    )
  }
}

export default NewAlbum
