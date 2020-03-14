package routes

import (
	"fmt"

	"github.com/kataras/golog"
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/model"
)

//非实时前端主控与网站间接口
func Non_Real_Hub(party iris.Party) {
	home := party.Party("/non_real")
	home.Get("/filestate", File_state_Get)
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
