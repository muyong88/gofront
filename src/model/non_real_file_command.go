package model

import (
	"encoding/json"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/gofrontdb"
)

//NonRealFileCommand NonRealFileCommand
type NonRealFileCommand struct {
	MsgTag    string      `json:"msgTag"`
	MissionID string      `json:"missionID"`
	MsgType   string      `json:"msgType"`
	Subtype   string      `json:"subtype"`
	MSGID     string      `json:"MSGID"`
	Sender    string      `json:"sender"`
	Timestamp string      `json:"timestamp"`
	Content   ContentFile `json:"content"`
}

//ContentFile ContentFile
type ContentFile struct {
	SendSessionID string `json:"sendSessionID"`
	Filename      string `json:"filename"`
	FilePath      string `json:"filePath"`
	Destination   string `json:"destination"`
}

//NonRealFileCommandDB NonRealFileCommandDB
type NonRealFileCommandDB struct {
	// Identify      int64 `xorm:"pk autoincr  notnull"` //自增id
	MsgTag        string
	MissionID     string
	MsgType       string
	Subtype       string
	MSGID         string
	Sender        string
	Timestamp     string
	SendSessionID string
	Filename      string
	FilePath      string
	Destination   string
}

//GetJSONCommand 获取json格式Command
func (non *NonRealFileCommand) GetJSONCommand() string {
	data, err := json.Marshal(non)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}

//InitByJSON 通过json初始化结构体
func (non *NonRealFileCommand) InitByJSON(data []byte) error {
	return json.Unmarshal(data, non)
}

//CreateNonRealFileCommandDB 入库
func CreateNonRealFileCommandDB(command *NonRealFileCommand) (int64, error) {
	var commandDB NonRealFileCommandDB
	commandDB.MsgTag = command.MsgTag
	commandDB.MissionID = command.MissionID
	commandDB.MsgType = command.MsgType
	commandDB.Subtype = command.Subtype
	commandDB.MSGID = command.MSGID
	commandDB.Sender = command.Sender
	commandDB.Timestamp = command.Timestamp
	commandDB.SendSessionID = command.Content.SendSessionID
	commandDB.Filename = command.Content.Filename
	commandDB.FilePath = command.Content.FilePath
	commandDB.Destination = command.Content.Destination
	e := gofrontdb.EngineGroup()
	return e.Insert(&commandDB)
}
