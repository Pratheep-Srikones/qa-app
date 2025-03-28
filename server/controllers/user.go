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

func GetUsers(c *gin.Context) {
	rows, err := config.DB.Query(context.Background(), "SELECT user_id, email, username FROM users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		err := rows.Scan(&user.User_ID, &user.Email, &user.Username)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, gin.H{"users": users, "message": "users fetched successfully"})
}

func GetUserByID (c *gin.Context) {
	var user models.User
	err := config.DB.QueryRow(context.Background(), "SELECT user_id, email, username, password, created_at FROM users WHERE user_id = $1", c.Param("user_id")).Scan(&user.User_ID, &user.Email, &user.Username, &user.Password, &user.Created_at)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		fmt.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user, "message": "user fetched successfully"})

}
func GetUsernameByID (c *gin.Context) {
	var user models.User
	err := config.DB.QueryRow(context.Background(), "SELECT username FROM users WHERE user_id = $1", c.Param("user_id")).Scan(&user.Username)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		fmt.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"username": user.Username, "message": "username fetched successfully"})
}
func CreateUser (c *gin.Context) {
	var newUser models.User

	err := c.BindJSON(&newUser) // This will bind the request body to the newUser struct
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Invalid request"})
		return
	}
	rows, err := config.DB.Query(context.Background(), "SELECT user_id FROM users WHERE username = $1", newUser.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}
	defer rows.Close()

	if rows.Next() {
		c.JSON(http.StatusBadRequest, gin.H{"error": "","message": "Username already exists"})
		return
	}
	newUser.Password,err = utils.HashPassword(newUser.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}
	res, err := config.DB.Exec(context.Background(), "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)", newUser.Email, newUser.Username, newUser.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully", "result": res})

}

func LoginUser (c *gin.Context) {
	var user models.User
	err := c.BindJSON(&user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Invalid request"})
		return
	}

	var dbUser models.User 
	err = config.DB.QueryRow(context.Background(), "SELECT user_id, email, username, password, created_at FROM users WHERE username = $1", user.Username).Scan(&dbUser.User_ID, &dbUser.Email, &dbUser.Username, &dbUser.Password, &dbUser.Created_at)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Invalid username or password"})
		return
	}

	if !utils.CheckPasswordHash(user.Password, dbUser.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "", "message": "Invalid username or password"})
		return
	}

	// Generate JWT token
	token, err := utils.GenerateToken(dbUser.User_ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}
	c.SetCookie("token", token, 3600*6, "/", "localhost", false, false)
	dbUser.Password = "" 
	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "user": dbUser})

}

func LogoutUser(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}

type ChangePasswordRequest struct {
	OldPassword string `json:"old_password" binding:"required"`
	NewPassword string `json:"new_password" binding:"required"`
	UserID     string `json:"user_id" binding:"required"`
}

func ChangePassword (c *gin.Context) {
	var request ChangePasswordRequest
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Invalid request"})
		return
	}

	
	var dbUser models.User
	err = config.DB.QueryRow(context.Background(), "SELECT password FROM users WHERE user_id = $1", request.UserID).Scan(&dbUser.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}

	if !utils.CheckPasswordHash(request.OldPassword, dbUser.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "", "message": "Invalid password"})
		return
	}

	newPasswordHash, err := utils.HashPassword(request.NewPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}

	_, err = config.DB.Exec(context.Background(), "UPDATE users SET password = $1 WHERE user_id = $2", newPasswordHash, request.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Internal server error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password changed successfully"})
}