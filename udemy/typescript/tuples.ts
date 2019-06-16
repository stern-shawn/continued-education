const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
}

type Drink = [string, boolean, number]

// Annotate as a tuple where the order is significant
const pepsi: Drink = ['brown', true, 40]
const sprite: Drink = ['clear', true, 40]
const tea: Drink = ['brown', false, 0]

pepsi[0] = 40 // ts error
