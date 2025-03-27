package controllers

import (
	"net/http"

	"server/utils"

	"github.com/gin-gonic/gin"
)

func UploadMultipleImagesHandler(c *gin.Context) {
	// Parse the files from the request
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "message": "Failed to parse form"})
		return
	}

	files := form.File["images"] // Get all uploaded images
	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No files found in the request", "message": "No images uploaded"})
		return
	}

	// Initialize Cloudinary
	cld, ctx, err := utils.Credentials()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Failed to initialize Cloudinary"})
		return
	}

	var secureURLs []string

	// Iterate over each file and upload
	for _, file := range files {
		// Open file for reading
		src, err := file.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Failed to open file"})
			return
		}
		defer src.Close()

		// Upload the image
		url, err := utils.UploadImage(cld, ctx, src)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "message": "Failed to upload image"})
			return
		}

		// Append URL to the response array
		secureURLs = append(secureURLs, url)
	}

	// Return array of uploaded image URLs
	c.JSON(http.StatusOK, gin.H{"image_urls": secureURLs,"message":"Images uploaded successfully"})
}
