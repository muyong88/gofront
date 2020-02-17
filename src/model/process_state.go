package model

import (
	"encoding/json"

	"github.com/yanzhen74/gofront/src/gofrontdb"
)

type Process_State struct {
	Id                   int64   `xorm:"pk autoincr  notnull"`
	MsgType              string  `xorm:"notnull" json:"msgType"`
	ProcessId            int8    `xorm:"notnull" json:"processId"`
	SysId                int8    `xorm:"notnull" json:"sysId"`
	Pattern              int8    `xorm:"notnull" json:"pattern"`
	Channel              int8    `xorm:"notnull" json:"channel"`
	IsSend32KB           int8    `xorm:"notnull" json:"isSend32KB"`
	IsSendIPinIP         int8    `xorm:"notnull" json:"isSendIPinIP"`
	IsSaveFile           int8    `xorm:"notnull" json:"isSaveFile"`
	IsArchive            int8    `xorm:"notnull" json:"isArchive"`
	ResendShmHead        string  `xorm:"notnull" json:"resendShmHead"`
	ResendShmTear        string  `xorm:"notnull" json:"resendShmTear"`
	ResendWriteShmLoop   string  `xorm:"notnull" json:"resendWriteShmLoop"`
	ResendReadShmLoop    string  `xorm:"notnull" json:"resendReadShmLoop"`
	ResendWriteShmSpeed  float64 `xorm:"notnull" json:"resendWriteShmSpeed"`
	ResendReadShmSpeed   float64 `xorm:"notnull" json:"resendReadShmSpeed"`
	SaveShmHead          string  `xorm:"notnull" json:"saveShmHead"`
	SaveShmTear          string  `xorm:"notnull" json:"saveShmTear"`
	SaveWriteShmLoop     string  `xorm:"notnull" json:"saveWriteShmLoop"`
	SaveReadShmLoop      string  `xorm:"notnull" json:"saveReadShmLoop"`
	SaveWriteShmSpeed    float64 `xorm:"notnull" json:"saveWriteShmSpeed"`
	SaveReadShmSpeed     float64 `xorm:"notnull" json:"saveReadShmLoop"`
	RecvBeats            int8    `xorm:"notnull" json:"recvBeats"`
	ResendBeats          int8    `xorm:"notnull" json:"resendBeats"`
	SaveBeats            int8    `xorm:"notnull" json:"saveBeats"`
	RecvBytes            string  `xorm:"notnull" json:""recvBytes`
	Send32KFrames        string  `xorm:"notnull" json:"send32KFrames"`
	SendIPinIPFrames     string  `xorm:"notnull" json:"sendIPinIPFrames"`
	SendSmallCraftFrames string  `xorm:"notnull" json:"sendSmallCraftFrames"`
	TimeStamp            string  `xorm:"notnull" json:"timeStamp"`
}

func CreateProcessState(process ...*Process_State) (int64, error) {
	e := gofrontdb.EngineGroup()
	return e.Insert(process)
	//stub:展示
}
func GetUserFromJson(data []byte) (*Process_State, error) {
	var process_state Process_State
	err := json.Unmarshal(data, &process_state)
	return &process_state, err
}
