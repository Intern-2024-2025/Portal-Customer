import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5003/",
  headers: {
    "Content-Type": "application/json",
  },
});

class API {
  static async createContact(body) {
    try {
      const response = await axiosInstance.post("contact", {
        firstName: body.firstName,
        lastName: body.lastName,
        emailAddress: body.email,
        message: body.message,
      });
      console.log(response, "create contact");
      return response.data;
    } catch (err) {
      console.log(err);
      console.error("error login:", err.response.data);
      return err.response.data;
    }
  }
}

export default API;
