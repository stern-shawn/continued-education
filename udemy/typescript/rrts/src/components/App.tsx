import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../reducers'
import { fetchTodos, deleteTodo } from '../actions'

export const App = () => {
  const dispatch = useDispatch()
  const todos = useSelector(({ todos }: StoreState) => todos)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading && todos.length) {
      setIsLoading(false)
    }
  }, [isLoading, todos])

  return (
    <div>
      <button
        onClick={() => {
          setIsLoading(true)
          dispatch(fetchTodos())
        }}
      >
        Fetch Todos
      </button>
      {isLoading && 'Loading...'}
      <ul>
        {todos.map(({ id, title }) => (
          <li key={id} onClick={() => dispatch(deleteTodo(id))}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}
