const { accesToken } = require("../helper/chekAccessToken.js");
const Models = require("../models/index.js");
const { handleGet, handlerError } = require("../helper/HandlerError.js");
const Transaction = Models.Transaction

class TransactionController{
    static async getTransactionByClinet(req,res){
        try {
            const token = accesToken(req)
            await Transaction.findAll({
                include: [{
                    model: Models.Products,
                    where: {
                        clientId: token.id
                    }
                }]
            }).then(data=>{
                handleGet(res,data)
            })
        } catch (error) {
            handlerError(res,error)
        }
    }
}

module.exports = TransactionController