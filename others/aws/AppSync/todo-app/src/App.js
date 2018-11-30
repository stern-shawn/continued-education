import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

const LIST_TODOS = gql`
  query {
    listTodos {
      items {
        id
        title
        completed
      }
    }
  }
`;

const App = ({ todos }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
    </header>
    {todos.map(item => (
      <p key={item.id}>{item.title}</p>
    ))}
  </div>
);

export default compose(
  graphql(LIST_TODOS, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: props => ({
      todos: props.data.listTodos ? props.data.listTodos.items : [],
    }),
  }),
)(App);
