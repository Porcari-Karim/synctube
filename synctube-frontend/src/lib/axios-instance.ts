import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  withCredentials: true,
});

export default axiosInstance;