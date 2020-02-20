package routes

import (
	"fmt"

	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/model"
)

//协议主控进程与网站间接口
func Protocal_Hub(party iris.Party) {
	home := party.Party("/protocal")
	home.Post("/process_state", Protocal_Process_state_Post)
}

//协议进程状态更新接口
func Protocal_Process_state_Post(ctx iris.Context) {
	var process_state model.Protocal_Process_State
	if err := ctx.ReadJSON(&process_state); err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(process_state)
	_, err := model.CreateProtocal_Process_State(&process_state)
	if err != nil {
		fmt.Println(err)
	}
	//Stub:展示

}
