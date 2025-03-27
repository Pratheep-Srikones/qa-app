import { AxiosError } from "axios";
import axiosInstance from "../config/axios.config";

export const getTopTags = async () => {
  try {
    const response = await axiosInstance.get("/tags/top");
    return response.data;
  } catch (error) {
    console.error("Error while fetching top tags: ", error);
    throw error as AxiosError;
  }
};
