package model

import "github.com/yanzhen74/gofront/src/gofrontdb"

type CCTC_Downlink_Update struct {
	Identify  int64            `xorm:"pk autoincr  notnull"` //自增id
	MsgTag    string           `xorm:"notnull"`
	MissionID string           `xorm:"notnull"`
	MsgType   string           `xorm:"notnull"`
	Subtype   string           `xorm:"notnull"`
	MSGID     string           `xorm:"notnull"`
	Sender    string           `xorm:"notnull"`
	Content   Content_Downlink `xorm:"notnull json"`
}
type Content_Downlink struct {
	PlanID    string
	BeginTime string
	EndTime   string
}

//入库
func CreateCCTC_Downlink_Update(process ...*CCTC_Downlink_Update) (int64, error) {
	e := gofrontdb.EngineGroup()
	return e.Insert(process)
	//stub:展示
}
