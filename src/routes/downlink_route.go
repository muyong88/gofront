package routes

import (
	"github.com/kataras/iris"
)

func DownLink_Hub(party iris.Party) {
	home := party.Party("/downlink")

	home.Get("/", DownLinkGet)
}
func DownLinkGet(ctx iris.Context) {
	downlinkBeginTime := ctx.URLParam("downlinkBeginTime")
	downlinkEndTime := ctx.URLParam("downlinkBeginTime")
	pageSize := ctx.URLParam("pageSize")
	pageNo := ctx.URLParam("pageNo")
	ctx.WriteString(downlinkBeginTime + " " + downlinkEndTime + " " + pageSize + " " + pageNo)
	//stub: 根据参数查询响应下行计划信息，返回JSON
}
