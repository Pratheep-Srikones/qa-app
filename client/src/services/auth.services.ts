import { AxiosError } from "axios";
import axiosInstance from "../config/axios.config";

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error as AxiosError;
  }
};

export const signup = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error as AxiosError;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error as AxiosError;
  }
};

export const changePassword = async (
  old_password: string,
  new_password: string,
  user_id: string
) => {
  try {
    const response = await axiosInstance.put("/auth/change-password", {
      old_password,
      new_password,
      user_id,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error as AxiosError;
  }
};
