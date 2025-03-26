package models

import (
	"time"
)

type Question struct {
    Question_ID   string       `json:"question_id"`
    User_ID       string       `json:"user_id"`
    Title         string    `json:"title"`
    Description   string    `json:"description"`
    Asked_at      time.Time `json:"asked_at"`
    Image_Urls    []string  `json:"image_urls"`
    AI_Answer     string    `json:"ai_answer"`
}
