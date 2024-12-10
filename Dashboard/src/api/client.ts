import axiosInstance from "./axiosInstance";


class ClientAPI {
    static async getClient() {
        try {
        const response = await axiosInstance.get("clients");
        return response.data;
        } catch (err:any) {
        return err.response.data;  
        }
    }
    static async getClientDetail(id:any) {
        try {
        const response = await axiosInstance.get(`client-detail/${id}`);
        return response.data;
        } catch (err:any) {
        return err.response.data;  
        }
    }
    static async getSubmisson() {
        try {
        const response = await axiosInstance.get("client-submisson");
        return response.data;
        } catch (err:any) {
        return err.response.data;  
        }
    }
}

export default ClientAPI;
