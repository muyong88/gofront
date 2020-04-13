package routes

import (
	"github.com/kataras/iris"
)

//HomeHub HomeHub
func HomeHub(party iris.Party) {
	home := party.Party("/")

	home.Get("/", func(ctx iris.Context) { // 首页模块
		ctx.Redirect("/home")
	})
	home.Get("/home", func(ctx iris.Context) { // 首页模块
		ctx.View("index.html")
	})
}
