import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/todos/1'

interface Todo {
  id: number
  title: string
  completed: boolean
  userId: number
}

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(`
  Todo w/ id: ${id}
  has title of: ${title}
  Is it finished? ${completed}
`)
}

axios.get(url).then(res => {
  const { id, title, completed } = res.data as Todo

  logTodo(id, title, completed)
})
