package main

import (
	"fmt"
	"net/http"
)

func main() {
	urls := []string{
		"http://google.com",
		"http://facebook.com",
		"http://stackoverflow.com",
		"http://golang.org",
		"http://amazon.com",
	}

	// Create a channel so the main routine and children can talk to each other using strings
	c := make(chan string)

	// Generate a new go routine for each url
	for _, url := range urls {
		go checkURL(url, c)
	}

	// Whenever the channel returns a value, spawn another routine to check the checked url again
	// This syntax says 'whenever c returns a new value, assign it to `u` and execute the loop body
	for u := range c {
		go checkURL(u, c)
	}
}

func checkURL(url string, c chan string) {
	_, err := http.Get(url)
	if err != nil {
		fmt.Println(url, "might be down!")
		// Pass the url back into the channel to perform another check
		c <- url
		// Early return to prevent other code from executing unexpectedly
		return
	}
	fmt.Println(url, "is up!")
	// Pass the url back into the channel to perform another check
	c <- url
}
