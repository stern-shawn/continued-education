import React from 'react';
import ReactDOM from 'react-dom';
// Framework agnostic apollo client
import ApolloClient from 'apollo-client';
// Binding layer between apollo client and react
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';

const client = new ApolloClient({});

const Root = () => (
  <ApolloProvider client={client}>
    <SongList />
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
