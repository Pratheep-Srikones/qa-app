package models

import "time"

type Answer struct {
	AnswerID   string    `json:"answer_id"`
	AnsweredAt time.Time `json:"answered_at"`
	Answer     string `json:"answer"`
	UserID     string    `json:"user_id"`
	QuestionID string    `json:"question_id"`
	UpVotes    int    `json:"upvotes"`
	DownVotes  int    `json:"downvotes"`
}