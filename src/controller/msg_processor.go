package controller

import (
	"encoding/json"
	"fmt"
	"reflect"
	"time"

	"github.com/yanzhen74/gofront/src/model"
)

func RunProcessor() {
	for {
		msgRe := <-model.MsgChan
		if msgRe.Topic == "MCSMES" {
			var file_state model.Non_Real_File_state
			err1 := json.Unmarshal(msgRe.Content, &file_state)
			if err1 != nil {
				fmt.Println(err1)
				continue
			}
			_, err2 := model.CreateNon_Real_File_state(&file_state)
			if err2 != nil {
				fmt.Println(err2)
			}
		}
		SendWebsocketMsg(msgRe.Content) //for test
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
