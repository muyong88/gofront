package model

import (
	"encoding/json"
	"fmt"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/gofrontdb"
)

type Protocal_Process_State struct {
	Identify     int64           `xorm:"pk autoincr  notnull"` //自增id
	MsgSign      string          `xorm:"notnull"`
	MsgType      string          `xorm:"notnull" json:"msgType"`      //消息类型
	ID           int8            `xorm:"notnull" json:"ID"`           //软件标识
	MID          string          `xorm:"notnull" json:"MID"`          //任务号
	BID          string          `xorm:"notnull" json:"BID"`          //数据类型
	PID          int             `xorm:"notnull" json:"PID"`          //进程标识
	ProcessName  string          `xorm:"notnull" json:"ProcessName"`  //协议进程名称
	MainOrBackup int8            `xorm:"notnull" json:"MainOrBackup"` //主备类型
	Report       Protocal_Report `xorm:"notnull"`                     //报告内容
}

type Protocal_Report struct {
	Identify           int64  `xorm:"pk autoincr  notnull"`              //自增id
	Report_type        string `xorm:"notnull" json:"Report_type"`        //报告类型
	Command_type       string `xorm:"notnull" json:"Command_type"`       //命令类型
	Command_result     string `xorm:"notnull" json:"Command_result"`     //命令结果
	Recv_status_revert bool   `xorm:"notnull" json:"Recv_status_revert"` //接收状态反转
	Recv_status        bool   `xorm:"notnull" json:"Recv_status"`        //接收状态
	First              string `xorm:"notnull" json:"First"`              //接收的第一帧时间
	Last               string `xorm:"notnull" json:"Last"`               //接收的最后一帧时间
	Recv_count         int64  `xorm:"notnull" json:"Recv_count"`         //接收帧数
	Send_no            int64  `xorm:"notnull" json:"Send_no"`            //上行帧序号
}

type Protocal_Process_State_Db struct {
	Identify           int64  `xorm:"pk autoincr  notnull"` //自增id
	MsgSign            string `xorm:"notnull"`
	MsgType            string `xorm:"notnull"` //消息类型
	ID                 int8   `xorm:"notnull"` //软件标识
	MID                string `xorm:"notnull"` //任务号
	BID                string `xorm:"notnull"` //数据类型
	PID                int    `xorm:"notnull"` //进程标识
	ProcessName        string `xorm:"notnull"` //协议进程名称
	MainOrBackup       int8   `xorm:"notnull"` //主备类型
	Report_type        string `xorm:"notnull"` //报告类型
	Command_type       string `xorm:"notnull"` //命令类型
	Command_result     string `xorm:"notnull"` //命令结果
	Recv_status_revert bool   `xorm:"notnull"` //接收状态反转
	Recv_status        bool   `xorm:"notnull"` //接收状态
	First              string `xorm:"notnull"` //接收的第一帧时间
	Last               string `xorm:"notnull"` //接收的最后一帧时间
	Recv_count         int64  `xorm:"notnull"` //接收帧数
	Send_no            int64  `xorm:"notnull"` //上行帧序号
}

//入库
func CreateProtocal_Process_State(process *Protocal_Process_State) (int64, error) {
	process.MsgSign = "Protocal_Process_State"
	var processDb Protocal_Process_State_Db
	processDb.MsgSign = "Protocal_Process_State"
	processDb.MsgType = process.MsgType
	processDb.ID = process.ID
	processDb.MID = process.MID
	processDb.BID = process.BID
	processDb.PID = process.PID
	processDb.ProcessName = process.ProcessName
	processDb.MainOrBackup = process.MainOrBackup
	processDb.Report_type = process.Report.Report_type
	processDb.Command_type = process.Report.Command_type
	processDb.Command_result = process.Report.Command_result
	processDb.Recv_status_revert = process.Report.Recv_status_revert
	processDb.Recv_status = process.Report.Recv_status
	processDb.First = process.Report.First
	processDb.Last = process.Report.Last
	processDb.Recv_count = process.Report.Recv_count
	processDb.Send_no = process.Report.Send_no
	e := gofrontdb.EngineGroup()
	return e.Insert(processDb)
}

//查询一条
func GetOneProctocalProcessState(process *Protocal_Process_State_Db) (bool, error) {
	e := gofrontdb.EngineGroup()
	return e.Get(process)
}

//查询所有
func GetAllProctocalProcessDbState() ([]map[string]string, error) {
	return gofrontdb.EngineGroup().QueryString("select * from Protocal_Process_State_Db")
}

// 条件查询
func GetProctocalProcessDbStateCondition(mid string, ProcessName string) ([]map[string]string, error) {
	sqlText := "select * from Protocal_Process_State_Db where MID = '%s' and ProcessName = '%s' "
	sqlText = fmt.Sprintf(sqlText, mid, ProcessName)
	return gofrontdb.EngineGroup().QueryString(sqlText)
}

func (this *Protocal_Process_State) GetJsonString() string {
	data, err := json.Marshal(this)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}
func (this *Protocal_Process_State_Db) GetDbJsonString() string {
	data, err := json.Marshal(this)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}
