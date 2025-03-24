package main

import (
	"fmt"
	"log"

	"server/config"
	"server/routes"
)

func main() {
	// Load environment variables
	config.LoadEnv()

	// Connect to Supabase DB
	config.ConnectDB()
	defer config.CloseDB()

	// Start server
	port := config.GetEnv("PORT")
	router := routes.SetupRouter()
	log.Printf("Server running on port %s", port)
	err := router.Run(fmt.Sprintf(":%s", port))
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
