import { Sorter } from './Sorter'
import { NumbersCollection } from './NumbersCollection'
import { CharactersCollection } from './CharactersCollection'

const numbers = new NumbersCollection([10, -20, 3, -5, 0])
const numSorter = new Sorter(numbers)
numSorter.sort()
console.log(numbers.data)

const characters = new CharactersCollection('XabDShawn')
const charSorter = new Sorter(characters)
charSorter.sort()
console.log(characters.data)
