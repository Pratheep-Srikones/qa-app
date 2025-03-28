package utils

import (
	"os"
	"time"

	"server/config"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateToken(user_id string) (string, error) {
	secretKey := os.Getenv("JWT_SECRET_KEY")
	if secretKey == "" {
		secretKey = "default_secret" // Use a fallback or log an error
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user_id,
		"exp":     time.Now().Add(time.Hour * 24).Unix(), // 24-hour expiry
	})

	return token.SignedString([]byte(secretKey))
}

func ValidateToken(tokenString string) (string, error) {
	secretKey := config.GetEnv("JWT_SECRET_KEY")
	

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Ensure the signing method is HMAC
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return []byte(secretKey), nil
	})

	if err != nil {
		return "", err
	}

	// Validate the token claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID, ok := claims["user_id"].(string)
		if !ok {
			return "", jwt.ErrInvalidKey
		}
		return userID, nil
	}

	return "", jwt.ErrInvalidKey
}