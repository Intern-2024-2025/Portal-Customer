import router from '../router/index';
import { ref } from 'vue';
import axiosInstance from "./axiosInstance";

class API {
  static sessionExpired = ref(false);

  static async interceptor(){
    try {
      axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401 && error.response.data.message === 'Token expired') {
          this.sessionExpired.value = true;
          
          setTimeout(() => {
            router.push('/auth/signin');
          }, 3000);
        }
        return Promise.reject(error);
      }
    );
    } catch (error) {
      console.log("api auth", error)
    }
  }
  static async login(username:any, password:any) {
    try {
      const response = await axiosInstance.post("login", {
        username, password
      });
      return response.data;
    } catch (err:any) {
      return err.response.data;
    }
  }
  static async register(username:any, email:any, password:any) {
    try {
      const response = await axiosInstance.post("register", {
        username, email, password
      });
      return response.data;
    } catch (err:any) {
      return err.response.data;
    }
  }
  static async resetPassword(email:any) {
    try {
      const response = await axiosInstance.post("reset-password", {email});
      return response.data;
    } catch (err:any) {
      return err.response.data;
    }
  }
  static async newPassword(email:any, otp:any, newPassword:any) {
    try {
      const response = await axiosInstance.post("new-password", {email, otp, newPassword});
      return response.data;
    } catch (err:any) {
      return err.response.data;  
    }
  }
  static async verificationEmail(otp:any, email: any) {
    try {
      const response = await axiosInstance.post("verification-email", {otp, email});
      return response.data;
    } catch (err:any) {
      return err.response.data;  
    }
  }
  static async logout() {
    try {
      localStorage.clear()
    } catch (err:any) {
      return err.response.data;  
    }
  }
}

API.interceptor()

export default API;
