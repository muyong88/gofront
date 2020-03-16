package model

import (
	"encoding/json"
	"github.com/kataras/golog"
)

type CCTC_Command struct {
	MsgType        string `json:"msgType"`
	Operation      string `json:"Operation"`
	SysId          int    `json:"SysId"`
	Pattern        int    `json:"Pattern"`
	Channel        int    `json:"Channel"`
	BeginTime      string `json:"BeginTime"`
	EndTime        string `json:"EndTime"`
	MainHostName   string `json:"MainHostName"`
	BackupHostName string `json:"BackupHostName"`
}

func (this *CCTC_Command) GetJsonCommand() string {
	data, err := json.Marshal(this)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}
func (this *CCTC_Command) InitByJson(data []byte) error {
	return json.Unmarshal(data, this)
}
