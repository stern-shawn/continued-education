package main

import (
	"fmt"
)

// Define a new type of 'deck' which is a slice of strings
type deck []string

// Instantiate a new deck
func newDeck() deck {
	cards := deck{}

	// Define the suits and card values, then use a nested loop to generate each value instead of doing so manually
	cardSuits := []string{"Spades", "Clubs", "Diamonds", "Hearts"}
	cardValues := []string{"Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"}

	// Replace unused variables with an `_` to indicate they're unused and clear syntax errors
	for _, suit := range cardSuits {
		for _, value := range cardValues {
			cards = append(cards, value+" of "+suit)
		}
	}

	return cards
}

// Define a receiver. Any variable of type 'deck' has access to this method
// Here `d` is the current copy the fn instance is working with as it's called
// `deck` is the type of variable that can call this fn on itself
func (d deck) print() {
	for i, card := range d {
		fmt.Println(i, card)
	}
}
