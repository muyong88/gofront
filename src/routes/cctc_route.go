package routes

import (
	"github.com/kataras/iris"
)

func CCTC_Hub(party iris.Party) {
	home := party.Party("/cctc")
	home.Get("/downlink", DownLink_Get)
	home.Post("/process_state", Process_state_Post)
}
func DownLink_Get(ctx iris.Context) {
	downlinkBeginTime := ctx.URLParam("downlinkBeginTime")
	downlinkEndTime := ctx.URLParam("downlinkBeginTime")
	pageSize := ctx.URLParam("pageSize")
	pageNo := ctx.URLParam("pageNo")
	ctx.WriteString(downlinkBeginTime + " " + downlinkEndTime + " " + pageSize + " " + pageNo)
	//stub（等待接口）: 根据参数查询响应下行计划信息，返回JSON
}
func Process_state_Post(ctx iris.Context) {

}
