package main

import (
	"fmt"
)

type shape interface {
	getArea() float64
}

type square struct {
	sideLength float64
}
type triangle struct {
	base   float64
	height float64
}

func main() {
	// Define some shapes
	newSquare := square{sideLength: 3.14}
	newTriangle := triangle{base: 3.14, height: 1.59}

	// Print their areas
	printArea(newSquare)
	printArea(newTriangle)
}

// Take any given shape and print the result of its getArea method
func printArea(s shape) {
	fmt.Println("The area is:", s.getArea())
}

func (s square) getArea() float64 {
	return s.sideLength * s.sideLength
}

func (t triangle) getArea() float64 {
	return 0.5 * t.base * t.height
}
