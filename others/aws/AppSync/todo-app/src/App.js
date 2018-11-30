import React, { useEffect, useState } from 'react';
import { compose, graphql } from 'react-apollo';
import { graphqlMutation } from 'aws-appsync-react';
import { buildSubscription } from 'aws-appsync';
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

const CREATE_TODO = gql`
  mutation($title: String!, $completed: Boolean) {
    createTodo(input: { title: $title, completed: $completed }) {
      id
      title
      completed
    }
  }
`;

const SUBSCRIBE_TODOS = gql`
  subscription {
    onCreateTodo {
      id
      title
      completed
    }
  }
`;

const App = ({ createTodo, subscribeToMore, todos }) => {
  const [todoInput, setTodoInput] = useState('');

  // Subscribe to graphQL subscriptions from AWS AppSync for live updates to todos across clients
  useEffect(() => {
    const unsubscribe = subscribeToMore(
      buildSubscription(SUBSCRIBE_TODOS, LIST_TODOS),
    );
    // subscribeToMore returns an unsub method, for clean up of the subscription on unmount
    return () => unsubscribe();
  }, []); // We don't want to sub/unsub on every rerender, pass an empty array of props to make this run only once on first mount/unmount

  const addTodo = e => {
    e.preventDefault();
    if (todoInput === '') return;
    createTodo({
      title: todoInput,
      completed: false,
    });
    setTodoInput('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <form onSubmit={addTodo}>
        <input
          onChange={e => setTodoInput(e.target.value)}
          value={todoInput}
          placeholder="New Todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.length > 0 && (
        <ul style={{ listStyleType: 'none' }}>
          {todos.map(item => (
            <li key={item.id} style={{ marginBottom: '.25rem' }}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default compose(
  graphqlMutation(CREATE_TODO, LIST_TODOS, 'Todo'),
  graphql(LIST_TODOS, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: ({ data }) => ({
      subscribeToMore: data.subscribeToMore,
      todos: data.listTodos ? data.listTodos.items : [],
    }),
  }),
)(App);
