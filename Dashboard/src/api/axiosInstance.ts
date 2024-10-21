import axios from "axios";
import router from '../router/index';
const token = localStorage.getItem("token")

const axiosInstance = axios.create({
  baseURL: "http://localhost:5003/",
  headers: {
    "Content-Type": "application/json",
     Authorization: `Bearer ${token}`
  },
});

async function interceptors(): Promise<any> {
  try {
      axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401 || error.response.status === 403 ) {
           alert("Session Anda Habis, Anda akan diarahkan login kembali...")
          setTimeout(() => {
            router.push('/auth/signin');
          }, 500);
        } 
        return Promise.reject(error);
      }
    );
    } catch (error) {
      console.log("api auth", error)
    }
}

interceptors()

export default axiosInstance;