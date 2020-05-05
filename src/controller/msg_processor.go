package controller

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/model"
)

//RunProcessor 用于KAFKA接收数据
func RunProcessor() {
	network6, err6 := NetConfig.GetNetWorkByNetWorkSeqNum("6")
	network7, err7 := NetConfig.GetNetWorkByNetWorkSeqNum("7")
	network8, err8 := NetConfig.GetNetWorkByNetWorkSeqNum("8")
	if err6 != nil || err7 != nil || err8 != nil {
		return
	}
	for {
		msgRe := <-model.MsgChan
		if msgRe.Topic == network6.NetWorkTopic {
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
		} else if msgRe.Topic == network7.NetWorkTopic {
			var processState model.CTCCProcessState
			if err := json.Unmarshal(msgRe.Content, &processState); err != nil {
				fmt.Println(err)
				golog.Error(err)
				return
			}
			processState.UpDateTime = time.Now().Format("2006-01-02 15:04:05")
			//入库
			model.CreateCTCCProcessState(&processState)
			//展示
			SendWebsocketMsg([]byte(processState.GetJSONString()))
			CTCCUpdateTime = time.Now()
		} else if msgRe.Topic == network8.NetWorkTopic {
			var processState model.ProtocalProcessState
			if err := json.Unmarshal(msgRe.Content, &processState); err != nil {
				fmt.Println(err)
				return
			}
			// fmt.Println(process_state)
			processState.UpDateTime = time.Now().Format("2006-01-02 15:04:05")
			_, err := model.CreateProtocalProcessState(&processState)
			if err != nil {
				fmt.Println(err)
			}
			//展示
			SendWebsocketMsg([]byte(processState.GetJSONString()))
			ProctocalUpdateTime = time.Now()
			time.Sleep(300 * time.Millisecond)
			//如果接收状态反转，则发送一份到NEW MESSAGE
			if processState.Report.RecvStatusRevert == true {
				strSumary := "(" + processState.MID + "," + processState.ProcessName + "," + strconv.Itoa(int(processState.MainOrBackup)) + ")" + " Receiving data"
				var msg model.NewMeassage
				if processState.Report.RecvStatus == true {
					msg = model.NewMeassage{MsgSign: "NewMessage", TimeStamp: time.Now().Format("2006-01-02 15:04:05"), MsgSummary: strSumary, MsgFlag: "ProctocalRevStart", SuccessFlag: "Success", MID: processState.MID, ProcessName: processState.ProcessName, MainOrBackup: processState.MainOrBackup}
				} else {
					msg = model.NewMeassage{MsgSign: "NewMessage", TimeStamp: time.Now().Format("2006-01-02 15:04:05"), MsgSummary: strSumary, MsgFlag: "ProctocalRevEnd", SuccessFlag: "Success", MID: processState.MID, ProcessName: processState.ProcessName, MainOrBackup: processState.MainOrBackup}
				}
				msgJSON, _ := json.Marshal(msg)
				SendWebsocketMsg([]byte(msgJSON))
			}
		}

	}
}
