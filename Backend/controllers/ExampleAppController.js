const { accesToken } = require("../helper/chekAccessToken.js");
const { handleGet, handlerError, handlerErrorCustom } = require("../helper/HandlerError.js");
const Models = require("../models/index.js");
const SGKMS = require("../utils/sgkms.js")
const { v4: uuidv4 } = require('uuid');

async function createTranscation(data){
    try {
        const chekProduct = await Models.Products.findOne({
            where:{
                clientId : data.userId
            }
        })
        if(!chekProduct){
            return 0
        }
        await Models.Transaction.create({
            id: uuidv4(),
            endpoint: data.endpoint,
            status: data.status,
            create: new Date(),
            Id: chekProduct.id
        })
    } catch (error) {
        console.log("create transaction", error)
    }
}


class ExampleApp{
    static async LoginSGKMS(req,res){
        try {
            const token = accesToken(req)
            const {slotId, password} = req.body
            const data = await SGKMS.sendLogin(slotId, password);

            const transactionStatus = !data.fault;
            const createData = await createTranscation({
                userId: token.id,
                status: transactionStatus,
                endpoint: "login"
            });

            if (createData === 0) {
                return handlerErrorCustom(res, "failed transaction");
            }
            
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }

            return res.status(200).json(data);

        } catch (error) {
            handlerError(res, error)
        }
    }
    static async EncryptSGKMS(req,res){
        try {
            const token = accesToken(req)
            const {sessionToken, slotId, keyId, plaintext } = req.body

            const data = await SGKMS.encryptData(sessionToken, slotId, keyId, plaintext)
            
            const transactionStatus = !data.fault;
            const createData = await createTranscation({
                userId: token.id,
                status: transactionStatus,
                endpoint: "encrypt"
            });

            if (createData === 0) {
                return handlerErrorCustom(res, "failed encrypt");
            }
            
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }

            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async DescryptSGKMS(req,res){
        try {
            const token = accesToken(req)
            const {sessionToken, slotId, keyId, keyVersion, ciphertext} = req.body
            const data = await SGKMS.decryptData(sessionToken, slotId, keyId, keyVersion, ciphertext)
            console.log(data)
            const transactionStatus = !data.fault;
            const createData = await createTranscation({
                userId: token.id,
                status: transactionStatus,
                endpoint: "decrypt"
            });
            if (createData === 0) {
                return handlerErrorCustom(res, "failed decrypt");
            }
            
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }

            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
}

module.exports = ExampleApp
