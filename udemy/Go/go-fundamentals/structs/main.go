package main

import (
	"fmt"
)

// Declare a `person` struct, think plain object in JS or a dict in Python
type person struct {
	firstName string
	lastName  string
}

func main() {
	// Declare a new struct, providing fields in order, yuck
	// shawn := person{"Shawn", "Stern"}

	// Declare a new struct more explicitly ala JavaScript
	// shawn := person{firstName: "Shawn", lastName: "Stern"}

	// Third method of struct declaration, values are defaulted to their type's `Zero Value`
	var shawn person
	shawn.firstName = "Shawn"
	shawn.lastName = "Stern"

	fmt.Println(shawn)
	fmt.Printf("%+v\n", shawn)
}
