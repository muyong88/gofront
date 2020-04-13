package model

import (
	"encoding/json"

	"github.com/kataras/golog"
)

//CTCCCommand CTCC命令结构体
type CTCCCommand struct {
	MsgType        string `json:"msgType"`
	Operation      string `json:"Operation"`
	SysID          int    `json:"SysId"`
	Pattern        int    `json:"Pattern"`
	Channel        int    `json:"Channel"`
	BeginTime      string `json:"BeginTime"`
	EndTime        string `json:"EndTime"`
	MainHostName   string `json:"MainHostName"`
	BackupHostName string `json:"BackupHostName"`
}

//GetJSONCommand GET JSON COMMAND
func (command *CTCCCommand) GetJSONCommand() string {
	data, err := json.Marshal(command)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}

//InitByJSON 用JSON初始化结构体
func (command *CTCCCommand) InitByJSON(data []byte) error {
	return json.Unmarshal(data, command)
}
