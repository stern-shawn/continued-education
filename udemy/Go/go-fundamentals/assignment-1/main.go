package main

import (
	"fmt"
)

// Print the numbers 0-10 and specify which are even and which are odd
func main() {
	// Instead of myInts := []int{0,1,2,...} do it programmatically for practice with Golang
	// Create a new int slice of length 11
	myInts := make([]int, 11)

	// Assign each element to have the value of its index to get 0, 1, 2...
	for i := range myInts {
		myInts[i] = i
	}

	// Loop over full range, use modulo to determine if even/odd
	for _, value := range myInts {
		if value%2 == 0 {
			fmt.Println(value, "is even")
		} else {
			fmt.Println(value, "is odd")
		}
	}
}
