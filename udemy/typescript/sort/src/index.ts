import { NumbersCollection } from './NumbersCollection'
import { CharactersCollection } from './CharactersCollection'
import { LinkedList } from './LinkedList'

const numbers = new NumbersCollection([10, -20, 3, -5, 0])
numbers.sort()
console.log(numbers.data)

const characters = new CharactersCollection('XabDShawn')
characters.sort()
console.log(characters.data)

const linkedList = new LinkedList()
linkedList.add(50)
linkedList.add(-1)
linkedList.add(4)
linkedList.add(-20)
linkedList.sort()
linkedList.print()
