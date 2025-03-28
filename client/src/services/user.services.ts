import axiosInstance from "../config/axios.config";
import { AxiosError } from "axios";

export const getUserById = async (user_id: string) => {
  try {
    const response = await axiosInstance.get(`/users/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error as AxiosError;
  }
};

export const checkUserName = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/users/check/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error checking username:", error);
    throw error as AxiosError;
  }
};

export const getUserNameById = async (user_id: string) => {
  try {
    const response = await axiosInstance.get(`/users/username/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching username by ID:", error);
    throw error as AxiosError;
  }
};
