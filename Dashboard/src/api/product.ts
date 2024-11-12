import axiosInstance from "./axiosInstance";

class ProductAPI {
  //Client
  static async getProductClient() {
    try {
      const response = await axiosInstance.get("product");
      return response.data;
    } catch (err:any) {
      return err.response.data;  
    }
  }

  // admin
  static async createProductAdmin(paylod: any) {
    try {
      console.log(paylod, "payload create produk")
      const response = await axiosInstance.post("product", paylod);
      return response.data;
    } catch (err:any) {
      return err.response.data;  
    }
  }
  static async getProductAdmin() {
    try {
      const response = await axiosInstance.get("product");
      return response.data;
    } catch (err:any) {
      return err.response.data;  
    }
  }

}

export default ProductAPI;
