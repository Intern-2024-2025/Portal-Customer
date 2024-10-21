import axiosInstance from "./axiosInstance";


class TransactionAPI {
    static async getTransactionClient() {
        try {
        const response = await axiosInstance.get("transaction");
        return response.data;
        } catch (err:any) {
        return err.response.data;  
        }
    }
}

export default TransactionAPI;
