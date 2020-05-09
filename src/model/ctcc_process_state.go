package model

import (
	"encoding/json"
	"fmt"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/gofrontdb"
	"github.com/yanzhen74/gofront/src/inits/parse"
)

//CTCCProcessState CTCC进程状态结构体
type CTCCProcessState struct {
	Identify             int64   `xorm:"pk autoincr  notnull"` //自增id
	MsgSign              string  `xorm:"notnull"`
	MsgType              string  `xorm:"notnull" json:"msgType"`              //消息类型
	ProcessID            int     `xorm:"notnull" json:"processId"`            //进程标识
	SysID                int     `xorm:"notnull" json:"sysId"`                //软件标识
	Pattern              int     `xorm:"notnull" json:"pattern"`              //软件模式
	Channel              int     `xorm:"notnull" json:"channel"`              //下行通道
	IsSend32KB           int     `xorm:"notnull" json:"isSend32KB"`           //是否转发32KB数据
	IsSendIPinIP         int     `xorm:"notnull" json:"isSendIPinIP"`         //是否转发IPinIP数据
	IsSaveFile           int     `xorm:"notnull" json:"isSaveFile"`           //是否数据存储
	IsArchive            int     `xorm:"notnull" json:"isArchive"`            //是否数据归档
	ResendShmHead        string  `xorm:"notnull" json:"resendShmHead"`        //转发共享内存头指针位置
	ResendShmTear        string  `xorm:"notnull" json:"resendShmTear"`        //转发共享内存尾指针位置
	ResendWriteShmLoop   string  `xorm:"notnull" json:"resendWriteShmLoop"`   //转发共享内存写入循环次数
	ResendReadShmLoop    string  `xorm:"notnull" json:"resendReadShmLoop"`    //转发共享内存读出循环次数
	ResendWriteShmSpeed  float64 `xorm:"notnull" json:"resendWriteShmSpeed"`  //转发共享内存写入数据速度
	ResendReadShmSpeed   float64 `xorm:"notnull" json:"resendReadShmSpeed"`   //转发共享内存读取数据速度
	SaveShmHead          string  `xorm:"notnull" json:"saveShmHead"`          //存储共享内存头指针位置
	SaveShmTear          string  `xorm:"notnull" json:"saveShmTear"`          //存储共享内存尾指针位置
	SaveWriteShmLoop     string  `xorm:"notnull" json:"saveWriteShmLoop"`     //存储共享内存写入循环次数
	SaveReadShmLoop      string  `xorm:"notnull" json:"saveReadShmLoop"`      //存储共享内存读出循环次数
	SaveWriteShmSpeed    float64 `xorm:"notnull" json:"saveWriteShmSpeed"`    //存储共享内存写入数据速度
	SaveReadShmSpeed     float64 `xorm:"notnull" json:"saveReadShmSpeed"`     //存储共享内存读取数据速度
	RecvBeats            int     `xorm:"notnull" json:"recvBeats"`            //接收数据线程心跳
	ResendBeats          int     `xorm:"notnull" json:"resendBeats"`          //转发数据线程心跳
	SaveBeats            int     `xorm:"notnull" json:"saveBeats"`            //存储数据线程心跳
	RecvBytes            string  `xorm:"notnull" json:"recvBytes"`            //接收字节数
	Send32KFrames        string  `xorm:"notnull" json:"send32KFrames"`        //转发32KB数据帧计数
	SendIPinIPFrames     string  `xorm:"notnull" json:"sendIPinIPFrames"`     //转发IPinIP数据帧计数
	SendSmallCraftFrames string  `xorm:"notnull" json:"sendSmallCraftFrames"` //转发小飞行器数据帧计数
	TimeStamp            string  `xorm:"notnull" json:"timeStamp"`            //时间戳
	StartTime            string  `json:"startTime"`
	EndTime              string  `json:"endTime"`
	UpDateTime           string  `json:"updateTime"` //入库时间
}

//CreateCTCCProcessState 入库
func CreateCTCCProcessState(process *CTCCProcessState) (int64, error) {
	e := gofrontdb.EngineGroup()
	process.MsgSign = "CTCCProcessState"
	return e.Insert(process)
}

//GetOneCTCCProcessState 查询一个
func GetOneCTCCProcessState(process *CTCCProcessState) (bool, error) {
	e := gofrontdb.EngineGroup()
	return e.Get(process)
}

//GetAllCTCCProcessState 查询所有
func GetAllCTCCProcessState() ([]map[string]string, error) {
	return gofrontdb.EngineGroup().QueryString("select * from CTCCProcessState")
}

// //GetCCTCProcessStateAfterUpdateTime  查询更新时间之后的数据
// func GetCCTCProcessStateAfterUpdateTime(updateTime string) ([]map[string]string, error) {
// 	sqlText := "select * from CTCCProcessState where UpDateTime >= '%s'"
// 	sqlText = fmt.Sprintf(sqlText, updateTime)
// 	return gofrontdb.EngineGroup().QueryString(sqlText)
// }

//GetCCTCProcessStateAfterUpdateTime  查询更新时间之后的数据
func GetCCTCProcessStateAfterUpdateTime(updateTime string) (state []CTCCProcessState) {
	gofrontdb.EngineGroup().Where("UpDateTime >=  ?", updateTime).Find(&state)
	return state
}

//GetCTCCProcessFixed 获取最新fixed数据
func GetCTCCProcessFixed() (states []CTCCProcessState) {
	for _, v := range parse.CCTCFIXLIST.CTCCList {
		var state CTCCProcessState
		gofrontdb.EngineGroup().Where("SysID = ? and Channel = ? and UpDateTime = (select max(UpDateTime) from CTCCProcessState  where SysID = ? and Channel = ? )", v.SysID, v.Channel, v.SysID, v.Channel).Get(&state)
		state.SysID = v.SysID
		state.Channel = v.Channel
		states = append(states, state)
	}
	return states
}

//GetCTCCProcessStateConditions 条件查询
func GetCTCCProcessStateConditions(channel int, sysID int, startTime string, endTime string) ([]map[string]string, error) {
	sqlText := "select * from CTCCProcessState where Channel >0 "
	if channel != 0 {
		sqlText = sqlText + fmt.Sprintf(" and Channel = %d ", channel)
	}
	if sysID != 0 {
		sqlText = sqlText + fmt.Sprintf(" and SysId = %d ", sysID)
	}
	if startTime != "" {
		sqlText = sqlText + fmt.Sprintf(" and timestamp >= '%s'", startTime)
	}
	if endTime != "" {
		sqlText = sqlText + fmt.Sprintf(" and timestamp <= '%s'", endTime)
	}
	sqlText = sqlText + " ORDER BY UpDateTime DESC"
	return gofrontdb.EngineGroup().QueryString(sqlText)
}

//GetJSONString 获取json字符串
func (pro *CTCCProcessState) GetJSONString() string {
	data, err := json.Marshal(pro)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}

// //字符数组转换成CTCC_Process_State结构体
// func GetUserFromJson(data []byte) (*CTCCProcessState, error) {
// 	var CTCCProcessState CTCCProcessState
// 	err := json.Unmarshal(data, &CTCCProcessState)
// 	return &CTCCProcessState, err
// }
