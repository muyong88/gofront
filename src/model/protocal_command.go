package model

import (
	"encoding/json"
	"github.com/kataras/golog"
)

type Protocal_Command struct {
	MsgType     string
	ID          int
	MID         string
	BID         string
	ProcessName string
	OrderSeq    int
	OrderName   string
	ParaInfo    ParaInfo
	Protocal    string
}

type ParaInfo struct {
	MODE string
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
