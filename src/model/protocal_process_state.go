package model

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/gofrontdb"
	"github.com/yanzhen74/gofront/src/inits/parse"
)

//ProtocalProcessState 协议状态结构体
type ProtocalProcessState struct {
	// Identify     int64          `xorm:"pk autoincr  notnull"` //自增id
	MsgSign      string         `xorm:"notnull"`
	MsgType      string         `xorm:"notnull" json:"msgType"`      //消息类型
	ID           int            `xorm:"notnull" json:"ID"`           //软件标识
	MID          string         `xorm:"notnull" json:"MID"`          //任务号
	BID          string         `xorm:"notnull" json:"BID"`          //数据类型
	PID          int            `xorm:"notnull" json:"PID"`          //进程标识
	ProcessName  string         `xorm:"notnull" json:"ProcessName"`  //协议进程名称
	MainOrBackup int            `xorm:"notnull" json:"MainOrBackup"` //主备类型
	Report       ProtocalReport `xorm:"notnull"`                     //报告内容
	StartTime    string         `json:"startTime"`
	EndTime      string         `json:"endTime"`
	UpDateTime   string         `json:"updateTime"` //入库时间
	Limit        int            `json:"limit"`
	Start        int            `json:"start"`
}

//ProtocalReport ProtocalReport
type ProtocalReport struct {
	// Identify         int64  `xorm:"pk autoincr  notnull"`              //自增id
	ReportType       string `xorm:"notnull" json:"Report_type"`        //报告类型
	CommandType      string `xorm:"notnull" json:"Command_type"`       //命令类型
	CommandResult    string `xorm:"notnull" json:"Command_result"`     //命令结果
	RecvStatusRevert bool   `xorm:"notnull" json:"Recv_status_revert"` //接收状态反转
	RecvStatus       bool   `xorm:"notnull" json:"Recv_status"`        //接收状态
	First            string `xorm:"notnull" json:"First"`              //接收的第一帧时间
	Last             string `xorm:"notnull" json:"Last"`               //接收的最后一帧时间
	RecvCount        int64  `xorm:"notnull" json:"Recv_count"`         //接收帧数
	SendNo           int64  `xorm:"notnull" json:"Send_no"`            //上行帧序号
}

//ProtocalProcessStateDb 用作入库
type ProtocalProcessStateDb struct {
	// Identify         int64  `xorm:"pk autoincr  notnull"` //自增id
	MsgSign          string `xorm:"notnull"`
	MsgType          string `xorm:"notnull"`    //消息类型
	ID               int    `xorm:"notnull"`    //软件标识
	MID              string `xorm:"notnull"`    //任务号
	BID              string `xorm:"notnull"`    //数据类型
	PID              int    `xorm:"notnull"`    //进程标识
	ProcessName      string `xorm:"notnull"`    //协议进程名称
	MainOrBackup     int    `xorm:"notnull"`    //主备类型
	ReportType       string `xorm:"notnull"`    //报告类型
	CommandType      string `xorm:"notnull"`    //命令类型
	CommandResult    string `xorm:"notnull"`    //命令结果
	RecvStatusRevert bool   `xorm:"notnull"`    //接收状态反转
	RecvStatus       bool   `xorm:"notnull"`    //接收状态
	First            string `xorm:"notnull"`    //接收的第一帧时间
	Last             string `xorm:"notnull"`    //接收的最后一帧时间
	RecvCount        int64  `xorm:"notnull"`    //接收帧数
	SendNo           int64  `xorm:"notnull"`    //上行帧序号
	UpDateTime       string `json:"updateTime"` //入库时间
}

//CreateProtocalProcessState 入库
func CreateProtocalProcessState(process *ProtocalProcessState) (int64, error) {
	process.MsgSign = "ProtocalProcessState"
	var processDb ProtocalProcessStateDb
	processDb.MsgSign = "ProtocalProcessState"
	processDb.MsgType = process.MsgType
	processDb.ID = process.ID
	processDb.MID = process.MID
	processDb.BID = process.BID
	processDb.PID = process.PID
	processDb.ProcessName = process.ProcessName
	processDb.MainOrBackup = process.MainOrBackup
	processDb.ReportType = process.Report.ReportType
	processDb.CommandType = process.Report.CommandType
	processDb.CommandResult = process.Report.CommandResult
	processDb.RecvStatusRevert = process.Report.RecvStatusRevert
	processDb.RecvStatus = process.Report.RecvStatus
	processDb.First = process.Report.First
	processDb.Last = process.Report.Last
	processDb.RecvCount = process.Report.RecvCount
	processDb.SendNo = process.Report.SendNo
	processDb.UpDateTime = process.UpDateTime
	e := gofrontdb.EngineGroup()
	return e.Insert(processDb)
}

