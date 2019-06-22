class ArrayOf<T> {
  constructor(public collection: T[]) {}

  get(index: number) {
    return this.collection[index]
  }
}

// Generic is inferred to <string> even though we don't define it
const stringArr = new ArrayOf(['a', 'b', 'c'])

function printList<T>(arr: T[]) {
  arr.forEach(el => console.log(el))
}

// Also more inference...
printList([1, 2, 3])
printList(['a', 'b', 'c'])

// Generic Constraints
class Car {
  print() {
    console.log('I am car')
  }
}

class House {
  print() {
    console.log('I am house')
  }
}

interface Printable {
  print(): void
}

// Apply a constraint on what types T can be inputs
function printHousesOrCars<T extends Printable>(arr: T[]) {
  arr.forEach(el => el.print())
}

printHousesOrCars([new House(), new Car(), new Car()])
