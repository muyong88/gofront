package model

import (
	"encoding/json"

	"github.com/kataras/golog"
	"github.com/yanzhen74/gofront/src/gofrontdb"
)

type CCTC_Process_State struct {
	Identify             int64   `xorm:"pk autoincr  notnull"` //自增id
	MsgSign              string  `xorm:"notnull"`
	MsgType              string  `xorm:"notnull" json:"msgType"`              //消息类型
	ProcessId            int8    `xorm:"notnull" json:"processId"`            //进程标识
	SysId                int8    `xorm:"notnull" json:"sysId"`                //软件标识
	Pattern              int8    `xorm:"notnull" json:"pattern"`              //软件模式
	Channel              int8    `xorm:"notnull" json:"channel"`              //下行通道
	IsSend32KB           int8    `xorm:"notnull" json:"isSend32KB"`           //是否转发32KB数据
	IsSendIPinIP         int8    `xorm:"notnull" json:"isSendIPinIP"`         //是否转发IPinIP数据
	IsSaveFile           int8    `xorm:"notnull" json:"isSaveFile"`           //是否数据存储
	IsArchive            int8    `xorm:"notnull" json:"isArchive"`            //是否数据归档
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
	SaveReadShmSpeed     float64 `xorm:"notnull" json:"SaveReadShmSpeed"`     //存储共享内存读取数据速度
	RecvBeats            int8    `xorm:"notnull" json:"recvBeats"`            //接收数据线程心跳
	ResendBeats          int8    `xorm:"notnull" json:"resendBeats"`          //转发数据线程心跳
	SaveBeats            int8    `xorm:"notnull" json:"saveBeats"`            //存储数据线程心跳
	RecvBytes            string  `xorm:"notnull" json:"recvBytes"`            //接收字节数
	Send32KFrames        string  `xorm:"notnull" json:"send32KFrames"`        //转发32KB数据帧计数
	SendIPinIPFrames     string  `xorm:"notnull" json:"sendIPinIPFrames"`     //转发IPinIP数据帧计数
	SendSmallCraftFrames string  `xorm:"notnull" json:"sendSmallCraftFrames"` //转发小飞行器数据帧计数
	TimeStamp            string  `xorm:"notnull" json:"timeStamp"`            //时间戳
}

//入库
func CreateCCTCProcessState(process *CCTC_Process_State) (int64, error) {
	e := gofrontdb.EngineGroup()
	process.MsgSign = "CCTC_Process_State"
	return e.Insert(process)
	//stub:展示
}

//查询一个
func GetOneCCTCProcessState(process *CCTC_Process_State) (bool, error) {
	e := gofrontdb.EngineGroup()
	return e.Get(process)
}

//查询所有
func GetAllCCTCProcessState() ([]map[string]string, error) {
	return gofrontdb.EngineGroup().QueryString("select * from CCTC_Process_State")
}

func (this *CCTC_Process_State) GetJsonString() string {
	data, err := json.Marshal(this)
	if err != nil {
		golog.Errorf("Json marshaling failed：%s", err)
	}
	return string(data)
}

// //字符数组转换成CCTC_Process_State结构体
// func GetUserFromJson(data []byte) (*CCTC_Process_State, error) {
// 	var CCTC_Process_State CCTC_Process_State
// 	err := json.Unmarshal(data, &CCTC_Process_State)
// 	return &CCTC_Process_State, err
// }
