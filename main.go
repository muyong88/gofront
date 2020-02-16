package main

import (
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/gofrontdb"
	"github.com/yanzhen74/gofront/src/inits/parse"
	"github.com/yanzhen74/gofront/src/model"
	"github.com/yanzhen74/gofront/src/routes"
)

func main() {
	app := iris.New()
	parse.AppConfigParse()
	parse.DBSettingParse()
	routes.Hub(app)
	gofrontdb.MasterEngine().Sync2(new(model.Process_State))
	gofrontdb.SlaveEngine().Sync2(new(model.Process_State))
	app.Run(iris.Addr(":"+parse.AppConfig.Port), iris.WithConfiguration(iris.YAML("config/iris.yaml")))
}
