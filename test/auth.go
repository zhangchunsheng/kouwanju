package main

import (
	"net/http"
	"time"
)

func run(endtime chan int64) {
	start := time.Now().UnixNano();
	resp ,err := http.Get("http://192.168.1.22:4011/auth?token=464363099bc522beb8aff5cf16bbcf019f8516f3bc58e4b2d585d9a40b8d2ac5&jsoncallback=jQuery1102018609981704503298_1379907252269&_=1379907252270");
 	if(err != nil) {
 		println("err:" + err.Error());
 		return;
 	}
 	defer resp.Body.Close();
 	buf := make([]byte, 5000);
	num,error := resp.Body.Read(buf)
	//io.ReadFull(resp.Body,buf);	
	if(error != nil && num < 3292) {
		println("error:" + error.Error());
		return;
	}
	mtime := time.Now().UnixNano() - start;
	endtime <- mtime;
}

func main() {
	//var starts []int64 = make([]int64, 20);
	num := 300;
	end := make([]chan int64, num);
	for  i := 0 ; i < num ; i++ {
		//starts[i] = time.Now().Unix();
		end[i] = make(chan int64);
		go run(end[i]);
	}
	var alltime int64 = 0;
	for _,ch := range(end) {
		alltime +=<-ch
	}
	println(alltime);
	println(alltime/(int64(num)));
}