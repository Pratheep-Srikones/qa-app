package controllers

import (
	"context"
	"fmt"
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

func GetLatestQuestions(c *gin.Context) {
	// Query the latest 5 questions
	rows, err := config.DB.Query(context.Background(), "SELECT * FROM questions ORDER BY asked_at DESC LIMIT 5")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}
	defer rows.Close() // ✅ Ensure connection is closed

	var questions []models.Question

	// Loop through rows
	for rows.Next() {
		var question models.Question
		if err := rows.Scan(
			&question.Question_ID,  
			&question.Asked_at, 
			&question.User_ID, 
			&question.Title, 
			&question.Description, 
			&question.Image_Urls, 
			&question.AI_Answer,
		); err != nil {
			// ✅ Log the error and continue instead of stopping
			fmt.Println("Error scanning row:", err)
			continue
		}
		questions = append(questions, question)
	}

	// ✅ Handle empty result set
	if len(questions) == 0 {
		c.JSON(http.StatusOK, gin.H{"questions": questions, "message": "No questions found."})
		return
	}

	// ✅ Return the response
	c.JSON(http.StatusOK, gin.H{"questions": questions, "message": "Questions fetched successfully"})
}


func GetQuestionsByTag (c *gin.Context) {
	tag := c.Param("tag")
	if tag == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "tag is required", "message": "Invalid input"})
		return
	}

	rows, err := config.DB.Query(context.Background(), "SELECT * FROM questions WHERE question_id IN (SELECT question_id FROM question_tags WHERE tag = $1)", tag)
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
func AddQuestion(c *gin.Context) {
	var newQuestion models.Question
	err := c.BindJSON(&newQuestion) // Bind the request body to newQuestion struct
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Invalid request"})
		return
	}

	// Generate AI Answer
	aiAnswer, err := utils.GetAIAnswer(newQuestion.Title, newQuestion.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error Generating AI Answer"})
		return
	}
	newQuestion.AI_Answer = aiAnswer

	// Insert Question and Return the Inserted Data
	err = config.DB.QueryRow(context.Background(), 
		"INSERT INTO questions (user_id, title, description, image_urls, ai_answer) VALUES ($1, $2, $3, $4, $5) RETURNING question_id, asked_at, user_id, title, description, image_urls, ai_answer", 
		newQuestion.User_ID, newQuestion.Title, newQuestion.Description, newQuestion.Image_Urls, newQuestion.AI_Answer,
	).Scan(
		&newQuestion.Question_ID, 
		&newQuestion.Asked_at, 
		&newQuestion.User_ID, 
		&newQuestion.Title, 
		&newQuestion.Description, 
		&newQuestion.Image_Urls, 
		&newQuestion.AI_Answer,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Failed to insert and fetch the added question"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Question added successfully", "question": newQuestion})
}


