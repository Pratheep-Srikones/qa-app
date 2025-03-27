import axiosInstance from "../config/axios.config";

export const uploadImages = async (images: FileList) => {
  const formData = new FormData();
  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  try {
    const response = await axiosInstance.post("/upload", formData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
