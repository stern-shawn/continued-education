package main

import (
	"fmt"
)

func main() {
	// var colors map[string]string

	// colors := make(map[string]string)

	// We always have to use braces when assigning new keys to a map in Go
	// colors["red"] = "#ff0000"
	// colors["white"] = "#ffffff"
	// colors["blue"] = "#0000ff"
	colors := map[string]string{
		"red":   "#ff0000",
		"green": "#00ff00",
		"blue":  "#0000ff",
		"white": "#ffffff",
	}

	// delete(colors, "blue")

	printMap(colors)

}

func printMap(c map[string]string) {
	for color, hex := range c {
		fmt.Println("Hex code for", color, "is", hex)
	}
}
