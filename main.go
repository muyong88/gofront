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

	parse.ReadTableFixedConfig()

	routes.Hub(app) //路由配置

	app.HandleDir("/public", "./public")
	app.HandleDir("/config", "./config")
	app.HandleDir("/data", "./data")

	tmpl := iris.HTML("./views", ".html") // 模板引擎采用html/template
	tmpl.Reload(true)                     // 在每个请求上 重新加载模板（开发模式）
	app.RegisterView(tmpl)

	gofrontdb.MasterEngine().Sync2(new(model.CTCCProcessState))       //库结构同步
	gofrontdb.SlaveEngine().Sync2(new(model.CTCCProcessState))        //库结构同步
	gofrontdb.MasterEngine().Sync2(new(model.ProtocalProcessStateDb)) //库结构同步
	gofrontdb.SlaveEngine().Sync2(new(model.ProtocalProcessStateDb))  //库结构同步
	gofrontdb.MasterEngine().Sync2(new(model.NonRealFileState))       // 库结构同步
	gofrontdb.SlaveEngine().Sync2(new(model.NonRealFileState))        // 库结构同步
	gofrontdb.MasterEngine().Sync2(new(model.Users))                  // 库结构同步
	gofrontdb.SlaveEngine().Sync2(new(model.Users))                   // 库结构同步

	model.MsgChan = make(chan model.Message)
	controller.InitNetwork("config/conf/NetWork.xml") // init net

	controller.RunNetwork() // Receive network data
	go controller.RunProcessor()
	go controller.RunHeartBeatProcessor()

	app.Run(iris.Addr(parse.AppConfig.IP+":"+parse.AppConfig.Port), iris.WithConfiguration(iris.YAML("config/iris.yaml")))
}
