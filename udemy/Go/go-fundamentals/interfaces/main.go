package main

import (
	"fmt"
)

// Declare a bot interface, ie any type that implements getGreeting fn that returns a string is considered a bot
type bot interface {
	getGreeting() string
}

// Declare the bot types
type englishBot struct{}
type spanishBot struct{}

func main() {
	eb := englishBot{}
	sb := spanishBot{}

	printGreeting(eb)
	printGreeting(sb)
}

// Generic fn that can accept any bot interface regardless of implementation
func printGreeting(b bot) {
	fmt.Println(b.getGreeting())
}

func (eb englishBot) getGreeting() string {
	// Pretend there's VERY complicated, custom english magic here that's highly specific to this language
	return "Hey buddy!"
}

func (sb spanishBot) getGreeting() string {
	// Pretend there's VERY complicated, custom spanish magic here that's highly specific to this language
	return "Hola, amigo!"
}
