package controllers

import (
	"context"
	"net/http"
	"server/config"

	"github.com/gin-gonic/gin"
)

func AddTagsToQuestions (c *gin.Context) {
	questionID := c.Param("question_id")
	if questionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "question_id is required", "message": "Invalid input"})
		return
	}
	var tags []string
	if err := c.ShouldBindJSON(&tags); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Invalid input"})
		return
	}

	for _, tag := range tags {
		_, err := config.DB.Exec(context.Background(), "INSERT INTO question_tags (question_id, tag) VALUES ($1, $2)",questionID, tag)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error while inserting tags"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Tags added successfully"})
}

func GetTagsByQuestionID (c *gin.Context) {
	questionID := c.Param("question_id")
	if questionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "question_id is required", "message": "Invalid input"})
		return
	}

	rows, err := config.DB.Query(context.Background(), "SELECT tag FROM question_tags WHERE question_id = $1", questionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error while fetching tags"})
		return
	}
	defer rows.Close()

	var tags []string
	for rows.Next() {
		var tag string
		err := rows.Scan(&tag)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error while scanning tags"})
			return
		}
		tags = append(tags, tag)
	}

	c.JSON(http.StatusOK, gin.H{"tags": tags, "message": "Tags fetched successfully"})
}

func GetTopTags(c *gin.Context) {
	// Query to get top 10 tags with the highest count
	rows, err := config.DB.Query(context.Background(), "SELECT tag, COUNT(*) as count FROM question_tags GROUP BY tag ORDER BY count DESC LIMIT 10")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error while fetching top tags"})
		return
	}
	defer rows.Close() // ✅ Ensure rows are closed

	// Define struct once
	type TagCount struct {
		Tag   string `json:"tag"`
		Count int    `json:"count"`
	}

	var tags []TagCount

	// Scan rows into struct
	for rows.Next() {
		var tag TagCount
		if err := rows.Scan(&tag.Tag, &tag.Count); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error while scanning top tags"})
			return
		}
		tags = append(tags, tag)
	}

	// Check if no tags found
	if len(tags) == 0 {
		c.JSON(http.StatusOK, gin.H{"tags": tags, "message": "No tags found."})
		return
	}

	// Return response
	c.JSON(http.StatusOK, gin.H{"tags": tags, "message": "Top tags fetched successfully"})
}
