package main

import (
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/controller"
	"github.com/yanzhen74/gofront/src/gofrontdb"
	"github.com/yanzhen74/gofront/src/inits/parse"
	"github.com/yanzhen74/gofront/src/model"
	"github.com/yanzhen74/gofront/src/routes"
)

func main() {
	app := iris.New()

	parse.AppConfigParse() //应用配置

	parse.DBSettingParse() //DB配置

	routes.Hub(app) //路由配置

	app.HandleDir("/public", "./public")
	app.HandleDir("/config", "./config")
	app.HandleDir("/data", "./data")

	tmpl := iris.HTML("./views", ".html") // 模板引擎采用html/template
	tmpl.Reload(true)                     // 在每个请求上 重新加载模板（开发模式）
	app.RegisterView(tmpl)

	gofrontdb.MasterEngine().Sync2(new(model.CCTC_Process_State))     //库结构同步
	gofrontdb.SlaveEngine().Sync2(new(model.CCTC_Process_State))      //库结构同步
	gofrontdb.MasterEngine().Sync2(new(model.Protocal_Process_State)) //库结构同步
	gofrontdb.SlaveEngine().Sync2(new(model.Protocal_Process_State))  //库结构同步
	gofrontdb.MasterEngine().Sync2(new(model.Non_Real_File_state))    // 库结构同步
	gofrontdb.SlaveEngine().Sync2(new(model.Non_Real_File_state))     // 库结构同步

	model.MsgChan = make(chan model.Message)
	controller.Init_network("config/conf/NetWork.xml") // init net
	controller.Run_network()                           // Receive network data
	go controller.RunProcessor()

	app.Run(iris.Addr(":"+parse.AppConfig.Port), iris.WithConfiguration(iris.YAML("config/iris.yaml")))
}
