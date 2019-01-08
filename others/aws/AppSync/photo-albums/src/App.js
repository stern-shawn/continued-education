import React from 'react';
import Amplify from '@aws-amplify/core';
import awsExports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { Header } from 'semantic-ui-react';

Amplify.configure(awsExports);

const App = () => (
  <div>
    <Header as="h1">Hello World! I'm a photo app!</Header>
  </div>
);

export default withAuthenticator(App, { includeGreetings: true });
