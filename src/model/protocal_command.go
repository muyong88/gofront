package model

import (
	"encoding/json"

	"github.com/kataras/golog"
)

//ProtocalCommand 协议命令结构体
type ProtocalCommand struct {
	MsgType     string   `json:"msgType"`
	ID          int      `json:"ID"`
	MID         string   `json:"MID"`
	BID         string   `json:"BID"`
	ProcessName string   `json:"ProcessName"`
	OrderSeq    int      `json:"OrderSeq"`
	OrderName   string   `json:"OrderName"`
	ParaInfo    ParaInfo `json:"ParaInfo"`
	Protocal    string   `json:"Protocal"`
}

//ParaInfo ParaInfo
type ParaInfo struct {
	MODE string `json:"MODE"`
}

//GetJSONCommand get json
func (pro *ProtocalCommand) GetJSONCommand() string {
	data, err := json.Marshal(pro)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}

//InitByJSON init
func (pro *ProtocalCommand) InitByJSON(data []byte) error {
	return json.Unmarshal(data, pro)
}
