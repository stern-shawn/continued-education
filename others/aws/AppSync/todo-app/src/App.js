import React, { Component } from 'react';
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

class App extends Component {
  state = { todo: '' };

  componentDidMount = () => {
    this.props.subscribeToMore(buildSubscription(SUBSCRIBE_TODOS, LIST_TODOS));
  };

  addTodo = () => {
    if (this.state.todo === '') return;
    const todo = {
      title: this.state.todo,
      completed: false,
    };
    this.props.createTodo(todo);
    this.setState({ todo: '' });
  };

  render() {
    const { todos } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <input
          onChange={e => this.setState({ todo: e.target.value })}
          value={this.state.todo}
          placeholder="Todo Name"
        />
        <button onClick={this.addTodo}>Add Todo</button>
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
  }
}

export default compose(
  graphqlMutation(CREATE_TODO, LIST_TODOS, 'Todo'),
  graphql(LIST_TODOS, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: props => ({
      subscribeToMore: props.data.subscribeToMore,
      todos: props.data.listTodos ? props.data.listTodos.items : [],
    }),
  }),
)(App);
