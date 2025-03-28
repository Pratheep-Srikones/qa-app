import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VITE_URL,
  withCredentials: true, // Include credentials in all requests
});

export default axiosInstance;
