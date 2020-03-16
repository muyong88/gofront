package routes

import (
	"fmt"

	"github.com/kataras/golog"
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/controller"
	"github.com/yanzhen74/gofront/src/model"
)

//非实时前端主控与网站间接口
func Non_Real_Hub(party iris.Party) {
	home := party.Party("/non_real")
	home.Get("/filestate", File_state_Get)
	home.Post("/send_command", Non_Real_Send_Command)
}

//查询发送文件状态接口
func File_state_Get(ctx iris.Context) {
	fmt.Println("testing-------------------")
	state := &model.Non_Real_File_State{FileName: ctx.URLParam("fileName"), SendSessionID: ctx.URLParam("sendSessionID"), FilePath: ctx.URLParam("filePath")}
	has, err := model.GetNon_Real_File_State(state)
	if has == true {
		ctx.JSON("{\"state\":" + state.Status)
	} else {
		golog.Error(err)
	}
}

//发送文件命令接口
//1.接口类型：Kafka
//消息方向：网站→主控
func Non_Real_Send_Command(ctx iris.Context) {
	var nonreal_command model.Non_Real_File_Command
	if err := ctx.ReadJSON(&nonreal_command); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	network,err := controller.NetConfig.GetNetWorkByNetWorkSeqNum("4")
	if err == nil {
		controller.SendDataToTopic(network.NetWorkTopic, nonreal_command.GetJsonCommand())
	}
}
