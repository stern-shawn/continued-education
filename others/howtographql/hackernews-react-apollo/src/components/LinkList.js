import React from 'react';
import Link from './Link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      node {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      node {
        id
        link {
          id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
        user {
          id
        }
      }
    }
  }
`

const _subscribeToNewLinks = subscribeToMore => {
  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const newLink = subscriptionData.data.newLink.node

      return {
        ...prev,
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename
        },
      };
    }
  })
}

const _subscribeToNewVotes = subscribeToMore => {
  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION
  })
}

const _updateCacheAfterVote = (store, createVote, linkId) => {
  const data = store.readQuery({ query: FEED_QUERY })

  const votedLink = data.feed.links.find(link => link.id === linkId)
  votedLink.votes = createVote.link.votes

  store.writeQuery({ query: FEED_QUERY, data })
}

const LinkList = () => (
  <Query query={FEED_QUERY}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <div>Fetching</div>
      if (error) return <div>Error</div>

      _subscribeToNewLinks(subscribeToMore)
      _subscribeToNewVotes(subscribeToMore)

      const linksToRender = data.feed.links

      return (
        <div>
          {linksToRender.map((link, index) => (
            <Link key={link.id} {...{ index, link, updateStoreAfterVote: _updateCacheAfterVote }} />
          ))}
        </div>
      )
    }}
  </Query>
)

export default LinkList
