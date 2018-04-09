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
	firstName string
	lastName  string
	contact   contactInfo
}

func main() {
	shawn := person{
		firstName: "Shawn",
		lastName:  "Stern",
		contact: contactInfo{
			email:   "shawn@nicetryscrapers.com",
			zipCode: 90210,
		},
	}

	fmt.Printf("%+v", shawn)
}
