package model

//CTCCDownlinkQuerry 查询下行计划结构体
type CTCCDownlinkQuerry struct {
	DownlinkBeginTime string
	DownlinkEndTime   string
	PageNo            string
	PageSize          string
}

//CTCCDownlinkResponse 下行计划响应
type CTCCDownlinkResponse struct {
	TotalNum    int
	CurrentPage int
	SearchTime  string
	pageSize    int
	Message     string
	ResultList  ResultList
}

//ResultList 结构列表
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
