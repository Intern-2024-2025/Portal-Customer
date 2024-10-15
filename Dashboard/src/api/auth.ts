import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5003/",
  headers: {
    "Content-Type": "application/json",
  },
});

class API {
  static async login(username:any, password:any) {
    try {
      const response = await axiosInstance.post("login", {
        username, password
      });
      return response.data;
    } catch (err:any) {
      console.log(err);
      console.error("error login:", err.response.data);
      return err.response.data;
    }
  }
}

export default API;
