package model

import (
	"encoding/json"
	"github.com/kataras/golog"
)

type Non_Real_File_Command struct {
	MsgTag    string `json:"msgTag"`
	MissionID string `json:"missionID"`
	MsgType   string `json:"msgType"`
	Subtype   string `json:"subtype"`
	MSGID     string `json:"MSGID"`
	Sender    string `json:"sender"`
	Timestamp string `json:"timestamp"`
	Content   Content_File
}
type Content_File struct {
	SendSessionID string `json:"sendSessionID"`
	Filename      string `json:"filename"`
	FilePath      string `json:"filePath"`
	Destination   string `json:"destination"`
}

func (this *Non_Real_File_Command) GetJsonCommand() string {
	data, err := json.Marshal(this)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}
func (this *Non_Real_File_Command) InitByJson(data []byte) error {
	return json.Unmarshal(data, this)
}
