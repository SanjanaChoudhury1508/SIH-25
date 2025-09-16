import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Backend base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if you are using cookies or sessions
});

export default axiosInstance;
