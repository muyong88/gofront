package routes

import (
	"time"

	"github.com/kataras/iris"
	"github.com/kataras/iris/sessions"
	"github.com/yanzhen74/gofront/src/model"
)

var (
	cookieNameForSessionID = "gofrontcookies"
	sess                   = sessions.New(sessions.Config{Cookie: cookieNameForSessionID, Expires: 0})
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
		getPage(ctx, "index.html")
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
		session.Set("loginTime", time.Now().Format("2006-01-02 15:04:05"))
		ctx.JSON(iris.Map{"login_status": "success"})
	})
	home.Get("/logout", func(ctx iris.Context) { //   退出登录模块
		session := sess.Start(ctx)
		// 撤销用户身份验证
		session.Set("authenticated", false)
		ctx.Redirect("/login")
	})
}
