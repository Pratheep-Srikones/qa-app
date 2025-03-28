package controllers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"

	"server/config"
	"server/models"
)

func GetAnswersForQuestion(c *gin.Context) {
	var answers []models.Answer
	questionID := c.Param("question_id")

	rows, err := config.DB.Query(context.Background(), "SELECT * FROM answers WHERE question_id = $1", questionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error while accessing database"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var answer models.Answer
		err := rows.Scan(&answer.AnswerID, &answer.AnsweredAt, &answer.Answer, &answer.UserID, &answer.QuestionID, &answer.UpVotes, &answer.DownVotes)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error while scanning answers"})
			return
		}
		answers = append(answers, answer)
	}

	c.JSON(http.StatusOK, gin.H{"answers": answers, "message": "Answers fetched successfully"})
}

func AddAnswer(c *gin.Context) {
	var answer models.Answer
	if err := c.ShouldBindJSON(&answer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Invalid input"})
		return
	}

	_, err := config.DB.Exec(context.Background(), "INSERT INTO answers (answer, user_id, question_id) VALUES ($1, $2, $3)", answer.Answer, answer.UserID, answer.QuestionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error while inserting answer"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Answer added successfully"})
}

func GetAnswerCount(c *gin.Context) {
	var count int
	questionID := c.Param("question_id")

	err := config.DB.QueryRow(context.Background(), "SELECT COUNT(*) FROM answers WHERE question_id = $1", questionID).Scan(&count)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error while counting answers"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"count": count, "message": "Answer count fetched successfully"})
}