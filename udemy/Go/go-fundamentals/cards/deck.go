package main

import (
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"strings"
	"time"
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

// Read a file from the hard drive, and return a new `deck`
func newDeckFromFile(filename string) deck {
	// Byte slice and the potential error object
	bs, err := ioutil.ReadFile(filename)

	// Only perform if there was an error
	if err != nil {
		// Log the error and exit the program
		fmt.Println("Error: ", err)
		os.Exit(1)
	}

	// Convert the byte slice into a string
	// Split the string into a slice of strings on the comma delimiter
	// Convert the slice of strings to type `deck` :D

	return deck(strings.Split(string(bs), ","))
}

// Randomize the order of cards in the targeted deck
func (d deck) shuffle() {
	// Create a new rand source using the current time, and use that to create a unique instance of rand
	// Seeding the rand fn? Oh man it's like I'm back in college and working with Java...
	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)

	for i := range d {
		// Generate a random int between 0 and the end of the array to place the current card, using our own seeded rand instance
		newPosition := r.Intn(len(d) - 1)

		// Easy python-like swap!
		d[i], d[newPosition] = d[newPosition], d[i]
	}
}
