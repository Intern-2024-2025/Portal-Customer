const { where } = require("sequelize");
const { handlerError, handleCreate, handleRead, handleUpdate, handleDelete } = require("../helper/HandlerError.js");
const Models = require("../models/index.js");
const Client = Models.Client;

class ClientController {

    
    static async GetAllClient(req, res) {
        try {
            const Client = await Client.findAll();
            handleRead(res, Client);
        } catch (error) {
            handlerError(res, error);
        }
    }

    static async GetClientById(req, res) {
        try {
            const { id } = req.params;
            const Client = await Client.findByPk(id);
            if (!Client) {
                return res.status(404).json({ message: 'Client not found' });
            }
            handleRead(res, Client);
        } catch (error) {
            handlerError(res, error);
        }
    }

    static async UpdateClient(req, res) {
        try {
            const { id } = req.params;
            const { username, email, password, otp } = req.body;
            const ChckClient = await Client.findByPk(id);

            if (!ChckClient) {
                return res.status(404).json({ message: 'Client not found' });
            }

            await Client.update({
                username, 
                email, 
                password, 
                otp
            },{
                where:{
                    username: "coba12",
                    email: "halolur@gmail.com",
                    password: "tes321!Agak",
                    otp: "7654321",
                }
            });
            handleUpdate(res);
        } catch (error) {
            handlerError(res, error);
        }
    }


    static async DeleteClient(req, res) {
        try {
            const { id } = req.params;
            const chekClient = await Client.findByPk(id);

            if (!chekClient) {
                return res.status(404).json({ message: 'Client not found' });
            }

            const deleted = await Client.destroy({where: {id :id}});
            handleDelete(res, deleted);
        } catch (error) {
            handlerError(res, error);
        }
    }
}
module.exports = ClientController;