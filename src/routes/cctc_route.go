package routes

import (
	"fmt"

	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/model"
)

//CTCC前端主控进程与网站间接口
func CCTC_Hub(party iris.Party) {
	home := party.Party("/cctc")
	home.Get("/downlink", CCTC_DownLink_Get)
	home.Post("/process_state", CCTC_Process_state_Post)
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
		return
	}
	//入库
	model.CreateCCTCProcessState(&process_state)
	//stub：展示
}
