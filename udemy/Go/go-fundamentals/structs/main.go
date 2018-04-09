package main

import (
	"fmt"
)

type contactInfo struct {
	email   string
	zipCode int
}

// Declare a `person` struct, think plain object in JS or a dict in Python
type person struct {
	firstName   string
	lastName    string
	contactInfo // Equivalent to object property value shorthand from JavaScript ES6! contactInfo: contactInfo
}

func main() {
	shawn := person{
		firstName: "Shawn",
		lastName:  "Stern",
		contactInfo: contactInfo{
			email:   "shawn@nicetryscrapers.com",
			zipCode: 90210,
		},
	}

	shawn.print()
	shawn.updateName("Shawnzie")
	shawn.print()
}

func (p *person) updateName(newFirstName string) {
	p.firstName = newFirstName
}

func (p person) print() {
	fmt.Printf("%+v\n", p)
}
