package model

import "github.com/yanzhen74/gofront/src/gofrontdb"

//CTCCDownlinkUpdate  下行计划更新结构体
type CTCCDownlinkUpdate struct {
	// Identify  int64           `xorm:"pk autoincr  notnull"` //自增id
	MsgTag    string          `xorm:"notnull"`
	MissionID string          `xorm:"notnull"`
	MsgType   string          `xorm:"notnull"`
	Subtype   string          `xorm:"notnull"`
	MSGID     string          `xorm:"notnull"`
	Sender    string          `xorm:"notnull"`
	Content   ContentDownlink `xorm:"notnull json"`
}

//ContentDownlink content
type ContentDownlink struct {
	PlanID    string
	BeginTime string
	EndTime   string
}

//CreateCTCCDownlinkUpdate 入库
func CreateCTCCDownlinkUpdate(process ...*CTCCDownlinkUpdate) (int64, error) {
	e := gofrontdb.EngineGroup()
	return e.Insert(process)
	//stub:展示
}
