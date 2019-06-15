const add = (a: number, b: number) => a + b

function divide(a: number, b: number) {
  return a / b
}

const multiply = function(a: number, b: number) {
  return a * b
}

const logger = (message: string): void => {
  console.log(message)
}

// Silly example, but showcases when never would be relevant
const throwError = (message: string): never => {
  throw new Error(message)
}

const todaysWeather = {
  date: new Date(),
  weather: 'sunny',
}

const logWeather = ({ date, weather }: { date: Date; weather: string }) => {
  console.log(date)
  console.log(weather)
}

logWeather(todaysWeather)
