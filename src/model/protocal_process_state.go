package model

import "github.com/yanzhen74/gofront/src/gofrontdb"

type Protocal_Process_State struct {
	Identify     int64           `xorm:"pk autoincr  notnull"` //自增id
	MsgType      string          `xorm:"notnull"`              //消息类型
	ID           int8            `xorm:"notnull"`              //软件标识
	MID          string          `xorm:"notnull"`              //任务号
	BID          string          `xorm:"notnull"`              //数据类型
	PID          int             `xorm:"notnull"`              //进程标识
	ProcessName  string          `xorm:"notnull"`              //协议进程名称
	MainOrBackup int8            `xorm:"notnull"`              //协议进程名称
	Report       Protocal_Report `xorm:"notnull json"`         //报告内容
}

type Protocal_Report struct {
	Identify           int64  `xorm:"pk autoincr  notnull"` //自增id
	Report_type        string `xorm:"notnull"`              //报告类型
	Command_type       string `xorm:"notnull"`              //命令类型
	Command_result     string `xorm:"notnull"`              //命令结果
	Recv_status_revert bool   `xorm:"notnull"`              //接收状态反转
	Recv_status        bool   `xorm:"notnull"`              //接收状态
	First              string `xorm:"notnull"`              //接收的第一帧时间
	Last               string `xorm:"notnull"`              //接收的最后一帧时间
	Recv_count         int64  `xorm:"notnull"`              //接收帧数
	Send_no            int64  `xorm:"notnull"`              //上行帧序号
}

//入库
func CreateProtocal_Process_State(process ...*Protocal_Process_State) (int64, error) {
	e := gofrontdb.EngineGroup()
	return e.Insert(process)
	//stub:展示
}
