package main

import (
	"fmt"
)

// Define a new type of 'deck' which is a slice of strings
type deck []string

// Define a receiver. Any variable of type 'deck' has access to this method
// Here `d` is the current copy the fn instance is working with as it's called
// `deck` is the type of variable that can call this fn on itself
func (d deck) print() {
	for i, card := range d {
		fmt.Println(i, card)
	}
}
