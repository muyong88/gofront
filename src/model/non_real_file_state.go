package model

import (
	"encoding/json"
	"fmt"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/gofrontdb"
)

//NonRealFileState 非实时文件状态结构体
type NonRealFileState struct {
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
	StartTime     string `json:"startTime"`
	EndTime       string `json:"endTime"`
}

//CreateNonRealFileState 入库
func CreateNonRealFileState(state *NonRealFileState) (int64, error) {
	state.MsgSign = "NonRealFileState"
	e := gofrontdb.EngineGroup()
	return e.Insert(state)
}

//GetNonRealFileState 查询一条
func GetNonRealFileState(state *NonRealFileState) (bool, error) {
	e := gofrontdb.EngineGroup()
	return e.Get(state)
}

//GetAllNonRealProcessState 查询所有
func GetAllNonRealProcessState() ([]map[string]string, error) {
	return gofrontdb.EngineGroup().QueryString("select * from NonRealFileState")
}

//GetNonRealProcessStateCondition 条件查询
func GetNonRealProcessStateCondition(msgType string, missionID string, startTime string, endTime string) ([]map[string]string, error) {
	sqlText := "select * from NonRealFileState where MsgType = '%s' and MissionID = '%s'"
	sqlText = fmt.Sprintf(sqlText, msgType, missionID)
	if startTime != "" {
		sqlText = sqlText + fmt.Sprintf(" and timestamp >= '%s'", startTime)
	}
	if endTime != "" {
		sqlText = sqlText + fmt.Sprintf(" and timestamp <= '%s'", endTime)
	}
	return gofrontdb.EngineGroup().QueryString(sqlText)
}

//GetJSONString 获取json
func (non *NonRealFileState) GetJSONString() string {
	data, err := json.Marshal(non)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}
