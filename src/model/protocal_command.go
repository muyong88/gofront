package model

import (
	"encoding/json"
	"time"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/gofrontdb"
)

//ProtocalCommand 协议命令结构体
type ProtocalCommand struct {
	MsgType     string   `json:"msgType"`
	ID          int      `json:"ID"`
	MID         string   `json:"MID"`
	BID         string   `json:"BID"`
	ProcessName string   `json:"ProcessName"`
	OrderSeq    int64    `json:"OrderSeq"`
	OrderName   string   `json:"OrderName"`
	ParaInfo    ParaInfo `json:"ParaInfo"`
	Protocal    string   `json:"Protocal"`
}

//ParaInfo ParaInfo
type ParaInfo struct {
	MODE string `json:"MODE"`
}

//ProtocalCommandDB ProtocalCommandDB
type ProtocalCommandDB struct {
	// Identify    int64 `xorm:"pk autoincr  notnull"` //自增id
	MsgType     string
	ID          int
	MID         string
	BID         string
	ProcessName string
	OrderSeq    int64
	OrderName   string
	MODE        string
	Protocal    string
	SendTime    string //入库时间
}

//GetJSONCommand get json
func (pro *ProtocalCommand) GetJSONCommand() string {
	data, err := json.Marshal(pro)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}

//InitByJSON init
func (pro *ProtocalCommand) InitByJSON(data []byte) error {
	return json.Unmarshal(data, pro)
}

//CreateProtocalCommandDB CreateProtocalCommandDB
func CreateProtocalCommandDB(command *ProtocalCommand) (int64, error) {
	var commandDB ProtocalCommandDB
	commandDB.MsgType = command.MsgType
	commandDB.ID = command.ID
	commandDB.MID = command.MID
	commandDB.BID = command.BID
	commandDB.ProcessName = command.ProcessName
	commandDB.OrderSeq = command.OrderSeq
	commandDB.OrderName = command.OrderName
	commandDB.MODE = command.ParaInfo.MODE
	commandDB.Protocal = command.Protocal
	commandDB.SendTime = time.Now().Format("2006-01-02 15:04:05")
	e := gofrontdb.EngineGroup()
	return e.Insert(&commandDB)
}

//GetNextOrderSeq 获取下一个OrderSe
func GetNextOrderSeq() int64 {
	var commandDB ProtocalCommandDB
	gofrontdb.EngineGroup().Where(" OrderSeq = (select max(OrderSeq) from ProtocalCommandDB) ").Get(&commandDB)
	return (commandDB.OrderSeq + 1)
}
