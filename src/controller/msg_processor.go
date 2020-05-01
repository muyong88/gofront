package controller

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/yanzhen74/gofront/src/model"
)

//RunProcessor 用于KAFKA接收数据
func RunProcessor() {
	for {
		msgRe := <-model.MsgChan
		network, err := NetConfig.GetNetWorkByNetWorkSeqNum("6")
		if err != nil {
			continue
		}
		if msgRe.Topic == network.NetWorkTopic {
			var fileState model.NonRealFileState
			err1 := json.Unmarshal(msgRe.Content, &fileState)
			if err1 != nil {
				fmt.Println(err1)
				continue
			}
			fileState.UpDateTime = time.Now().Format("2006-01-02 15:04:05")
			_, err2 := model.CreateNonRealFileState(&fileState)
			if err2 != nil {
				fmt.Println(err2)
			}
			SendWebsocketMsg([]byte(fileState.GetJSONString()))
			NonRealUpdateTime = time.Now()
		}

	}
}
