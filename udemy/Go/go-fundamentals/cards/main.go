package main

import "fmt"

func main() {
	// Verbose declaration + assignment
	// var card string = "Ace of Spades"

	// Short syntax for declare + assign + inferred type
	// card := "Ace of Spades"

	// Create a new slice of strings
	cards := deck{"Two of Spades", newCard()}
	cards = append(cards, "Six of Diamonds")

	// Iterate over the index and values of cards
	for i, card := range cards {
		fmt.Println(i, card)
	}
}

// Note that we need to explicitly declare the return data type to avoid compiler errors
func newCard() string {
	return "Five of Hearts"
}
