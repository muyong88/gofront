package model

import (
	"time"

	"github.com/yanzhen74/gofront/src/gofrontdb"
)

type Process_State struct {
	Id                   int64     `xorm:"pk autoincr  notnull"`
	MsgType              string    `xorm:"notnull"`
	ProcessId            int8      `xorm:"notnull"`
	SysId                int8      `xorm:"notnull"`
	Pattern              int8      `xorm:"notnull"`
	Channel              int8      `xorm:"notnull"`
	IsSend32KB           int8      `xorm:"notnull"`
	IsSendIPinIP         int8      `xorm:"notnull"`
	IsSaveFile           int8      `xorm:"notnull"`
	IsArchive            int8      `xorm:"notnull"`
	ResendShmHead        string    `xorm:"notnull"`
	ResendShmTear        string    `xorm:"notnull"`
	ResendWriteShmLoop   string    `xorm:"notnull"`
	ResendReadShmLoop    string    `xorm:"notnull"`
	ResendWriteShmSpeed  float64   `xorm:"notnull"`
	ResendReadShmSpeed   float64   `xorm:"notnull"`
	SaveShmHead          string    `xorm:"notnull"`
	SaveShmTear          string    `xorm:"notnull"`
	SaveWriteShmLoop     string    `xorm:"notnull"`
	SaveReadShmLoop      string    `xorm:"notnull"`
	SaveWriteShmSpeed    float64   `xorm:"notnull"`
	SaveReadShmSpeed     float64   `xorm:"notnull"`
	RecvBeats            int8      `xorm:"notnull"`
	ResendBeats          int8      `xorm:"notnull"`
	SaveBeats            int8      `xorm:"notnull"`
	RecvBytes            string    `xorm:"notnull"`
	Send32KFrames        string    `xorm:"notnull"`
	SendIPinIPFrames     string    `xorm:"notnull"`
	SendSmallCraftFrames string    `xorm:"notnull"`
	TimeStamp            time.Time `xorm:"notnull"`
}

func CreateProcessState(process ...*Process_State) (int64, error) {
	e := gofrontdb.EngineGroup()
	return e.Insert(process)
	//stub:展示
}
