package model

import (
	"encoding/json"

	"github.com/kataras/golog"
)

type Protocal_Command struct {
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

type ParaInfo struct {
	MODE string `json:"MODE"`
}

func (this *Protocal_Command) GetJsonCommand() string {
	data, err := json.Marshal(this)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}
func (this *Protocal_Command) InitByJson(data []byte) error {
	return json.Unmarshal(data, this)
}
