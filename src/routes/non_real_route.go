package routes

import (
	"github.com/kataras/iris"
)

//非实时前端主控与网站间接口
func Non_Real_Hub(party iris.Party) {
	home := party.Party("/non_real")
	home.Get("/file_state", File_state_Get)
}

//查询发送文件状态接口
func File_state_Get(ctx iris.Context) {
	// sendSessionID := ctx.URLParam("sendSessionID")
	// fileName := ctx.URLParam("fileName")
	// filePath := ctx.URLParam("filePath")
}
