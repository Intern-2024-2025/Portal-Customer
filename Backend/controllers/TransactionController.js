const { accesToken } = require("../helper/chekAccessToken.js");
const Models = require("../models/index.js");
const { handleGet, handlerError } = require("../helper/HandlerError.js");
const Transaction = Models.Transaction
const {searchWhere} = require('../helper/Search.js')
const {paginator} = require('../helper/Pagination.js');
const { Op, Sequelize } = require("sequelize");

class TransactionController{
    static async getTransactionByClient(req,res){
        try {
            const token = accesToken(req)
            const {currentPage, filterCreate} = req.query
            await Transaction.findAll({
                include: {
                    model: Models.Products,
                    where: {
                        client_id: token.id
                    }
                },
                order: [['create', filterCreate || 'DESC']],
            }).then(async result=>{
                const countStatus =  result.reduce(
                    (acc, item) => {
                        acc[item.status ? 'true' : 'false'] += 1;
                        return acc;
                    },
                    { true: 0, false: 0 }
                );
                const data = paginator(result, currentPage || 1, 10)
                handleGet(res, {
                    countStatus,
                    pagination: {
                        currentPages: data.currentPages,
                        totalPages: data.totalPages
                    },
                    data: data.data
                })
            })
        } catch (error) {
            handlerError(res,error)
        }
    }
    static async getTransactionByAdmin(req,res){
        try {
            const { currentPage, search } = req.query
            const transaction = await Models.Transaction.findAll({
                attributes: [
                    'productId',
                    [Sequelize.fn('COUNT', Sequelize.col('product_id')), 'count'] // Menghitung jumlah kemunculan
                ],
                group: ['productId'],
                raw: true
            })
            await Models.Client.findAll({
                where: {
                    status_verification_data : "verifed",
                    [Op.and]: searchWhere(search, 'username', 'email')[Symbol.for('and')]
                },
                attributes: ['id','email', 'username'],
                include: [{ model: Models.ClientDetail, attributes: ['fullname', 'phone', 'category_business'] }, {model: Models.Products, attributes: ['id','call_api', 'count_trial']}],
                order: [[Models.Products, 'call_api', 'DESC']]
            }).then((data) => {
                const response = data.map(result=>{
                    const { id ,email, username} =result.dataValues
                    const { fullname, phone, category_business: categoryBusiness } = result.dataValues.client_detail
                    const { call_api: callApi, count_trial: countTrial, id: idProduct } = result.dataValues.products[0]
                    const countAPi = transaction.find(api => api.productId === idProduct)
                    return {
                        id,
                        idProduct,
                        fullname,
                        username,
                        email,
                        phone,
                        categoryBusiness,
                        callApi: countAPi ? countAPi.count : callApi,
                        countTrial
                    };
                })  
                const pagination = paginator(response, currentPage || 1, 10)
                handleGet(res,{
                    pagination: {
                        currentPages: pagination.currentPages,
                        totalPages: pagination.totalPages
                    },
                    data: pagination.data
                });
            });
        } catch (error) {
            handlerError(res,error)
        }
    }
    static async getTransactionByClientAdmin(req,res){
        try {
            const { currentPage } = req.query
            await Transaction.findAll({
                where: {
                    productId: req.params.productId,
                },
                include: {model: Models.Products},
                order: [['create', 'DESC']],
            }).then(data=>{
                const countStatus =  data.reduce(
                    (acc, item) => {
                        acc[item.status ? 'true' : 'false'] += 1;
                        return acc;
                    },
                    { true: 0, false: 0 }
                );
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
                const pagination = paginator(result, currentPage || 1, 10)
                handleGet(res,{
                    countStatus,
                    pagination: {
                        currentPages: pagination.currentPages,
                        totalPages: pagination.totalPages
                    },
                    data: pagination.data
                });
            })
        } catch (error) {
            handlerError(res,error)
        }
    }
}

module.exports = TransactionController