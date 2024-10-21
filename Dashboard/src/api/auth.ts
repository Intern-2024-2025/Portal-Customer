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
  static async fetch() {
    try {
      const response = await axiosInstance.get("fetch");
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

export default API;
