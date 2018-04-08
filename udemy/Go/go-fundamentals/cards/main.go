package main

import (
	"fmt"
)

func main() {
	// Verbose declaration + assignment
	// var card string = "Ace of Spades"

	// Short syntax for declare + assign + inferred type
	// card := "Ace of Spades"

	// Create a new slice of strings
	// cards := deck{"Two of Spades", newCard()}
	// cards = append(cards, "Six of Diamonds")

	cards := newDeck()
	cards.saveToFile("myCards")

	// hand, remainingCards := deal(cards, 5)

	// hand.print()
	// remainingCards.print()
	fmt.Println(cards.toString())
}
