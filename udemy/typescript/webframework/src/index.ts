import { User } from './models/User'

const user = new User({ id: 1 })

user.events.on('click', () => {
  console.log('Click 1')
})

user.events.on('click', () => {
  console.log('Click 2')
})

user.events.on('change', () => {
  console.log('Update 1')
})

user.events.trigger('click')
user.events.trigger('change')
