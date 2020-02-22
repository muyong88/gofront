package model

import (
	"github.com/yanzhen74/gofront/src/gofrontdb"
)

type Non_Real_File_state struct {
	Identify      int64  `xorm:"pk autoincr  notnull"` //自增id
	MsgTag        string `xorm:"notnull"`
	MsgType       string `xorm:"notnull"`
	MissionID     string `xorm:"notnull"`
	Subtype       string `xorm:"notnull"`
	MSGID         string `xorm:"notnull"`
	Sender        string `xorm:"notnull"`
	Timestamp     string `xorm:"notnull"`
	Type          string `xorm:"notnull"`
	SendSessionID string `xorm:"notnull"`
	FileName      string `xorm:"notnull"`
	FilePath      string `xorm:"notnull"`
	Status        string `xorm:"notnull"`
	Station       string `xorm:"notnull"`
}

//入库
func CreateNon_Real_File_state(state ...*Non_Real_File_state) (int64, error) {
	e := gofrontdb.EngineGroup()
	return e.Insert(state)
	//stub:展示
}
