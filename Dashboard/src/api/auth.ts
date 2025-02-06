import axios from "axios";
import axiosInstance from "./axiosInstance";

class API {
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
  static async fetch(token:any) {
    try {
      // const response = await axiosInstance.get("fetch");
      const response = await axios.get('http://localhost:5003/fetch', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log(response)
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
  static async verificationData(fullname:any, phone: any, address:any, category_business:any, description_business:any, image:any ) {
    try {
      const response = await axiosInstance.post("verification-data", {fullname, phone, address, category_business, description_business, image});
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

export default API;