//GetOneProctocalProcessState 查询一条
func GetOneProctocalProcessState(process *ProtocalProcessStateDb) (bool, error) {
	e := gofrontdb.EngineGroup()
	return e.Get(process)
}

//GetAllProctocalProcessDbState 查询所有
func GetAllProctocalProcessDbState() ([]map[string]string, error) {
	return gofrontdb.EngineGroup().QueryString("select * from ProtocalProcessStateDb ")
}

//GetProctocalProcessDbStateDbCount 查询总数
func GetProctocalProcessDbStateDbCount() int64 {
	member := new(ProtocalProcessStateDb)
	number, _ := gofrontdb.EngineGroup().Count(member)
	return number
}

// //GetProctocalProcessAfterUpdateTime  查询更新时间之后的数据
// func GetProctocalProcessAfterUpdateTime(updateTime string) (state []ProtocalProcessStateDb) {
// 	gofrontdb.EngineGroup().Where("UpDateTime >=  ?", updateTime).Find(&state)
// 	return state
// }

//GetProctocalProcessAfterUpdateTime  查询更新时间之后的数据
func GetProctocalProcessAfterUpdateTime(updateTime string, limit int, start int) ([]map[string]string, int) {
	sqlText := "select * from ProtocalProcessStateDb where " + fmt.Sprintf(" UpDateTime >=   '%s' ", updateTime)
	data, _ := gofrontdb.EngineGroup().QueryString(sqlText)
	count := 0
	if data != nil {
		count = len(data)
	}
	sqlText = sqlText + " ORDER BY UpDateTime DESC limit " + strconv.Itoa(limit) + " offset " + strconv.Itoa(start)
	retRes, _ := gofrontdb.EngineGroup().QueryString(sqlText)
	return retRes, count
}

//GetProctocalProcessFixed 获取最新fixed数据
func GetProctocalProcessFixed() (states []ProtocalProcessStateDb) {
	for _, v := range parse.PROTOCALFIXLIST.ProtocalList {
		var state ProtocalProcessStateDb
		gofrontdb.EngineGroup().Where("MID = ? and ProcessName = ? and MainOrBackup = ? and UpDateTime = (select max(UpDateTime) from ProtocalProcessStateDb where MID = ? and ProcessName = ? and MainOrBackup = ?) ", v.MID, v.PROCESSNAME, v.MainOrBackUp, v.MID, v.PROCESSNAME, v.MainOrBackUp).Get(&state)
		state.MID = v.MID
		state.ProcessName = v.PROCESSNAME
		state.MainOrBackup = v.MainOrBackUp
		state.BID = v.BID
		states = append(states, state)
	}
	return states
}

//GetProctocalProcessDbStateCondition 条件查询
func GetProctocalProcessDbStateCondition(mainOrBackup int, mid string, processName string, reprotType string, startTime string, endTime string, limit int, start int) ([]map[string]string, int) {
	sqlText := "select * from ProtocalProcessStateDb where 1 = 1 "
	if mid != "ALL" {
		sqlText = sqlText + fmt.Sprintf(" and MID = '%s'", mid)
	}
	if mainOrBackup != 0 {
		sqlText = sqlText + fmt.Sprintf(" and MainOrBackup =  %d", mainOrBackup)
	}
	if processName != "ALL" {
		sqlText = sqlText + fmt.Sprintf(" and ProcessName = '%s'", processName)
	}
	if reprotType != "ALL" {
		sqlText = sqlText + fmt.Sprintf(" and ReportType = '%s'", reprotType)
	}
	if startTime != "" {
		sqlText = sqlText + fmt.Sprintf(" and First >= '%s'", startTime)
	}
	if endTime != "" {
		sqlText = sqlText + fmt.Sprintf(" and Last <= '%s'", endTime)
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

//GetJSONString GET JSON STRING
func (pro *ProtocalProcessState) GetJSONString() string {
	data, err := json.Marshal(pro)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}

//GetDbJSONString  获取ProtocalProcessStateDb结构体json
func (pro *ProtocalProcessStateDb) GetDbJSONString() string {
	data, err := json.Marshal(pro)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}
