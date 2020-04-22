package routes

import (
	"github.com/kataras/iris"
)

//HomeHub HomeHub
func HomeHub(party iris.Party) {
	home := party.Party("/")

	home.Get("/", func(ctx iris.Context) { // 首页模块
		ctx.Redirect("/login")
	})
	home.Get("/login", func(ctx iris.Context) { //   登录模块
		ctx.View("login.html")
	})
	home.Get("/home", func(ctx iris.Context) { // 首页模块
		ctx.View("index.html")
	})
	home.Post("/user", func(ctx iris.Context) { // 首页模块
		ctx.JSON(iris.Map{"login_status": "success"})
	})
}
