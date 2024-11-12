const { accesToken } = require("../helper/chekAccessToken.js");
const Models = require("../models/index.js");
const { handleGet, handlerError } = require("../helper/HandlerError.js");
const Transaction = Models.Transaction

class TransactionController{
    static async getTransactionByClient(req,res){
        try {
            const token = accesToken(req)
            await Transaction.findAll({
                include: {
                    model: Models.Products,
                    where: {
                        client_id: token.id
                    }
                }
            }).then(data=>{
                handleGet(res,data)
            })
        } catch (error) {
            handlerError(res,error)
        }
    }
    static async getTransactionByAdmin(req,res){
        try {
            await Models.Client.findAll({
                where: {status_verification_data : 1},
                attributes: ['id','email', 'username'],
                include: [{ model: Models.ClientDetail, attributes: ['fullname', 'phone', 'category_business'] }, {model: Models.Products, attributes: ['id','call_api', 'count_trial']}],
                order: [[Models.Products, 'call_api', 'DESC']]
            }).then((data) => {
                const response = data.map(result=>{
                    const {id ,email, username} =result.dataValues
                    const { fullname, phone, category_business: categoryBusiness } = result.dataValues.client_detail

                    let product = {
                        call_api: 0,
                        count_trial: 100,
                        id_product: null
                    };
                    if (result.dataValues.products && result.dataValues.products.length > 0) {
                        product = {
                            call_api: result.dataValues.products[0].call_api,
                            count_trial: result.dataValues.products[0].count_trial || 100,
                            id_product: result.dataValues.products[0].id
                        };
                    }
                    return {
                        id,
                        idProduct: product.id_product,
                        fullname,
                        username,
                        email,
                        phone,
                        categoryBusiness,
                        callApi: product.call_api, 
                        countTrial: product.count_trial
                    };

                })  
                handleGet(res, response);
            });
        } catch (error) {
            handlerError(res,error)
        }
    }
    static async getTransactionByClientAdmin(req,res){
        try {

            await Transaction.findAll({
                where: {
                    productId: req.params.productId
                },
                include: {model: Models.Products}
            }).then(data=>{
                const result = data.map(a=>{
                    const { endpoint, status, create, productId } = a.dataValues
                    const {id, name } = a.dataValues.product
                    return{
                        id, 
                        name,
                        endpoint, 
                        status, 
                        create, 
                        productId
                    }
                })
                handleGet(res,result)
            })
        } catch (error) {
            handlerError(res,error)
        }
    }
}

module.exports = TransactionController