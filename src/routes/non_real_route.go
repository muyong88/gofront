package routes

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/kataras/golog"
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/controller"
	"github.com/yanzhen74/gofront/src/model"
)

//NonRealHub 非实时前端主控与网站间接口
func NonRealHub(party iris.Party) {
	home := party.Party("/non_real")
	home.Get("/query", func(ctx iris.Context) {
		getPage(ctx, "nonreal_query.html")

	})
	home.Get("/commandpage", func(ctx iris.Context) {
		getPage(ctx, "nonreal_command.html")
	})
	home.Get("/batch_commandpage", func(ctx iris.Context) {
		getPage(ctx, "nonreal_command_batch.html")
	})
	home.Get("/monitor", func(ctx iris.Context) {
		getPage(ctx, "nonreal_monitor.html")
	})
	home.Get("/filestate", FileStateGet)
	home.Post("/send_command", NonRealSendCommand)
	home.Post("/query_db", NonRealQueryDb)
	home.Post("/query_db_init", NonRealQueryDbInit)
}

//FileStateGet 查询发送文件状态接口
func FileStateGet(ctx iris.Context) {
	fmt.Println("testing-------------------")
	state := &model.NonRealFileState{FileName: ctx.URLParam("fileName"), SendSessionID: ctx.URLParam("sendSessionID"), FilePath: ctx.URLParam("filePath")}
	has, err := model.GetNonRealFileState(state)
	if has == true {
		ctx.JSON("{\"state\":" + state.Status)
	} else {
		golog.Error(err)
	}
}

//NonRealSendCommand 发送文件命令接口
//1.接口类型：Kafka
//消息方向：网站→主控
func NonRealSendCommand(ctx iris.Context) {
	var nonrealCommands []model.NonRealFileCommand
	if err := ctx.ReadJSON(&nonrealCommands); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	for _, nonrealCommand := range nonrealCommands {
		network, err := controller.NetConfig.GetNetWorkByNetWorkSeqNum("4")
		if err == nil {
			controller.SendDataToTopic(network.NetWorkTopic, nonrealCommand.GetJSONCommand())
		}
		//入库
		model.CreateNonRealFileCommandDB(&nonrealCommand)
	}
}

//NonRealQueryDb 查询Db
func NonRealQueryDb(ctx iris.Context) {
	var state model.NonRealFileState
	ctx.ReadJSON(&state)
	// results, _ := model.GetAllNonRealProcessState()
	results, count := model.GetNonRealProcessStateCondition(state.Type, state.Station, state.StartTime, state.EndTime, state.Limit, state.Start)
	if results != nil {
		bjson, _ := json.Marshal(results)
		ctx.JSON(`{"count":` + strconv.Itoa(count) + ` ,"data":` + string(bjson) + "}")
	} else {
		ctx.JSON(`{"count":0 ,"data": {}}`)
	}
}

//NonRealQueryDbInit 查询Db
func NonRealQueryDbInit(ctx iris.Context) {
	session := sess.Start(ctx)
	var state model.NonRealFileState
	ctx.ReadJSON(&state)
	// results, _ := model.GetAllNonRealProcessState()
	results, count := model.GetNonRealProcessAfterUpdateTime(session.GetString("loginTime"), state.Limit, state.Start)
	if results != nil {
		bjson, _ := json.Marshal(results)
		ctx.JSON(`{"count":` + strconv.Itoa(count) + ` ,"data":` + string(bjson) + "}")
	} else {
		ctx.JSON(`{"count":0 ,"data": {}}`)
	}
}
