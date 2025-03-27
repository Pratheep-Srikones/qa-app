package utils

// Import Cloudinary and other necessary libraries
//===================
import (
	"context"
	"fmt"
	"io"

	"server/config"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/google/uuid"
)

func Credentials() (*cloudinary.Cloudinary, context.Context, error) {
	cld, err := cloudinary.NewFromURL(config.GetEnv("CLOUDINARY_URL"))
	if err != nil {
		return nil, nil, fmt.Errorf("failed to initialize Cloudinary: %w", err)
	}
	cld.Config.URL.Secure = true
	ctx := context.Background()
	return cld, ctx, nil
}

func UploadImage(cld *cloudinary.Cloudinary, ctx context.Context, file io.Reader) (string, error) {
	resp, err := cld.Upload.Upload(ctx, file, uploader.UploadParams{
		PublicID:       uuid.New().String(),
		UniqueFilename: api.Bool(true),
		Overwrite:      api.Bool(false),
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload image: %w", err)
	}

	return resp.SecureURL, nil
}
