const {
  handlerError,
  handleCreate,
  handleRead,
  handleUpdate,
  handleDelete,
  handleGet,
} = require("../helper/HandlerError.js");
const Models = require("../models/index.js");
const Product = Models.Products;
const { accesToken } = require("../helper/chekAccessToken.js");
  
class ProductController {
  static async createProduct(req, res) {
    try {
      const {
        name,
        csrKey,
        postmanPem,
        slotId,
        password,
        count_trial,
        clientId,
        keyId,
      } = req.body;
      await Product.create({
        name,
        csr_key: csrKey,
        postman_pem: postmanPem,
        slot_id: slotId,
        password,
        status: true,
        call_api: 0,
        count_trial: count_trial || 100,
        clientId,
        key_id: JSON.stringify(keyId),
      });
      await Models.Client.update(
        { status_verification_data: "verifed" },
        { where: { id: clientId } }
      );
      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }

  static async GetAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      handleRead(res, products);
    } catch (error) {
      handlerError(res, error);
    }
  }

  static async getDetailProductById(req, res) {
    try {
      await Product.findOne({ where: { clientId: req.params.id } }).then(
        (data) => {
          handleGet(res, data);
        }
      );
    } catch (error) {
      handlerError(res, error);
    }
  }

  static async UpdateProduct(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        csr_key,
        postman_pem,
        slot_id,
        password,
        keyId: key_id,
      } = req.body;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.update(
        {
          name,
          csr_key,
          postman_pem,
          slot_id,
          password,
          key_id,
        },
        {
          where: {
            id,
          },
        }
      );
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
        return res.status(404).json({ message: "Product not found" });
      }

      await product.destroy();
      handleDelete(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getDetailProductByClient(req, res) {
    try {
      const token = accesToken(req);
      await Product.findOne({
        where: { clientId: token.id },
        include: [{ model: Models.Transaction }],
      }).then((data) => {
        // if (data) {
        //   data.dataValues.csr_key = `${data.dataValues.csr_key.slice(0, 30)}...`;
        //   data.dataValues.postman_pem = `${data.dataValues.postman_pem.slice(0, 30)}...`;
        // }
        // const dataProduct = data.map(result=>{
        //   return{
        //     ...result.dataValues,
        //     csr_key : `${result.dataValues.csr_key.slice(0, 30)}...`,
        //     postman_pem :  `${result.dataValues.postman_pem.slice(0, 30)}...`
        //   }
        // })
        // console.log(data)
        const { transactions, ...save } = data.dataValues;
        handleGet(res, {
          ...save,
          call_api: transactions.length,
          keyId: JSON.parse(data.dataValues.key_id),
        });
      });
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getTransaction(req, res) {
    try {
      const token = accesToken(req);
      await Product.findOne({
        where: { clientId: token.id },
        attributes: ["call_api", "count_trial"],
      }).then((data) => {
        handleGet(res, data);
      });
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = ProductController;
