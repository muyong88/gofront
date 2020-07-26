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

//CTCCHub CTCC前端主控进程与网站间接口
func CTCCHub(party iris.Party) {
	home := party.Party("/ctcc")
	home.Get("/query", func(ctx iris.Context) {
		getPage(ctx, "ctcc_query.html")
	})
	home.Get("/commandpage", func(ctx iris.Context) {
		getPage(ctx, "ctcc_command.html")
	})
	home.Get("/batch_commandpage", func(ctx iris.Context) {
		getPage(ctx, "ctcc_command_batch.html")
	})
	home.Get("/monitor", func(ctx iris.Context) {
		getPage(ctx, "ctcc_monitor.html")
	})
	home.Get("/fixed_monitor", func(ctx iris.Context) {
		getPage(ctx, "ctcc_monitor_fixed.html")
	})
	home.Get("/downlink", CTCCDownLinkGet)
	home.Post("/query_db", CTCCQueryDb)
	home.Post("/query_db_init", CTCCQueryDbInit)
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
	processState.UpDateTime = time.Now().Format("2006-01-02 15:04:05")
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
	var ctccCommands []model.CTCCCommand
	if err := ctx.ReadJSON(&ctccCommands); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	for _, ctccCommand := range ctccCommands {
		network, err := controller.NetConfig.GetNetWorkByNetWorkSeqNum("3")
		if err == nil {
			controller.SendDataToTopic(network.NetWorkTopic, ctccCommand.GetJSONCommand())
		}
		ctx.Text("send success!")
		//入库
		model.CreateCTCCCommand(&ctccCommand)
	}
}

//CTCCQueryDb 查询CCTC数据库
func CTCCQueryDb(ctx iris.Context) {
	var state model.CTCCProcessState
	ctx.ReadJSON(&state)
	// results, _ := model.GetAllCTCCProcessState()
	results, count := model.GetCTCCProcessStateConditions(state.Channel, state.SysID, state.StartTime, state.EndTime, state.Limit, state.Start)
	if results != nil {
		bjson, _ := json.Marshal(results)
		ctx.JSON(`{"count":` + strconv.Itoa(count) + ` ,"data":` + string(bjson) + "}")
	} else {
		ctx.JSON(`{"count":0 ,"data": {}}`)
	}
}

//CTCCQueryDbInit 查询CCTC数据库
func CTCCQueryDbInit(ctx iris.Context) {
	session := sess.Start(ctx)
	var state model.CTCCProcessState
	ctx.ReadJSON(&state)
	// results, _ := model.GetAllCTCCProcessState()
	results, count := model.GetCCTCProcessStateAfterUpdateTime(session.GetString("loginTime"), state.Limit, state.Start)
	if results != nil {
		bjson, _ := json.Marshal(results)
		ctx.JSON(`{"count":` + strconv.Itoa(count) + ` ,"data":` + string(bjson) + "}")
	} else {
		ctx.JSON(`{"count":0 ,"data": {}}`)
	}
}

// func discardRepeatCCTC(state []model.) (protocalState []model.CTCCProcessState) {
// 	for _,value1 := range state{
// 		for _,value2 := range protocalState{
// 			if(value1.i)
// 		}
// 	}
// }

func getPage(ctx iris.Context, pageName string) {
	session := sess.Start(ctx)
	if auth, _ := session.GetBoolean("authenticated"); !auth {
		ctx.Redirect("/login")
	} else {
		role, _ := session.GetInt("role")
		username := session.GetString("username")
		if role == 1 {
			ctx.ViewData("role", true)
			ctx.ViewData("username", username)
		} else {
			ctx.ViewData("role", false)
			ctx.ViewData("username", username)
		}
		if pageName == "ctcc_monitor_fixed.html" {
			ctx.ViewData("ctcc_table_date", model.GetCTCCProcessFixed())
		}
		if pageName == "protocal_monitor_fixed.html" {
			ctx.ViewData("protocal_table_date", model.GetProctocalProcessFixed())
		}
		ctx.View(pageName)
	}
}
