package config

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5"
)

var DB *pgx.Conn

func ConnectDB() {
	var err error
	connStr := GetEnv("SUPABASE_DB_URL")

	DB, err = pgx.Connect(context.Background(), connStr)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	log.Println("Connected to Supabase database")
}

func CloseDB() {
	DB.Close(context.Background())
}
