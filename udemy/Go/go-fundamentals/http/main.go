package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

type logWriter struct{}

func main() {
	resp, err := http.Get("http://google.com")

	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}

	// // Make a huge slice that can receive the bytes once the request body is converted to byte slice by Reader
	// // Go ahead and use the same size as defined by the io package `copyBuffer` method for brownie points
	// bs := make([]byte, 32 * 1024)

	// // Call the reader on our byte slice, the reader will operate directly on the value of the slice for us
	// resp.Body.Read(bs)

	// // Convert to a readable string and print
	// fmt.Println(string(bs))

	// // Pass the Reader from resp.Body and the Writer from os to the Copy fn, so that the http response is written to the terminal for us!
	// io.Copy(os.Stdout, resp.Body)

	// Let's see what happens when we use our custom Writer instead of os.Stdout
	lw := logWriter{}
	io.Copy(lw, resp.Body)
}

// Our own Writer implementation that takes a byte slice, prints to the console, and returns the expected byte length + nil error
func (logWriter) Write(bs []byte) (int, error) {
	fmt.Println(string(bs))
	fmt.Println("Just wrote", len(bs), "bytes")

	return len(bs), nil
}
