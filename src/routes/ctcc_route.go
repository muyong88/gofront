package routes

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/kataras/golog"
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/controller"
	"github.com/yanzhen74/gofront/src/model"
)

//CTCCHub CTCC前端主控进程与网站间接口
func CTCCHub(party iris.Party) {
	home := party.Party("/ctcc")
	home.Get("/query", func(ctx iris.Context) {
		ctx.View("ctcc_query.html")
	})
	home.Get("/commandpage", func(ctx iris.Context) {
		ctx.View("ctcc_command.html")
	})
	home.Get("/downlink", CTCCDownLinkGet)
	home.Post("/query_db", CTCCQueryDb)
	home.Post("/process_state", CTCCProcessstatePost)
	home.Post("/send_command", CTCCSendCommand)
}

//CTCCDownLinkGet 下行计划查询接口
//根据路径中参数，获取下行计划
func CTCCDownLinkGet(ctx iris.Context) {
	downlinkBeginTime := ctx.URLParam("downlinkBeginTime")
	downlinkEndTime := ctx.URLParam("downlinkBeginTime")
	pageSize := ctx.URLParam("pageSize")
	pageNo := ctx.URLParam("pageNo")
	ctx.WriteString(downlinkBeginTime + " " + downlinkEndTime + " " + pageSize + " " + pageNo)
	//stub（等待接口）: 根据参数查询响应下行计划信息，返回JSON
}

//CTCCProcessstatePost 前端进程状态更新接口
//获取JSON内容，存库，显示
func CTCCProcessstatePost(ctx iris.Context) {
	var processState model.CTCCProcessState
	if err := ctx.ReadJSON(&processState); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	//入库
	model.CreateCTCCProcessState(&processState)
	//stub：展示
	controller.SendWebsocketMsg([]byte(processState.GetJSONString()))
	controller.CTCCUpdateTime = time.Now()
}

//CTCCSendCommand 发送控制命令接口
//接口类型：Kafka
//消息方向：网站→主控
func CTCCSendCommand(ctx iris.Context) {
	var ctccCommand model.CTCCCommand
	if err := ctx.ReadJSON(&ctccCommand); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	network, err := controller.NetConfig.GetNetWorkByNetWorkSeqNum("3")
	if err == nil {
		controller.SendDataToTopic(network.NetWorkTopic, ctccCommand.GetJSONCommand())
	}
	ctx.Text("send success!")
}

//CTCCQueryDb 查询CCTC数据库
func CTCCQueryDb(ctx iris.Context) {
	var state model.CTCCProcessState
	ctx.ReadJSON(&state)
	// results, _ := model.GetAllCTCCProcessState()
	results, _ := model.GetCTCCProcessStateConditions(state.MsgType, state.SysID)
	bjson, _ := json.Marshal(results)
	ctx.JSON(string(bjson))
}
