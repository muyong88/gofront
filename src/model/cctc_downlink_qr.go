package model

import ()

type CCTC_Downlink_Querry struct {
	DownlinkBeginTime string
	DownlinkEndTime   string
	PageNo            string
	PageSize          string
}

type CCTC_Downlink_Response struct {
	TotalNum    int
	CurrentPage int
	SearchTime  string
	pageSize    int
	Message     string
	ResultList  ResultList
}

type ResultList struct {
	PlanID          string
	StationID       string
	MID             string
	StartTime       string
	EndTime         string
	Circle          int
	DownloadContent string
	CreateTime      string
	TransProtocal   string
	Note            string
}
