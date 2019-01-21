import React from 'react'
import Amplify from '@aws-amplify/core'
import awsExports from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react'
import { Grid } from 'semantic-ui-react'
import AlbumsListLoader from './components/AlbumsListLoader'
import NewAlbum from './components/NewAlbum'

Amplify.configure(awsExports)

const App = () => (
  <Grid padded>
    <Grid.Column>
      <NewAlbum />
      <AlbumsListLoader />
    </Grid.Column>
  </Grid>
)

export default withAuthenticator(App, { includeGreetings: true })
