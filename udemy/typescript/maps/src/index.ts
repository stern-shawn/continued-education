import { Company } from './Company'
import { CustomMap } from './CustomMap'
import { User } from './User'

const user = new User()
const company = new Company()
// Create a new google map (with our limited exposed API) and latch it onto the 'map' div
const customMap = new CustomMap('map')

customMap.addMarker(user)
customMap.addMarker(company)
