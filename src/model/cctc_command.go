package model

import ()

type CCTC_Command struct {
	MsgType        string
	Operation      string
	SysId          string
	Pattern        int
	Channel        int
	BeginTime      string
	EndTime        string
	MainHostName   string
	BackupHostName string
}
