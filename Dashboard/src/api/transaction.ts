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
    static async getTransactionAdmin() {
        try {
        const response = await axiosInstance.get("transaction-admin");
        return response.data;
        } catch (err:any) {
        return err.response.data;  
        }
    }
    static async getTransactionByClient(productId:any) {
        try {
        const response = await axiosInstance.get(`/transaction-detail-admin/${productId}`);
        return response.data;
        } catch (err:any) {
        return err.response.data;  
        }
    }
}

export default TransactionAPI;
