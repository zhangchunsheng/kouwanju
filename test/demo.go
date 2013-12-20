package main

import (
	"time"
	"fmt"
)

func add(x int, y int) int {
	fmt.Println("x:", x, "y:", y);
	fmt.Println(time.Now().UnixNano());
	fmt.Println(time.Now().Unix());
	fmt.Println(time.Now().UnixNano() / 1000000);
	return x + y;
}

func main() {
	fmt.Println(add(1,1));
}