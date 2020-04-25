package routes

import (
	"fmt"
	"time"

	"github.com/kataras/iris"
	"github.com/kataras/iris/sessions"
	"github.com/yanzhen74/gofront/src/model"
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
			role, _ := session.GetInt("role")
			username := session.GetString("username")
			if role == 1 {
				ctx.ViewData("role", true)
				ctx.ViewData("username", username)
			} else {
				ctx.ViewData("role", false)
				ctx.ViewData("username", username)
			}
			ctx.View("index.html")
		}
	})
	home.Post("/user", func(ctx iris.Context) { //验证用户
		var user model.Users
		if err := ctx.ReadJSON(&user); err != nil {
			ctx.JSON(iris.Map{"login_status": "invalid"})
			return
		}
		model.GetUserByNameAndPassword(&user)
		if user.Role != 1 && user.Role != 2 {
			ctx.JSON(iris.Map{"login_status": "invalid"})
			return
		}
		session := sess.Start(ctx)
		session.Set("username", user.UserName)
		session.Set("authenticated", true)
		session.Set("role", user.Role)
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
