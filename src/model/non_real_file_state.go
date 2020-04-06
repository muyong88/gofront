package model

import (
	"encoding/json"
	"fmt"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/gofrontdb"
)

type Non_Real_File_State struct {
	Identify      int64  `xorm:"pk autoincr  notnull" ` //自增id
	MsgSign       string `xorm:"notnull" `
	MsgTag        string `xorm:"notnull" json:"msgTag"`
	MsgType       string `xorm:"notnull" json:"msgType"`
	MissionID     string `xorm:"notnull" json:"missionID"`
	Subtype       string `xorm:"notnull" json:"subtype"`
	MSGID         string `xorm:"notnull" json:"MSGID"`
	Sender        string `xorm:"notnull" json:"sender"`
	Timestamp     string `xorm:"notnull" json:"timestamp"`
	Type          string `xorm:"notnull" json:"type"`
	SendSessionID string `xorm:"notnull" json:"sendSessionID"`
	FileName      string `xorm:"notnull" json:"fileName"`
	FilePath      string `xorm:"notnull" json:"filePath"`
	Status        string `xorm:"notnull" json:"status"`
	Station       string `xorm:"notnull" json:"station"`
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

//条件查询
func GetNonRealProcessStateCondition(msgType string, missionID string) ([]map[string]string, error) {
	sqlText := "select * from Non_Real_File_State where MsgType = '%s' and MissionID = '%s' "
	sqlText = fmt.Sprintf(sqlText, msgType, missionID)
	return gofrontdb.EngineGroup().QueryString(sqlText)
}

func (this *Non_Real_File_State) GetJsonString() string {
	data, err := json.Marshal(this)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}
