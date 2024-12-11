const { accesToken } = require("../helper/chekAccessToken.js");
const { handleGet, handlerError, handlerErrorCustom } = require("../helper/HandlerError.js");
const Models = require("../models/index.js");
const SGKMS = require("../utils/sgkms.js")
const { v4: uuidv4 } = require('uuid');

async function createTranscation(res,data){
    try {
        const chekProduct = await Models.Products.findOne({
            where:{
                clientId : data.userId
            }
        })
        if(!chekProduct){
            return handlerErrorCustom(res, "failed transaction");
        }else{
            await Models.Transaction.create({
                id: uuidv4(),
                endpoint: data.endpoint,
                status: data.status,
                create: new Date(),
                productId: chekProduct.id
            })
            return
        }
    } catch (error) {
        console.log("create transaction", error)
    }
}

class ExampleApp{
    static async LoginSGKMS(req,res){
        try {
            const token = accesToken(req)
            const payload = (({slotId, password})=> ({
                slotId, password
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/agent/login", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault, 
                endpoint: "login"
            });     
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async RefreshSession(req,res){
        try {
            const token = accesToken(req)
            const payload = (({slotId, sessionToken}) => ({
                slotId,
                sessionToken
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/agent/refreshSession", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "refresh-session"
            });           
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);v  
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async RandomNumber(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, length}) => ({
                sessionToken, slotId, length
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/rng", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "random-number"
            });           
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async GeerateMAC(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, keyId, hashAlgo, data}) => ({
                sessionToken, slotId, keyId, hashAlgo, data
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/mac/generate", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "generate-MAC"
            });           
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async GenareteMAC(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, keyId, hashAlgo, data}) => ({
                sessionToken, slotId, keyId, hashAlgo, data
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/mac/generate", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "generate-MAC"
            });           
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async VerifyMAC(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, keyId, hashAlgo, data, mac, iv}) => ({
                sessionToken, slotId, keyId, hashAlgo, data, mac,
                ...(iv && { iv }),
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/mac/verify", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "verify-MAC"
            });           
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async Seal(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, keyId, plaintext}) => ({
                sessionToken, slotId, keyId, plaintext
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/seal", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "seal"
            });           
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async Unseal(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, ciphertext}) => ({
                sessionToken, slotId, ciphertext
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/unseal", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "unseal"
            });           
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
            const payload = (({ sessionToken, slotId, keyId, plaintext, useSessionKey }) => ({
                sessionToken, 
                slotId, 
                keyId, 
                plaintext,    
                ...(useSessionKey && { useSessionKey }),
            }))(req.body);
            const data = await SGKMS.engineApiSGKMS("/v1.0/encrypt",payload)    
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "encrypt"
            });      
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
            const payload = (({sessionToken, slotId, keyId, keyVersion, ciphertext})=>({
                sessionToken, slotId, keyId, ciphertext,
                ...(keyVersion && { keyVersion }),
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/decrypt", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "decrypt"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async Tokenize(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, keyId, plaintext})=>({
                sessionToken, slotId, keyId, plaintext
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/tokenize", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "tokenize"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async Detokenize(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, keyId, ciphertext})=>({
                sessionToken, slotId, keyId, ciphertext
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/detokenize", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "detokenize"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async Sign(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, keyId, data}) => ({
                sessionToken, slotId, keyId, data
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/sign", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "sign"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async VerifySign(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, keyId, data, signature}) => ({
                sessionToken, slotId, keyId, data, signature
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/verify", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "verify-sign"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async KeyInfo(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, keyId, keyVersion}) => ({
                sessionToken, slotId, keyId, keyVersion
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/key/info", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "key-info"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExKeyGenerate(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, algo, algoLength}) => ({
                sessionToken, slotId, wrappingKeyId, algo, algoLength
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/key/generate", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "key-generate"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExKeyPairGenerate(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, algo, algoLength, withCert}) => ({
                sessionToken, slotId, wrappingKeyId, algo, 
                ...(algoLength && { algoLength }),
                ...(withCert && { withCert }),
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/keypair/generate", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-keypair-generate"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExMacGenerate(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, wrappedKey, hashAlgo, data})=>({
                sessionToken, slotId, wrappingKeyId, wrappedKey, hashAlgo, data
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/mac/generate", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-mac-generate"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExMacVerify(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, wrappedKey, hashAlgo, data, mac, iv})=>({
                sessionToken, slotId, wrappingKeyId, wrappedKey, hashAlgo, data, mac, 
                ...(iv && { iv }),
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/mac/verify", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-mac-verify"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExSeal(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, wrappedKey, publicKeyOrCert, plaintext})=>({
                sessionToken, slotId, wrappedKey, plaintext,
                ...(publicKeyOrCert && { publicKeyOrCert }),
                ...(wrappingKeyId && { wrappingKeyId }),
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/seal", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-seal"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExUnseal(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, wrappedKey, ciphertext})=>({
                sessionToken, slotId, wrappingKeyId, wrappedKey, ciphertext
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/unseal", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-unseal"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExEncrypt(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, wrappedKey, useSessionKey, publicKeyOrCert, plaintext})=>({
                sessionToken, slotId, plaintext,
                ...(useSessionKey && { useSessionKey }),
                ...(wrappingKeyId && { wrappingKeyId }),
                ...(publicKeyOrCert && { publicKeyOrCert }),
                ...(wrappedKey && { wrappedKey }),
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/encrypt", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-encrypt"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExDecrypt(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, wrappedKey, ciphertext})=>({
                sessionToken, slotId, wrappingKeyId, wrappedKey, ciphertext
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/decrypt", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-decrypt"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExTokenize(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, wrappedKey, plaintext})=>({
                sessionToken, slotId, wrappingKeyId, wrappedKey, plaintext
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/tokenize", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-tokenize"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExDetokenize(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, wrappedKey, ciphertext})=>({
                sessionToken, slotId, wrappingKeyId, wrappedKey, ciphertext
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/detokenize", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-detokenize"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExSign(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, wrappingKeyId, wrappedKey, data})=>({
                sessionToken, slotId, wrappingKeyId, wrappedKey, data
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/sign", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-sign"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExVerify(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, publicKeyOrCert, data, signature})=>({
                sessionToken, slotId, publicKeyOrCert, data, signature
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/external/verify", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "external-verify"
            });         
            if (data.fault) {
                return handlerErrorCustom(res, data);
            }
            return res.status(200).json(data);
        } catch (error) {
            handlerError(res, error)
        }
    }
    static async ExSecretGet(req,res){
        try {
            const token = accesToken(req)
            const payload = (({sessionToken, slotId, secretId})=>({
                sessionToken, slotId, secretId
            }))(req.body)
            const data = await SGKMS.engineApiSGKMS("/v1.0/secret/get", payload)
            await createTranscation(res, {
                userId: token.id,
                status: !data.fault,
                endpoint: "secret-get"
            });         
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
