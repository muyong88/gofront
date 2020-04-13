package routes

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/kataras/golog"
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/controller"
	"github.com/yanzhen74/gofront/src/model"
)

//ProtocalHub 协议主控进程与网站间接口
func ProtocalHub(party iris.Party) {
	home := party.Party("/protocal")
	home.Get("/query", func(ctx iris.Context) {
		ctx.View("protocal _query.html")
	})
	home.Get("/commandpage", func(ctx iris.Context) {
		ctx.View("ProtocalCommand.html")
	})
	home.Post("/process_state", ProtocalProcessStatePost)
	home.Post("/send_command", ProtocalProcessSendCommand)
	home.Post("/query_db", ProtocalQueryDb)
}

//ProtocalProcessStatePost 协议进程状态更新接口
func ProtocalProcessStatePost(ctx iris.Context) {
	var processState model.ProtocalProcessState
	if err := ctx.ReadJSON(&processState); err != nil {
		fmt.Println(err)
		return
	}
	// fmt.Println(process_state)
	_, err := model.CreateProtocalProcessState(&processState)
	if err != nil {
		fmt.Println(err)
	}
	//Stub:展示
	controller.SendWebsocketMsg([]byte(processState.GetJSONString()))
	controller.ProctocalUpdateTime = time.Now()
	time.Sleep(300 * time.Millisecond)
	//如果接收状态反转，则发送一份到NEW MESSAGE
	if processState.Report.RecvStatusRevert == true {
		strSumary := "(" + processState.MID + "," + processState.ProcessName + "," + strconv.Itoa(int(processState.MainOrBackup)) + ")" + " Receiving data"
		var msg model.NewMeassage
		if processState.Report.RecvStatus == true {
			msg = model.NewMeassage{MsgSign: "NewMessage", TimeStamp: time.Now().Format("2006-01-02 15:04:05"), MsgSummary: strSumary, MsgFlag: "ProctocalRevStart", SuccessFlag: "Success"}
		} else {
			msg = model.NewMeassage{MsgSign: "NewMessage", TimeStamp: time.Now().Format("2006-01-02 15:04:05"), MsgSummary: strSumary, MsgFlag: "ProctocalRevEnd", SuccessFlag: "Success"}
		}
		msgJSON, _ := json.Marshal(msg)
		controller.SendWebsocketMsg([]byte(msgJSON))
	}
}

//ProtocalProcessSendCommand 发送控制命令接口
//1.接口类型：Kafka
//2.消息方向：网站→主控
func ProtocalProcessSendCommand(ctx iris.Context) {
	var proCommand model.ProtocalCommand
	if err := ctx.ReadJSON(&proCommand); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	network, err := controller.NetConfig.GetNetWorkByNetWorkSeqNum("5")
	if err == nil {
		controller.SendDataToTopic(network.NetWorkTopic, proCommand.GetJSONCommand())
	}
}

//ProtocalQueryDb 查询Db
func ProtocalQueryDb(ctx iris.Context) {
	var state model.ProtocalProcessState
	ctx.ReadJSON(&state)
	// results, _ := model.GetAllProctocalProcessDbState()
	results, _ := model.GetProctocalProcessDbStateCondition(state.MID, state.ProcessName)
	bjson, _ := json.Marshal(results)
	ctx.JSON(string(bjson))
}
