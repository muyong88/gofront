package controller

import (
	"reflect"
	"time"

	"github.com/yanzhen74/gofront/src/model"
)

func RunProcessor() {
	for {
		str := <-model.MsgChan
		SendWebsocketMsg(str.Content) //for test
	}
}
func init_cases(msgChan chan []byte,
	ticker *time.Ticker) (cases []reflect.SelectCase) {
	// chan view register
	selectcase := reflect.SelectCase{
		Dir:  reflect.SelectRecv,
		Chan: reflect.ValueOf(msgChan),
	}
	cases = append(cases, selectcase)

	// 定时器
	selectcase = reflect.SelectCase{
		Dir:  reflect.SelectRecv,
		Chan: reflect.ValueOf(ticker.C),
	}
	cases = append(cases, selectcase)
	return
}
