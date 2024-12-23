import axiosInstance from "./axiosInstance";


class ClientAPI {
    static async getClient(curentPage:number, search:string) {
        try {
        const response = await axiosInstance.get(`clients?currentPage=${curentPage}&search=${search}`);
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
    static async getSubmisson(currentPage:number, status:string, search:string) {
        try {
        const response = await axiosInstance.get(`client-submisson?currentPage=${currentPage}&status=${status}&search=${search}`);
        return response.data;
        } catch (err:any) {
        return err.response.data;  
        }
    }
}

export default ClientAPI;
