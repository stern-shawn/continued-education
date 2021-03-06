import { Eventing } from './Eventing'
import { Sync } from './Sync'
import { Attributes } from './Attributes'

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const rootUrl = 'http://localhost:3000/users'

export class User {
  public attributes: Attributes<UserProps>
  public events: Eventing = new Eventing()
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs)
  }

  // Pass-through functions from the sub-classes, caller can then  invoke w/ args
  get get() {
    return this.attributes.get
  }

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }
}
