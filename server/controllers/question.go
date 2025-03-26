package controllers

import (
	"context"
	"net/http"

	"server/config"
	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func GetAllQuestions(c *gin.Context) {
	rows, err := config.DB.Query(context.Background(), "SELECT * FROM questions")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error while databse access"})
		return
	}
	defer rows.Close()

	var questions []models.Question
	for rows.Next() {
		var question models.Question
		err := rows.Scan(&question.Question_ID,&question.Asked_at, &question.User_ID, &question.Title, &question.Description,  &question.Image_Urls, &question.AI_Answer)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(),"message":"Internal Server Error"} )
			return
		}
		questions = append(questions, question)
	}

	c.JSON(http.StatusOK, gin.H{"questions": questions, "message": "questions fetched successfully"})
}

func GetQuestionsByUserID (c *gin.Context) {
	rows, err := config.DB.Query(context.Background(), "SELECT * FROM questions WHERE user_id = $1", c.Param("user_id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}
	defer rows.Close()

	var questions []models.Question
	for rows.Next() {
		var question models.Question
		err := rows.Scan(&question.Question_ID, &question.Asked_at, &question.User_ID, &question.Title, &question.Description, &question.Image_Urls, &question.AI_Answer)
		if err != nil { 
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		questions = append(questions, question)
	}

	c.JSON(http.StatusOK, gin.H{"questions": questions, "message": "questions fetched successfully"})
}

func GetLatestQuestions (c *gin.Context) {
	rows, err := config.DB.Query(context.Background(), "SELECT * FROM questions ORDER BY asked_at DESC LIMIT 5")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}
	defer rows.Close()

	var questions []models.Question
	for rows.Next() {
		var question models.Question
		err := rows.Scan(&question.Question_ID,  &question.Asked_at, &question.User_ID, &question.Title, &question.Description, &question.Image_Urls, &question.AI_Answer)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		questions = append(questions, question)
	}

	c.JSON(http.StatusOK, gin.H{"questions": questions, "message": "questions fetched successfully"})
}

func AddQuestion (c *gin.Context) {
	var newQuestion models.Question
	err := c.BindJSON(&newQuestion) // This will bind the request body to the newQuestion struct
	if err != nil  {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Invalid request"})
		return
	}
	aiAnswer, err := utils.GetAIAnswer(newQuestion.Title, newQuestion.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error Generating AI Answer"})
		return
	}
	newQuestion.AI_Answer = aiAnswer
	rows, err := config.DB.Query(context.Background(), "INSERT INTO questions (user_id, title, description, image_urls, ai_answer) VALUES ($1, $2, $3, $4, $5)", newQuestion.User_ID, newQuestion.Title, newQuestion.Description, newQuestion.Image_Urls, newQuestion.AI_Answer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}
	defer rows.Close()
	c.JSON(http.StatusOK, gin.H{"message": "Question added successfully", "question": newQuestion})
}

