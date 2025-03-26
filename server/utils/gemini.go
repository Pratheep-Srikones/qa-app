package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"server/config"
)

// Structs for API request
type GeminiRequest struct {
	Contents []Content `json:"contents"`
}

type Content struct {
	Role  string  `json:"role"`
	Parts []Part  `json:"parts"`
}

type Part struct {
	Text string `json:"text"`
}

// API response structure
type GeminiResponse struct {
	Candidates []struct {
		Content struct {
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		} `json:"content"`
	} `json:"candidates"`
}

// Function to generate AI response
func GetAIAnswer(title, description string) (string, error) {
	apiKey := config.GetEnv("GEMINI_API_KEY")
	if apiKey == "" {
		return "", fmt.Errorf("GEMINI_API_KEY is not set")
	}

	// AI behavior rules
	rules := `
		You are an AI assistant. Follow these rules:
		IMPORTANT: MAINLY IF THE QUESTION IS NOT IT RELATED DO NOT ANSWER AND INFORM THE USER
		1. Provide accurate, concise answers.
		2. Avoid speculation; base responses on factual information.
		3. Keep responses under 200 words.
		4. Avoid biased opinions.
		5. If unsure, state that you don’t have enough information.
		6. If the question is inappropriate, inform the user.
		7. If the question is not IT related or contains offensive language, inform the user and do not provide an answer.
		8. If the question is about a specific person, do not provide personal information.
		9. In your response do not do any formatting like bold, italics and do not add \n characters just provide the plain text without any formatting.
	`

	// Create API request body with correct field names
	requestBody := GeminiRequest{
		Contents: []Content{
			{
				Role: "user",
				Parts: []Part{
					{Text: rules},
					{Text: fmt.Sprintf("Question Title: %s\nDescription: %s", title, description)},
				},
			},
		},
	}

	// Convert request to JSON
	requestJSON, err := json.Marshal(requestBody)
	if err != nil {
		return "", err
	}
	fmt.Println("Request JSON:", string(requestJSON)) // Debugging log

	// ✅ Use the correct model name and API endpoint
	apiURL := "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=" + apiKey
	req, err := http.NewRequest("POST", apiURL, bytes.NewBuffer(requestJSON))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Read and log response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	fmt.Println("Response Body:", string(body)) // Debugging log

	// Parse JSON response
	var geminiResponse GeminiResponse
	if err := json.Unmarshal(body, &geminiResponse); err != nil {
		return "", err
	}

	// Extract AI response text
	if len(geminiResponse.Candidates) > 0 && len(geminiResponse.Candidates[0].Content.Parts) > 0 {
		return geminiResponse.Candidates[0].Content.Parts[0].Text, nil
	}

	return "", fmt.Errorf("no response from Gemini AI")
}
