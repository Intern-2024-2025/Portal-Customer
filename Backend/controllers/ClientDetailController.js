const {
  handlerError,
  handleCreate,
  handleGet,
  handleUpdate,
  handleDelete
} = require("../helper/HandlerError.js");
const Models = require("../models/index.js");
const ClientDetail = Models.ClientDetail;
const { accesToken } = require("../helper/chekAccessToken.js");

class ClientDetailController {
  static async createClientDetail(req, res) {
    try {
      const token = accesToken(req);
      const {
        fullname,
        phone,
        address,
        category_business,
        description_business,
        image,
      } = req.body;

      const [data, created] = await ClientDetail.findOrCreate({
        where: { clientId: token.id },
        defaults: {
          fullname,
          phone,
          address,
          category_business,
          description_business,
          image,
          clientId: token.id,
        },
      });

      if (created) {
        handleCreate(res);
      } else {
        handleGet(res, data);
      }
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getClientDetailById(req, res) {
    try {
      const token = accesToken(req);
      await ClientDetail.findOne({
        where: { clientId: token.id },
        include: { model: Models.Client },
      }).then((data) => {
        handleGet(res, data);
      });
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getClientDetailByIdAdmin(req, res) {
    try {
      await ClientDetail.findOne({
        where: { clientId: req.params.id },
        include: { model: Models.Client },
      }).then((data) => {
        handleGet(res, data);
      });
    } catch (error) {
      handlerError(res, error);
    }
  }
   
  static async UpdateClientDetail(req, res) {
    try {
        const { id } = req.params;
        const { fullname, phone, address, category_business, description_business, image } = req.body;
        
        console.log(id);

        const updated = await ClientDetail.update(
            {
                fullname,
                phone,
                address,
                category_business,
                description_business,
                image
            },
            { where: { id } }
        );

        if (updated) {
            handleUpdate(res, updated);
        } else {
            res.status(404).json({ message: "ClientDetail not found" });
        }
    } catch (error) {
        console.error("Error updating client detail:", error);
        handlerError(res, error);
    }
 }
 
 static async DeleteClientDetail(req, res) {
  try {
    const { id } = req.params;  
    const deleted = await ClientDetail.destroy({ where: {id} });  

    if (deleted) {
      handleDelete(res, deleted)
    } else {
      res.status(404).json({ message: "ClientDetail not found" });
    }
  } catch (error) {
    handlerError(res, error);  
  }
}
}

module.exports = ClientDetailController;
