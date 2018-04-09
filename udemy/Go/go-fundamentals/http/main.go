package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	resp, err := http.Get("http://google.com")

	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}

	// Make a huge slice that can receive the bytes once the brequest body is converted to byte slice by Reader
	bs := make([]byte, 99999)

	// Call the reader on our byte slice, the reader will operate directly on the value of the slice for us
	resp.Body.Read(bs)

	// Convert to a readable string and print
	fmt.Println(string(bs))
}
