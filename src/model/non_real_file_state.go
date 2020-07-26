package model

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/gofrontdb"
)

//NonRealFileState 非实时文件状态结构体
type NonRealFileState struct {
	// Identify      int64  `xorm:"pk autoincr  notnull" ` //自增id
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
	UpDateTime    string `json:"updateTime"` //入库时间
	Limit         int    `json:"limit"`
	Start         int    `json:"start"`
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

//GetNonRealProcessAfterUpdateTime  查询更新时间之后的数据
// func GetNonRealProcessAfterUpdateTime(updateTime string) (state []NonRealFileState) {
// 	gofrontdb.EngineGroup().Where("UpDateTime >=  ?", updateTime).Find(&state)
// 	return state
// }

//GetNonRealProcessAfterUpdateTime  查询更新时间之后的数据
func GetNonRealProcessAfterUpdateTime(updateTime string, limit int, start int) ([]map[string]string, int) {
	sqlText := "select * from NonRealFileState where " + fmt.Sprintf(" UpDateTime >=   '%s' ", updateTime)
	data, _ := gofrontdb.EngineGroup().QueryString(sqlText)
	count := 0
	if data != nil {
		count = len(data)
	}
	sqlText = sqlText + " ORDER BY UpDateTime DESC limit " + strconv.Itoa(limit) + " offset " + strconv.Itoa(start)
	retRes, _ := gofrontdb.EngineGroup().QueryString(sqlText)
	return retRes, count
}

//GetNonRealProcessStateCondition 条件查询
func GetNonRealProcessStateCondition(ty string, station string, startTime string, endTime string, limit int, start int) ([]map[string]string, int) {
	sqlText := "select * from NonRealFileState where 1 = 1 "
	if ty != "ALL" {
		sqlText = sqlText + fmt.Sprintf(" and Type = '%s'", ty)
	}
	if station != "ALL" {
		sqlText = sqlText + fmt.Sprintf(" and Station = '%s'", station)
	}
	if startTime != "" {
		sqlText = sqlText + fmt.Sprintf(" and timestamp >= '%s'", startTime)
	}
	if endTime != "" {
		sqlText = sqlText + fmt.Sprintf(" and timestamp <= '%s'", endTime)
	}
	data, _ := gofrontdb.EngineGroup().QueryString(sqlText)
	count := 0
	if data != nil {
		count = len(data)
	}
	sqlText = sqlText + " ORDER BY UpDateTime DESC limit " + strconv.Itoa(limit) + " offset " + strconv.Itoa(start)
	retRes, _ := gofrontdb.EngineGroup().QueryString(sqlText)
	return retRes, count
}

//GetJSONString 获取json
func (non *NonRealFileState) GetJSONString() string {
	data, err := json.Marshal(non)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}
