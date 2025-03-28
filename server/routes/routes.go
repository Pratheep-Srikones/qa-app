package routes

import (
	"server/controllers"
	"server/middleware"

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
	r.GET("/users", middleware.AuthMiddleware(),controllers.GetUsers)
	r.GET("/users/:user_id", middleware.AuthMiddleware(),controllers.GetUserByID)
	r.GET("/users/username/:user_id", middleware.AuthMiddleware(), controllers.GetUsernameByID)

	
	r.POST("/auth/signup", controllers.CreateUser)
	r.POST("/auth/login", controllers.LoginUser)
	r.POST("/auth/logout", controllers.LogoutUser)
	r.PUT("/auth/change-password", middleware.AuthMiddleware(),controllers.ChangePassword)

	r.GET("/questions", middleware.AuthMiddleware(),controllers.GetAllQuestions)
	r.GET("/questions/:user_id", middleware.AuthMiddleware(),controllers.GetQuestionsByUserID)
	r.GET("/questions/latest", middleware.AuthMiddleware(),controllers.GetLatestQuestions)
	r.POST("/questions", middleware.AuthMiddleware(),controllers.AddQuestion)
	r.POST("/questions/tags/:question_id", middleware.AuthMiddleware(),controllers.AddTagsToQuestions)
	r.GET("/questions/tag/:tag", middleware.AuthMiddleware(),controllers.GetQuestionsByTag)

	r.GET("/tags/:question_id", middleware.AuthMiddleware(),controllers.GetTagsByQuestionID)
	r.GET("/tags/top", middleware.AuthMiddleware(),controllers.GetTopTags)

	r.GET("/answers/:question_id", middleware.AuthMiddleware(),controllers.GetAnswersForQuestion)
	r.POST("/answers", middleware.AuthMiddleware(),controllers.AddAnswer)
	r.GET("/answers/count/:question_id", middleware.AuthMiddleware(),controllers.GetAnswerCount)
	
	r.POST("/upload", middleware.AuthMiddleware(),controllers.UploadMultipleImagesHandler)

	return r
}
