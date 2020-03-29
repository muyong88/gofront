package routes

import (
	"encoding/json"
	"fmt"

	"github.com/kataras/golog"
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/controller"
	"github.com/yanzhen74/gofront/src/model"
)

//CTCC前端主控进程与网站间接口
func CCTC_Hub(party iris.Party) {
	home := party.Party("/cctc")
	home.Get("/query", func(ctx iris.Context) {
		ctx.View("cctc_query.html")
	})
	home.Get("/downlink", CCTC_DownLink_Get)
	home.Post("/query_db", CCTC_Query_Db)
	home.Post("/process_state", CCTC_Process_state_Post)
	home.Post("/send_command", CCTC_Send_Command)
}

//下行计划查询接口
//根据路径中参数，获取下行计划
func CCTC_DownLink_Get(ctx iris.Context) {
	downlinkBeginTime := ctx.URLParam("downlinkBeginTime")
	downlinkEndTime := ctx.URLParam("downlinkBeginTime")
	pageSize := ctx.URLParam("pageSize")
	pageNo := ctx.URLParam("pageNo")
	ctx.WriteString(downlinkBeginTime + " " + downlinkEndTime + " " + pageSize + " " + pageNo)
	//stub（等待接口）: 根据参数查询响应下行计划信息，返回JSON
}

//前端进程状态更新接口
//获取JSON内容，存库，显示
func CCTC_Process_state_Post(ctx iris.Context) {
	var process_state model.CCTC_Process_State
	if err := ctx.ReadJSON(&process_state); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	//入库
	model.CreateCCTCProcessState(&process_state)
	//stub：展示
	controller.SendWebsocketMsg([]byte(process_state.GetJsonString()))
}

//发送控制命令接口
//接口类型：Kafka
//消息方向：网站→主控
func CCTC_Send_Command(ctx iris.Context) {
	var cctc_command model.CCTC_Command
	if err := ctx.ReadJSON(&cctc_command); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	network, err := controller.NetConfig.GetNetWorkByNetWorkSeqNum("3")
	if err == nil {
		controller.SendDataToTopic(network.NetWorkTopic, cctc_command.GetJsonCommand())
	}
}

func CCTC_Query_Db(ctx iris.Context) {
	results, _ := model.GetAllCCTCProcessState()
	bjson, _ := json.Marshal(results)
	ctx.JSON(string(bjson))
}
