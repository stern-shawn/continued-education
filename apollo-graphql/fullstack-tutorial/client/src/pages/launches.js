import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { LaunchTile, Header, Button, Loading } from '../components';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCHES = gql`
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default () => (
  <Query query={GET_LAUNCHES} notifyOnNetworkStatusChange>
    {({ data, loading, error, fetchMore, networkStatus }) => {
      if (loading && networkStatus !== 3) return <Loading />;
      if (error) return <p>ERROR</p>;

      const isLoadingMore = loading && networkStatus === 3;

      return (
        <>
          <Header />
          {data.launches &&
            data.launches.launches &&
            data.launches.launches.map(launch => <LaunchTile key={launch.id} launch={launch} />)}
          {data.launches && data.launches.hasMore && (
            <Button
              disabled={isLoadingMore}
              onClick={() =>
                fetchMore({
                  variables: {
                    after: data.launches.cursor,
                  },
                  updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                      ...fetchMoreResult,
                      launches: {
                        ...fetchMoreResult.launches,
                        launches: [...prev.launches.launches, ...fetchMoreResult.launches.launches],
                      },
                    };
                  },
                })
              }
            >
              {`Load${isLoadingMore ? 'ing' : ''} More`}
            </Button>
          )}
        </>
      );
    }}
  </Query>
);
