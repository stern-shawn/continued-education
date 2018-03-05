import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
// Framework agnostic apollo client
import ApolloClient from 'apollo-client';
// Binding layer between apollo client and react
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import SongCreate from './components/SongCreate';
import SongList from './components/SongList';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({});

const Root = () => (
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList} />
        <Route path="songs/new" component={SongCreate} />
        <Route path="songs/:id" component={SongDetail} />
      </Route>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
