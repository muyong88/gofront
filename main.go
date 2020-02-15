package main

import (
	"github.com/kataras/iris"
	"github.com/yanzhen74/gofront/src/inits/parse"
	"github.com/yanzhen74/gofront/src/routes"
)

func main() {
	app := iris.New()
	parse.AppConfigParse()

	routes.Hub(app)
	app.Run(iris.Addr(":"+parse.AppConfig.Port), iris.WithConfiguration(iris.YAML("config/iris.yaml")))
}
