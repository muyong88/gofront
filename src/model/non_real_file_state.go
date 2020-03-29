package model

import (
	"encoding/json"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/gofrontdb"
)

type Non_Real_File_State struct {
	Identify      int64  `xorm:"pk autoincr  notnull"` //自增id
	MsgSign       string `xorm:"notnull"`
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
func CreateNon_Real_File_State(state *Non_Real_File_State) (int64, error) {
	state.MsgSign = "Non_Real_File_State"
	e := gofrontdb.EngineGroup()
	return e.Insert(state)
}

//查询一条
func GetNon_Real_File_State(state *Non_Real_File_State) (bool, error) {
	e := gofrontdb.EngineGroup()
	return e.Get(state)
}

//查询所有
func GetAllNonRealProcessState() ([]map[string]string, error) {
	return gofrontdb.EngineGroup().QueryString("select * from Non_Real_File_State")
}

func (this *Non_Real_File_State) GetJsonString() string {
	data, err := json.Marshal(this)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}
