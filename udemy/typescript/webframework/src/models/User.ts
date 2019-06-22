import axios from 'axios'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

type Callback = () => void

export class User {
  events: { [key: string]: Callback[] } = {}

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName]
  }

  set(update: UserProps) {
    Object.assign(this.data, update)
  }

  // Register an event handler on the user by type
  on(eventName: string, callback: Callback) {
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  // Trigger all event handlers for a given type
  trigger(eventName: string) {
    const handlers = this.events[eventName]

    if (!handlers || handlers.length === 0) return

    handlers.forEach(callback => callback())
  }

  fetch() {
    axios.get<UserProps>(`http://localhost:3000/users/${this.get('id')}`).then(res => this.set(res.data))
  }

  save() {
    const id = this.get('id')

    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data)
    } else {
      axios.post('http://localhost:3000/users', this.data)
    }
  }
}
