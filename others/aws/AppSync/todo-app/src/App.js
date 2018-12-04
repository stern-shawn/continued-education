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

const DELETE_TODO = gql`
  mutation($id: ID!) {
    deleteTodo(input: { id: $id }) {
      id
      title
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation($id: ID!, $completed: Boolean, $title: String) {
    updateTodo(input: { id: $id, completed: $completed, title: $title }) {
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
    onUpdateTodo {
      id
      title
      completed
    }
    onDeleteTodo {
      id
      title
      completed
    }
  }
`;

const App = ({
  client,
  createTodo,
  deleteTodo,
  todos,
  subscribeToMore,
  updateTodo,
}) => {
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

  const toggleComplete = item =>
    updateTodo({
      ...item,
      completed: !item.completed,
    });

  const removeTodo = (e, { id }) => {
    e.stopPropagation();
    deleteTodo({ id });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Todos</p>
      </header>
      <form onSubmit={addTodo} style={{ marginTop: '1rem' }}>
        <input
          onChange={e => setTodoInput(e.target.value)}
          value={todoInput}
          placeholder="New Todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.length > 0 && (
        <ul
          style={{
            listStyleType: 'none',
            display: 'flex',
            flexDirection: 'column',
            placeItems: 'center',
          }}
        >
          {todos.map(item => (
            <li
              key={item.id}
              style={{
                marginBottom: '.25rem',
                textDecoration: item.completed && 'line-through',
              }}
              onClick={() => toggleComplete(item)}
            >
              {item.title} <button onClick={e => removeTodo(e, item)}>x</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default compose(
  graphqlMutation(CREATE_TODO, LIST_TODOS, 'Todo'),
  graphqlMutation(DELETE_TODO, LIST_TODOS, 'Todo'),
  graphqlMutation(UPDATE_TODO, LIST_TODOS, 'Todo'),
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
