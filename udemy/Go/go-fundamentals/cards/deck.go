package main

import (
	"fmt"
	"io/ioutil"
	"strings"
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

// Deal a hand of cards (returns a deck of size handSize, and the original deck after having that many cards dealt out)
func deal(d deck, handSize int) (deck, deck) {
	// Use slice syntax (oh hey, this looks like Python!) to make two slices, one from 0 to handSize (noninclusive)
	// and from handSize to the end of the slice
	return d[:handSize], d[handSize:]
}

// Helper method for conversion from deck to string
func (d deck) toString() string {
	// Use the strings Join helper method to concat all values with separator ","
	// use `[]string(d)` to convert d from type `deck` to a slice of strings again
	// Actually, how about no, since `deck` is already a string slice... stupid Stephen
	return strings.Join(d, ",")
}

// Save the targeted deck to the filesystem with the given filename
func (d deck) saveToFile(filename string) error {
	// WriteFile expects a byteslice, so convert the deck as a string to a slice of bytes. Use permissions 0666 for full r/w
	// Return the possible error that may occur
	return ioutil.WriteFile(filename, []byte(d.toString()), 0666)
}
