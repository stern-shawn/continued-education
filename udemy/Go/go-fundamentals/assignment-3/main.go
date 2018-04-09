package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	// We expect that the first argument to the program is the filename
	fileToOpen := os.Args[1]
	// Open the file, and assign the resulting *File and potential err
	file, err := os.Open(fileToOpen)
	// Check for errors and exit gracefully if needed
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
	// File implements Read, so we can use io.Copy to copy the contents of the file to Stdout (the terminal)
	io.Copy(os.Stdout, file)
}
