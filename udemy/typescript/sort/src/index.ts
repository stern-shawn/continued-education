import { Sorter } from './Sorter'
import { NumbersCollection } from './NumbersCollection'
import { CharactersCollection } from './CharactersCollection'
import { LinkedList } from './LinkedList'

const numbers = new NumbersCollection([10, -20, 3, -5, 0])
const numSorter = new Sorter(numbers)
numSorter.sort()
console.log(numbers.data)

const characters = new CharactersCollection('XabDShawn')
const charSorter = new Sorter(characters)
charSorter.sort()
console.log(characters.data)

const linkedList = new LinkedList()
linkedList.add(50)
linkedList.add(-1)
linkedList.add(4)
linkedList.add(-20)

const linkedListSorter = new Sorter(linkedList)
linkedListSorter.sort()
linkedList.print()
