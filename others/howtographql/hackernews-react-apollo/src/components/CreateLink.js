import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './LinkList'

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  }

  changeValue = e => this.setState({ [e.target.name]: e.target.value })

  navigateOnComplete = () => this.props.history.push('/')

  render() {
    const { description, url } = this.state

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            name="description"
            value={description}
            onChange={this.changeValue}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            name="url"
            value={url}
            onChange={this.changeValue}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={this.navigateOnComplete}
          update={(store, { data: { post } }) => {
            const data = store.readQuery({ query: FEED_QUERY })
            data.feed.links.unshift(post)
            store.writeQuery({ query: FEED_QUERY, data })
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateLink
