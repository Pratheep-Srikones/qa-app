package routes

import (
	"server/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "https://yourfrontend.com"}, // Allowed origins 
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, // Allowed HTTP methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Allowed headers
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true, // Allows sending cookies or authentication headers
	}))
	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:user_id", controllers.GetUserByID)
	r.POST("/auth/signup", controllers.CreateUser)
	r.POST("/auth/login", controllers.LoginUser)

	return r
}
