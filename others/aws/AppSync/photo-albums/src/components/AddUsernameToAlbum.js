import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Input } from 'semantic-ui-react'

const mutationAddUserToAlbum = `mutation AddUser($username: String!, $albumId: String!) {
  addUsernameToAlbum(username: $username, albumId: $albumId) {
    id
  }
}`

class AddUsernameToAlbum extends Component {
  state = { username: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = async event => {
    event.preventDefault()
    const { albumId } = this.props
    const { username } = this.state

    // todo: note that we can't provide any update logic here like we would with react-apollo Mutations 👎,
    // update this later to just append the username to the locally cached list on success OR do a full refetchQueries
    const result = await API.graphql(graphqlOperation(mutationAddUserToAlbum, { username, albumId }))
    console.log(`Added ${username} to album id ${result.data.addUsernameToAlbum.id}`)
    this.setState({ username: '' })
  }

  render() {
    return (
      <Input
        type="text"
        placeholder="Username"
        icon="user plus"
        iconPosition="left"
        action={{ content: 'Add', onClick: this.handleSubmit }}
        name="username"
        value={this.state.username}
        onChange={this.handleChange}
      />
    )
  }
}

export default AddUsernameToAlbum
