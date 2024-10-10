const { where } = require("sequelize");
const { accesToken } = require("../helper/chekAccessToken.js");
const { handlerError, handleCreate, handleUpdate, handleGet, handleDelete } = require("../helper/HandlerError.js");
const Models = require("../models/index.js");
const ClientDetail = Models.ClientDetail;

class ClientDetailController {
  static async CreateClientDetail(req, res) {
    try {
      const token = accesToken(req)
      const { fullname, phone, address, category_business, description_business, image } = req.body;
      await ClientDetail.create({
        fullname,
        phone,
        address,
        category_business,
        description_business,
        image,
        clientId: token.id
      });
      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  
  static async UpdateClientDetail(req, res) {
    try {
        
        const { id } = req.body;  
        const { fullname, phone, address, category_business, description_business, image } = req.body;

        const [updated] = await ClientDetail.update(
            {
                fullname: fullname,
                phone: phone,
                address: address,
                category_business: category_business,
                description_business: description_business,
                image: image
            },
            { where: {id} } 
        );
        if (updated) {
          handleUpdate(res);  
      } else {
          res.status(404).json({ message: "ClientDetail not found" });  
      }
    } catch (error) {
      handlerError(res, error); 
    }
}

  
  static async GetAllClientDetails(req, res) {
      try {
          const clientDetails = await ClientDetail.findAll(); 
          handleGet(res, clientDetails);  
        } catch (error) {
            handlerError(res, error);
        }
    }
    
    static async DeleteClientDetail(req, res) {
        try {
            // const { id } = req.params; 
            const { id } = req.body; 
            // const deleted = await ClientDetail.destroy({ where: { id: id } });  
            
            await ClientDetail.destroy({
              where: {id},
            }).then(deleted=>{
              handleDelete(res ,deleted)
            })
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = ClientDetailController;

//   static async DetailClientDetail(req, res) {
//     try {
//       const { id } = req.params; 
//       const clientDetail = await ClientDetail.findOne({ where: { id: id } });  

//       if (clientDetail) {
//         handleDetail(res, clientDetail);  
//       } else {
//         res.status(404).json({ message: "ClientDetail not found" });
//       }
//     } catch (error) {
//       handlerError(res, error);
//     }
//   }
