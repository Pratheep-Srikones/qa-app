package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/users", controllers.GetUsers)

	return r
}
