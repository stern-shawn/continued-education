package main

import (
	"fmt"
)

type englishBot struct{}
type spanishBot struct{}

func main() {
	eb := englishBot{}
	sb := spanishBot{}

	printGreeting(eb)
	printGreeting(sb)
}

func (eb englishBot) getGreeting() string {
	// Pretend there's VERY complicated, custom english magic here that's highly specific to this language
	return "Hey buddy!"
}

func (sb spanishBot) getGreeting() string {
	// Pretend there's VERY complicated, custom spanish magic here that's highly specific to this language
	return "Hola, amigo!"
}

// func (eb englishBot) printGreeting() {
// 	// Oh look, its so similar
// 	fmt.Println(eb.getGreeting())
// }

// func (sb spanishBot) printGreeting() {
// 	// Oh look, its so similar
// 	fmt.Println(sb.getGreeting())
// }

func printGreeting(eb englishBot) {
	// Oh look, its so similar
	fmt.Println(eb.getGreeting())
}

func printGreeting(sb englishBot) {
	// Oh look, its so similar
	fmt.Println(sb.getGreeting())
}
