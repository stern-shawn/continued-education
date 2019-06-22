import { ActionTypes, Todo, Action } from '../actions'

export const todosReducer = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchTodos:
      return action.payload
    case ActionTypes.deleteTodo:
      return state.filter(({ id }) => id !== action.payload)
    default:
      return state
  }
}
