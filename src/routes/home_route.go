package routes

import (
	"fmt"
	"time"

	"github.com/kataras/iris"
	"github.com/kataras/iris/sessions"
)

var (
	cookieNameForSessionID = "gofrontcookies"
	sess                   = sessions.New(sessions.Config{Cookie: cookieNameForSessionID, Expires: 45 * time.Minute})
)

//HomeHub HomeHub
func HomeHub(party iris.Party) {
	home := party.Party("/")

	home.Get("/", func(ctx iris.Context) { // 转到登录
		ctx.Redirect("/login")
	})
	home.Get("/login", func(ctx iris.Context) { //   登录模块
		ctx.View("login.html")
	})
	home.Get("/home", func(ctx iris.Context) { // 首页模块
		session := sess.Start(ctx)
		if auth, _ := session.GetBoolean("authenticated"); !auth {
			ctx.Redirect("/login")
		} else {
			ctx.View("index.html")
		}
	})
	home.Post("/user", func(ctx iris.Context) { //验证用户

		session := sess.Start(ctx)
		session.Set("authenticated", true)
		ctx.JSON(iris.Map{"login_status": "success"})
	})
	home.Get("/logout", func(ctx iris.Context) { //   退出登录模块
		session := sess.Start(ctx)
		// 撤销用户身份验证
		session.Set("authenticated", false)
		fmt.Println("session id:" + session.ID())
		fmt.Println(session.GetAll())
		ctx.Redirect("/login")
	})
}
