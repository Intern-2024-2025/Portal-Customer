const { handlerError, handleCreate, handleRead, handleUpdate, handleDelete } = require("../helper/HandlerError.js");
const Models = require("../models/index.js");
const Client = Models.Client;

class ClientController {

    static async CreateClient(req, res) {
        try {
            const { username, email, password, otp} = req.body;
            await Client.create({
                username,
                email,
                otp,
                password,
            });
            handleCreate(res);
        } catch (error) {
            handlerError(res, error);
        }
    }
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
            const Client = await Client.findByPk(id);

            if (!Client) {
                return res.status(404).json({ message: 'Client not found' });
            }

            await Client.update({
                username, 
                email, 
                password, 
                otp
            });
            handleUpdate(res);
        } catch (error) {
            handlerError(res, error);
        }
    }


    static async DeleteClient(req, res) {
        try {
            const { id } = req.params;
            const Client = await Client.findByPk(id);

            if (!Client) {
                return res.status(404).json({ message: 'Client not found' });
            }

            await Client.destroy();
            handleDelete(res);
        } catch (error) {
            handlerError(res, error);
        }
    }
}
module.exports = ClientController;