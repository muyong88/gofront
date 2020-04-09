package controller

import (
	"encoding/json"
	"time"

	"github.com/yanzhen74/gofront/src/model"
)

var (
	CCTCUpdateTime      time.Time
	ProctocalUpdateTime time.Time
	NonRealUpdateTime   time.Time
)

func RunHeartBeatProcessor() {
	ticker := time.NewTicker(time.Second * time.Duration(15))
	for {
		timeNow := <-ticker.C
		diff, _ := time.ParseDuration("30s")
		if timeNow.After(CCTCUpdateTime.Add(diff)) {
			//心跳失败
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "CCTC HeartBeat Failure", MsgFlag: "CCTC", SuccessFlag: "warning"}
			msgJson, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJson))
		} else {
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "CCTC HeartBeat Success", MsgFlag: "CCTC", SuccessFlag: "success"}
			msgJson, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJson))
		}
		time.Sleep(200 * time.Millisecond)
		if timeNow.After(ProctocalUpdateTime.Add(diff)) {
			//心跳失败
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "Proctocal HeartBeat Failure", MsgFlag: "Proctocal", SuccessFlag: "warning"}
			msgJson, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJson))
		} else {
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "Proctocal HeartBeat Success", MsgFlag: "Proctocal", SuccessFlag: "success"}
			msgJson, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJson))
		}
		time.Sleep(200 * time.Millisecond)
		if timeNow.After(NonRealUpdateTime.Add(diff)) {
			//心跳失败
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "NonReal HeartBeat Failure", MsgFlag: "NonReal", SuccessFlag: "warning"}
			msgJson, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJson))
		} else {
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "NonReal HeartBeat Success", MsgFlag: "NonReal", SuccessFlag: "success"}
			msgJson, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJson))
		}
	}
}
