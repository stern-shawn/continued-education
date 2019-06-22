type Callback = () => void

export class Eventing {
  events: { [key: string]: Callback[] } = {}

  // Register an event handler
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
}
