package routes

import (
	"encoding/json"
	"fmt"

	"github.com/kataras/golog"
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/controller"
	"github.com/yanzhen74/gofront/src/model"
)

//协议主控进程与网站间接口
func Protocal_Hub(party iris.Party) {
	home := party.Party("/protocal")
	home.Get("/query", func(ctx iris.Context) {
		ctx.View("protocal _query.html")
	})
	home.Get("/commandpage", func(ctx iris.Context) {
		ctx.View("protocal_command.html")
	})
	home.Post("/process_state", Protocal_Process_state_Post)
	home.Post("/send_command", Protocal_Process_Send_Command)
	home.Post("/query_db", Protocal_Query_Db)
}

//协议进程状态更新接口
func Protocal_Process_state_Post(ctx iris.Context) {
	var process_state model.Protocal_Process_State
	if err := ctx.ReadJSON(&process_state); err != nil {
		fmt.Println(err)
		return
	}
	// fmt.Println(process_state)
	_, err := model.CreateProtocal_Process_State(&process_state)
	if err != nil {
		fmt.Println(err)
	}
	//Stub:展示
	controller.SendWebsocketMsg([]byte(process_state.GetJsonString()))
}

//发送控制命令接口
//1.接口类型：Kafka
//2.消息方向：网站→主控
func Protocal_Process_Send_Command(ctx iris.Context) {
	var propro_command model.Protocal_Command
	if err := ctx.ReadJSON(&propro_command); err != nil {
		fmt.Println(err)
		golog.Error(err)
		return
	}
	network, err := controller.NetConfig.GetNetWorkByNetWorkSeqNum("5")
	if err == nil {
		controller.SendDataToTopic(network.NetWorkTopic, propro_command.GetJsonCommand())
	}
}

//查询Db
func Protocal_Query_Db(ctx iris.Context) {
	results, _ := model.GetAllProctocalProcessDbState()
	bjson, _ := json.Marshal(results)
	ctx.JSON(string(bjson))
}
