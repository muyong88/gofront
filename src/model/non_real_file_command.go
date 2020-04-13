package model

import (
	"encoding/json"

	"github.com/kataras/golog"
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
