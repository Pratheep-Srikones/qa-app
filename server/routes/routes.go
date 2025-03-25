package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:user_id", controllers.GetUserByID)
	r.POST("/users", controllers.CreateUser)
	r.POST("/login", controllers.LoginUser)

	return r
}
