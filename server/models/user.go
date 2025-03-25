package models

import "time"

type User struct {
	User_ID    string    `json:"user_id"`
	Email      string    `json:"email"`
	Username   string    `json:"username"`
	Password   string    `json:"password"`
	Created_at time.Time `json:"created_at"`
}
