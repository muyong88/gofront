package routes

import (
	"github.com/kataras/iris"
)

func HomeHub(party iris.Party) {
	home := party.Party("/")

	home.Get("/", func(ctx iris.Context) { // web服务模块
		//username, password, _ := ctx.Request().BasicAuth()
		//log.Printf("%s, %s\n", username, password)
		ctx.HTML("<h1> 第三个月完成前端开发！ </h1>")
	})
}
