package middleware

import (
	"net/http"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        // Retrieve the token from cookies
        tokenCookie, err := c.Cookie("token")
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing or invalid token"})
            c.Abort()
            return
        }

        // Validate the token
        userID, err := utils.ValidateToken(tokenCookie)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
            c.Abort()
            return
        }

        // Store user ID in the context for downstream use
        c.Set("user_id", userID)

        // Continue to the next handler
        c.Next()
    }
}
