package model

import ()

type Non_Real_File_Command struct {
	MsgTag    string
	MissionID string
	MsgType   string
	Subtype   string
	MSGID     string
	Sender    string
	Timestamp string
	Content   Content_File
}
type Content_File struct {
	SendSessionID string
	Filename      string
	FilePath      string
	Destination   string
}
