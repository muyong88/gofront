package routes

import (
	"encoding/json"
	"fmt"

	"github.com/kataras/golog"
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/controller"
	"github.com/yanzhen74/gofront/src/model"
)

//NonRealHub 非实时前端主控与网站间接口
func NonRealHub(party iris.Party) {
	home := party.Party("/non_real")
	home.Get("/query", func(ctx iris.Context) {
		ctx.View("nonreal_query.html")
	})
	home.Get("/commandpage", func(ctx iris.Context) {
		ctx.View("nonreal_command.html")
	})
	home.Get("/filestate", FileStateGet)
	home.Post("/send_command", NonRealSendCommand)
	home.Post("/query_db", NonRealQueryDb)
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
	var nonrealCommand model.NonRealFileCommand
	if err := ctx.ReadJSON(&nonrealCommand); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	network, err := controller.NetConfig.GetNetWorkByNetWorkSeqNum("4")
	if err == nil {
		controller.SendDataToTopic(network.NetWorkTopic, nonrealCommand.GetJSONCommand())
	}
}

//NonRealQueryDb 查询Db
func NonRealQueryDb(ctx iris.Context) {
	var state model.NonRealFileState
	ctx.ReadJSON(&state)
	// results, _ := model.GetAllNonRealProcessState()
	results, _ := model.GetNonRealProcessStateCondition(state.MsgType, state.MissionID, state.StartTime, state.EndTime)
	bjson, _ := json.Marshal(results)
	ctx.JSON(string(bjson))
}
