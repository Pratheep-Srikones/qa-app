import axiosInstance from "../config/axios.config";
import { AxiosError } from "axios";

export const getAnswerByQuestionId = async (question_id: string) => {
  try {
    const response = await axiosInstance.get(`/answers/${question_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching answers:", error);
    throw error as AxiosError;
  }
};

export const addAnswer = async (
  question_id: string,
  answer: string,
  user_id: string
) => {
  try {
    const response = await axiosInstance.post("/answers", {
      question_id,
      answer,
      user_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding answer:", error);
    throw error as AxiosError;
  }
};

export const getAnswerCountByQuestionId = async (question_id: string) => {
  try {
    const response = await axiosInstance.get(`/answers/count/${question_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching answer count:", error);
    throw error as AxiosError;
  }
};
