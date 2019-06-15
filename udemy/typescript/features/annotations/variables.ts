//? Types w/ Annotations
// Typed arrays
const colors: string[] = ['red', 'orange', 'blue']
const numbers: number[] = [3, 2, 1]

// Classes
class Car {}
const car: Car = new Car()

// Object literals
const point: { x: number; y: number } = {
  x: 10,
  y: 20,
}

// Functions
const logNumber = (i: number): void => {
  console.log(i)
}

//? Inferred Types
// Typed arrays
const colors2 = ['red', 'orange', 'blue']
const numbers2 = [3, 2, 1]

// Classes
class InferredCar {}
const car2 = new InferredCar()

// Object literals
const point2 = {
  x: 10,
  y: 20,
}

// Functions
const logNumber2 = (i: number) => {
  console.log(i)
}

// When to use annotations
// 1 - Fn that returns the 'any' type
const json = '{"x": 10, "y": 20}'
const coordinates: { x: number; y: number } = JSON.parse(json)
console.log('coordinates: ', coordinates)

// 2 - When we delay initialization
let words = ['red', 'green', 'blue']
let foundWord: boolean

words.forEach(word => {
  if (word === 'green') {
    foundWord = true
  }
})

// 3 - When ts cannot correctly infer the type (bad code example, good job as always, Stephen...)
let nums = [-10, -1, 12]
let numberAboveZero: boolean | number = false

nums.forEach(number => {
  if (number > 0) {
    numberAboveZero = number
  }
})
