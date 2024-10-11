const {
  handlerError,
  handleCreate,
  handleGet,
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
}

module.exports = ClientDetailController;
