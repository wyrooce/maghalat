// sessions.go
package main

import (
	"io/ioutil"

	"github.com/kataras/iris"
	"github.com/kataras/iris/sessions"
)

var page = struct {
	Title string
}{"Welcome"}

var (
	cookieNameForSessionID = "hash"
	sess                   = sessions.New(sessions.Config{Cookie: cookieNameForSessionID})
)

func secret(ctx iris.Context) {
	// Check if user is authenticated
	if auth, _ := sess.Start(ctx).GetBoolean("authenticated"); !auth {
		ctx.StatusCode(iris.StatusForbidden)
		return
	}

	// Print secret message
	ctx.WriteString("The cake is a lie!")
}

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func login(ctx iris.Context) {
	var user = new(User)
	err := ctx.ReadJSON(&user)

	if err != nil {
		println(err)
		ctx.Values().Set("error", "login failed. "+err.Error())
		ctx.StatusCode(iris.StatusInternalServerError)
		return
	}
	println(user.Username)
	println(user.Password)
	if user.Username == "admin" && user.Password == "123456" {
		session := sess.Start(ctx)
		session.Set("authenticated", true)
		ctx.JSON(map[string]string{"status": "ok"})
	} else {
		ctx.Values().Set("error", "login failed. "+err.Error())
		ctx.StatusCode(iris.StatusInternalServerError)
	}

}

func logout(ctx iris.Context) {
	session := sess.Start(ctx)

	// Revoke users authentication
	session.Set("authenticated", false)
	ctx.JSON(map[string]string{"status": "ok"})
}

func main() {
	app := iris.New()

	app.Favicon("./public/favicon.ico")

	// app.Use(iris.Gzip)

	app.StaticWeb("/scripts", "./public/scripts")

	app.Get("/", func(ctx iris.Context) {
		println("ssssssssssssssssssssssssssssssssssssss")
		data, err := ioutil.ReadFile("./public/index.html")
		if err != nil {
			print(err)
		}
		ctx.HTML(string(data))
	})

	app.Get("/secret", secret)
	app.Post("/login", login)
	app.Get("/logout", logout)

	app.Run(iris.Addr(":8080"))
}
