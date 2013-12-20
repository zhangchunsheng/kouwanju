package main

import (
	"net/http"
	"time"
	"fmt"
)

func run(endtime chan int64, i int) {
	start := time.Now().UnixNano() / 1000000;
	resp ,err := http.Get("http://192.168.1.22:4011/auth?token=464363099bc522beb8aff5cf16bbcf019f8516f3bc58e4b2d585d9a40b8d2ac5&jsoncallback=jQuery1102018609981704503298_1379907252269&_=1379907252270");
 	if(err != nil) {
 		println("err:" + err.Error());
 		return;
 	}
 	defer resp.Body.Close();
	
	mtime := time.Now().UnixNano() / 1000000 - start;
	fmt.Println("第", i, "次请求用时:", mtime,"毫秒");
	endtime <- mtime;
	
 	buf := make([]byte, 5000);
	num,error := resp.Body.Read(buf)
	//io.ReadFull(resp.Body,buf);	
	if(error != nil && num < 3292) {
		println("error:" + error.Error());
		return;
	}
}

func main() {
	//var starts []int64 = make([]int64, 20);
	num := 100;
	end := make([]chan int64, num);
	
	start := time.Now().UnixNano() / 1000000;
	i := 0;
	for ; i < num ; i++ {
		//starts[i] = time.Now().UnixNano();
		end[i] = make(chan int64);
		go run(end[i], i);
	}
	
	var alltime int64 = 0;
	for _,ch := range(end) {
		alltime += <- ch
	}
	fmt.Println("共计用时:", alltime,"毫秒");
	fmt.Println("平均用时:", alltime / (int64(num)),"毫秒");
	
	if i == num {
		mtime := time.Now().UnixNano() / 1000000 - start;
		fmt.Println("-------------------------------");
		fmt.Println("共计用时:", mtime,"毫秒");
		fmt.Println("平均用时:", mtime / (int64(num)),"毫秒");
	}
}