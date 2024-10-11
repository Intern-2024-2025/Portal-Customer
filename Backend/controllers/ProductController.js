const { handlerError, handleCreate, handleRead, handleUpdate, handleDelete } = require("../helper/HandlerError.js");
const Models = require("../models/index.js");
const Products = Models.Products;

class ProductController {

    static async CreateProduct(req, res) {
        try {
            const { name, csr_key, postman_pem, slot_id, password, finance_key } = req.body;
            await Products.create({
                name,
                csr_key,
                postman_pem,
                slot_id,
                password,
                finance_key
            });
            handleCreate(res);
        } catch (error) {
            handlerError(res, error);
        }
    }


    static async GetAllProducts(req, res) {
        try {
            const products = await Products.findAll();
            handleRead(res, products);
        } catch (error) {
            handlerError(res, error);
        }
    }

    static async GetProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await Products.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            handleRead(res, product);
        } catch (error) {
            handlerError(res, error);
        }
    }

    static async UpdateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, csr_key, postman_pem, slot_id, password, finance_key } = req.body;
            const product = await Products.findByPk(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            await product.update({
                name,
                csr_key,
                postman_pem,
                slot_id,
                password,
                finance_key
            },{
                where:{
                    name : "coba12",
                    csr_key: "halolur@gmail.com",
                    postman_pem:"",
                    slot_id:"",
                    password: "tes321!Agak",
                    finance_key:"",
                }
            });
            handleUpdate(res);
        } catch (error) {
            handlerError(res, error);
        }
    }


    static async DeleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Products.findByPk(id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            await product.destroy();
            handleDelete(res);
        } catch (error) {
            handlerError(res, error);
        }
    }
}

module.exports = ProductController;
