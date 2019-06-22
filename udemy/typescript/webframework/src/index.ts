import { User } from './models/User'

const user = new User({ id: 1 })

user.on('click', () => {
  console.log('Click 1')
})

user.on('click', () => {
  console.log('Click 2')
})

user.on('change', () => {
  console.log('Update 1')
})

user.trigger('click')
user.trigger('change')
