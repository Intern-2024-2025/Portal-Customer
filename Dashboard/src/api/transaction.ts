import axiosInstance from "./axiosInstance";


class TransactionAPI {
    static async getTransactionClient(currentPage: number) {
        try {
        const response = await axiosInstance.get(`transaction?currentPage=${currentPage}`);
        return response.data;
        } catch (err:any) {
        return err.response.data;  
        }
    }
    static async getTransactionAdmin(currentPage:number, search:string) {
        try {
        const response = await axiosInstance.get(`transaction-admin?currentPage=${currentPage}&search=${search}`);
        return response.data;
        } catch (err:any) {
        return err.response.data;  
        }
    }
    static async getTransactionByClient(productId:any, currentPage:number) {
        try {
        const response = await axiosInstance.get(`/transaction-detail-admin/${productId}?currentPage=${currentPage}`);
        return response.data;
        } catch (err:any) {
        return err.response.data;  
        }
    }
}

export default TransactionAPI;
