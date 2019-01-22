import React from 'react'
import Amplify from '@aws-amplify/core'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import awsExports from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react'
import { Grid } from 'semantic-ui-react'
import AlbumsList from './components/AlbumsList'
import NewAlbum from './components/NewAlbum'
import AlbumDetails from './components/AlbumDetails'

Amplify.configure(awsExports)

const App = () => (
  <Router>
    <Grid padded>
      <Grid.Column>
        <Route path="/" exact component={NewAlbum} />
        <Route path="/" exact component={AlbumsList} />
        <Route
          path="/albums/:albumId"
          render={() => (
            <div>
              <NavLink to="/">Back to Albums list</NavLink>
            </div>
          )}
        />
        <Route path="/albums/:albumId" render={props => <AlbumDetails id={props.match.params.albumId} />} />
      </Grid.Column>
    </Grid>
  </Router>
)

export default withAuthenticator(App, { includeGreetings: true })
