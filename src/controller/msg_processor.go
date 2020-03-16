package controller

import (
	"encoding/json"
	"fmt"

	"github.com/yanzhen74/gofront/src/model"
)

func RunProcessor() {
	for {
		msgRe := <-model.MsgChan
		network,err := NetConfig.GetNetWorkByNetWorkSeqNum("6")
		if err != nil {
			continue
		}
		if msgRe.Topic == network.NetWorkTopic {
			var file_state model.Non_Real_File_State
			err1 := json.Unmarshal(msgRe.Content, &file_state)
			if err1 != nil {
				fmt.Println(err1)
				continue
			}
			_, err2 := model.CreateNon_Real_File_State(&file_state)
			if err2 != nil {
				fmt.Println(err2)
			}
		}
		SendWebsocketMsg(msgRe.Content) //for test
	}
}
