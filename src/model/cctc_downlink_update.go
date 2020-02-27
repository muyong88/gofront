package model

import ()

type CCTC_Downlink_Update struct {
	MsgTag    string
	MissionID string
	MsgType   string
	Subtype   string
	MSGID     string
	Sender    string
	Content   Content_Downlink
}
type Content_Downlink struct {
	PlanID    string
	BeginTime string
	EndTime   string
}
