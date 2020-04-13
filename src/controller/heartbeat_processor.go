package controller

import (
	"encoding/json"
	"time"

	"github.com/yanzhen74/gofront/src/model"
)

//记录上一次三类数据更新时间
var (
	CTCCUpdateTime      time.Time
	ProctocalUpdateTime time.Time
	NonRealUpdateTime   time.Time
)

//RunHeartBeatProcessor 心跳监测，每隔一段时间判断一次
func RunHeartBeatProcessor() {
	ticker := time.NewTicker(time.Second * time.Duration(15))
	for {
		timeNow := <-ticker.C
		diff, _ := time.ParseDuration("30s")
		if timeNow.After(CTCCUpdateTime.Add(diff)) {
			//心跳失败
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "CTCC HeartBeat Failure", MsgFlag: "CTCCHB", SuccessFlag: "warning"}
			msgJSON, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJSON))
		} else {
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "CTCC HeartBeat Success", MsgFlag: "CTCCHB", SuccessFlag: "success"}
			msgJSON, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJSON))
		}
		time.Sleep(200 * time.Millisecond)
		if timeNow.After(ProctocalUpdateTime.Add(diff)) {
			//心跳失败
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "Proctocal HeartBeat Failure", MsgFlag: "ProctocalHB", SuccessFlag: "warning"}
			msgJSON, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJSON))
		} else {
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "Proctocal HeartBeat Success", MsgFlag: "ProctocalHB", SuccessFlag: "success"}
			msgJSON, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJSON))
		}
		time.Sleep(200 * time.Millisecond)
		if timeNow.After(NonRealUpdateTime.Add(diff)) {
			//心跳失败
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "NonReal HeartBeat Failure", MsgFlag: "NonRealHB", SuccessFlag: "warning"}
			msgJSON, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJSON))
		} else {
			msg := model.NewMeassage{MsgSign: "NewMessage", TimeStamp: timeNow.Format("2006-01-02 15:04:05"), MsgSummary: "NonReal HeartBeat Success", MsgFlag: "NonRealHB", SuccessFlag: "success"}
			msgJSON, _ := json.Marshal(msg)
			SendWebsocketMsg([]byte(msgJSON))
		}
	}
}
