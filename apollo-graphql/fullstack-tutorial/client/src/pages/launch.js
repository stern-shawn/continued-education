import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../components/loading';
import Header from '../components/header';
import ActionButton from '../containers/action-button';
import LaunchDetail from '../components/launch-detail';
import { LAUNCH_TILE_DATA } from './launches';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Launch = ({ launchId }) => (
  <Query query={GET_LAUNCH_DETAILS} variables={{ launchId }}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <p>ERROR: {error.message}</p>;

      console.log('data: ', data);
      return (
        <>
          <Header image={data.launch.mission.missionPatch}>{data.launch.mission.name}</Header>
          <LaunchDetail {...data.launch} />
          <ActionButton {...data.launch} />
        </>
      );
    }}
  </Query>
);

export default Launch;
