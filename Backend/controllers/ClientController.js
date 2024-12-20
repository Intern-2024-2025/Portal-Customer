const { handlerError, handleCreate, handleUpdate, handleDelete, handleGet } = require("../helper/HandlerError.js");
const { paginator } = require("../helper/Pagination.js");
const Models = require("../models/index.js");
const Client = Models.Client;
const { Sequelize, Op } = require("sequelize");

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
            const data = await Client.findAll();
            handleGet(res, data);
        } catch (error) {
            handlerError(res, error);
        }
    }
    static async GetAllClientSubmisson(req, res) {
        try {
            const {currentPage, status, search} = req.query
            let data = await Models.ClientDetail.findAll({
                include: {
                    model: Client,
                    where: {
                        status_verification_data: status || "process",
                        [Op.and]: [
                            {
                            [Op.or]: [
                                Sequelize.where(Sequelize.fn("lower", Sequelize.col(`username`)), {
                                [Op.like]: `%${search.toLowerCase().replace("%20", " ")}%`,
                                }),
                                Sequelize.where(Sequelize.fn("lower", Sequelize.col(`email`)), {
                                [Op.like]: `%${search.toLowerCase().replace("%20", " ")}%`,
                                }),
                            ],
                            },
                        ],
                    }
                }
            })
            const pagination = paginator(data, currentPage || 1, 10)
            handleGet(res, {
                pagination: {
                    currentPages: pagination.currentPages,
                    totalPages: pagination.totalPages
                },
                data: pagination.data
            });
        } catch (error) {
            handlerError(res, error);
        }
    }

    static async GetClientById(req, res) {
        try {
            const { id } = req.params;
            const dataClient = await Client.findByPk(id);
            if (!dataClient) {
                return res.status(404).json({ message: 'Client not found' });
            }
            handleGet(res, dataClient);
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
            const deleted = await Client.destroy({ where: {id} });  
        
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
module.exports = ClientController;