package controllers

import (
	"context"
	"net/http"

	"server/config"
	"server/models"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	rows, err := config.DB.Query(context.Background(), "SELECT user_id, email, username FROM users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "database error while fetching users"})
		return
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		err := rows.Scan(&user.ID, &user.Email, &user.Name)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, gin.H{"users": users, "message": "users fetched successfully"})
}
