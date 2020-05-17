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
		getPage(ctx, "protocal _query.html")
	})
	home.Get("/commandpage", func(ctx iris.Context) {
		getPage(ctx, "protocal_command.html")
	})
	home.Get("/batch_commandpage", func(ctx iris.Context) {
		getPage(ctx, "protocal_command_batch.html")
	})
	home.Get("/monitor", func(ctx iris.Context) {
		getPage(ctx, "protocal_monitor.html")
	})
	home.Get("/fixed_monitor", func(ctx iris.Context) {
		getPage(ctx, "protocal_monitor_fixed.html")
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
	processState.UpDateTime = time.Now().Format("2006-01-02 15:04:05")
	_, err := model.CreateProtocalProcessState(&processState)
	if err != nil {
		fmt.Println(err)
	}
	//展示
	controller.SendWebsocketMsg([]byte(processState.GetJSONString()))
	controller.ProctocalUpdateTime = time.Now()
	time.Sleep(300 * time.Millisecond)
	//如果接收状态反转，则发送一份到NEW MESSAGE
	if processState.Report.RecvStatusRevert == true {
		strSumary := "(" + processState.MID + "," + processState.ProcessName + "," + strconv.Itoa(int(processState.MainOrBackup)) + ")" + " Receiving data"
		var msg model.NewMeassage
		if processState.Report.RecvStatus == true {
			msg = model.NewMeassage{MsgSign: "NewMessage", TimeStamp: time.Now().Format("2006-01-02 15:04:05"), MsgSummary: strSumary, MsgFlag: "ProctocalRevStart", SuccessFlag: "Success", MID: processState.MID, ProcessName: processState.ProcessName, MainOrBackup: processState.MainOrBackup}
		} else {
			msg = model.NewMeassage{MsgSign: "NewMessage", TimeStamp: time.Now().Format("2006-01-02 15:04:05"), MsgSummary: strSumary, MsgFlag: "ProctocalRevEnd", SuccessFlag: "Success", MID: processState.MID, ProcessName: processState.ProcessName, MainOrBackup: processState.MainOrBackup}
		}
		msgJSON, _ := json.Marshal(msg)
		controller.SendWebsocketMsg([]byte(msgJSON))
	}
}

//ProtocalProcessSendCommand 发送控制命令接口
//1.接口类型：Kafka
//2.消息方向：网站→主控
func ProtocalProcessSendCommand(ctx iris.Context) {
	var proCommands []model.ProtocalCommand
	if err := ctx.ReadJSON(&proCommands); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	for _, proCommand := range proCommands {
		proCommand.OrderSeq = model.GetNextOrderSeq()
		network, err := controller.NetConfig.GetNetWorkByNetWorkSeqNum("5")
		if err == nil {
			controller.SendDataToTopic(network.NetWorkTopic, proCommand.GetJSONCommand())
		}
		model.CreateProtocalCommandDB(&proCommand)
	}
}

//ProtocalQueryDb 查询Db
func ProtocalQueryDb(ctx iris.Context) {
	var state model.ProtocalProcessState
	ctx.ReadJSON(&state)
	// results, _ := model.GetAllProctocalProcessDbState()
	results, _ := model.GetProctocalProcessDbStateCondition(state.MainOrBackup, state.MID, state.ProcessName, state.Report.ReportType, state.StartTime, state.EndTime)
	if results != nil {
		bjson, _ := json.Marshal(results)
		ctx.JSON(string(bjson))
	} else {
		ctx.JSON("{}")
	}
}
