import { AxiosError } from "axios";
import axiosInstance from "../config/axios.config";

export const getAllQuestions = async () => {
  try {
    const response = await axiosInstance.get("/questions");
    return response.data;
  } catch (error) {
    console.error("Error while fetching all questions: ", error);
    throw error as AxiosError;
  }
};

export const getQuestionsByUserId = async (user_id: string) => {
  try {
    const response = await axiosInstance.get(`/questions/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching questions by user id: ", error);
    throw error as AxiosError;
  }
};

export const getLatestQuestions = async () => {
  try {
    const response = await axiosInstance.get("/questions/latest");
    return response.data;
  } catch (error) {
    console.error("Error while fetching latest questions: ", error);
    throw error as AxiosError;
  }
};

export const addQuestion = async (
  title: string,
  description: string,
  user_id: string
) => {
  try {
    const response = await axiosInstance.post("/questions", {
      title,
      description,
      user_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error while adding question: ", error);
    throw error as AxiosError;
  }
};
