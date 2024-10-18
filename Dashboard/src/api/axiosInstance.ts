import axios from "axios";
const token = localStorage.getItem("token")

const axiosInstance = axios.create({
  baseURL: "http://localhost:5003/",
  headers: {
    "Content-Type": "application/json",
     Authorization: `Bearer ${token}`
  },
});

export default axiosInstance;