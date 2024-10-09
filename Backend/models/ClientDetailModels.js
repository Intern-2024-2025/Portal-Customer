const Sequelize = require("sequelize");

const ClientDetail = (sequelizeInstance) =>{
    return sequelizeInstance.define(
        "client_details",
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
                unique: "id",
            },
            fullname:{
                type: Sequelize.STRING,
                allowNull: false,
                validate:{
                    notNull:{
                        args: true,
                        msg: "FullName Can't be Null!",
                    },
                    notEmpty:{
                        args:true,
                        msg:"Fullname Can't be Empty!",
                    }
                }
            },
            phone:{
                type: Sequelize.STRING,
                unique: {
                    args: "phone",
                    msg: "Phone Already Registered!",
                },
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Phone Can't be Null",
                    },
                    notEmpty: {
                        args: true,
                        msg: "Phone Can't be Empty",
                    },
                    isNumeric: {
                        args: true,
                        msg: "Phone Must be Number",
                    },
                    len: {
                        args: [10, 15],
                        msg: "Phone Must be 10 - 15 Number!",
                    },
                },
            },
            address:{
                type: Sequelize.STRING,
                allowNull: false,
                validate:{
                    notNull:{
                        args: true,
                        msg: "Address Can't be Null!",
                    },
                    notEmpty:{
                        args:true,
                        msg:"Address Can't be Empty!",
                    }
                }
            },
            category_business:{
                type: Sequelize.STRING,
                allowNull: false,
                validate:{
                    notNull:{
                        args: true,
                        msg: "Category Business Can't be Null!",
                    },
                    notEmpty:{
                        args:true,
                        msg:"Category Business Can't be Empty!",
                    }
                }
            },
            description_business:{
                type: Sequelize.TEXT,
                allowNull: false,
                validate:{
                    notNull:{
                        args: true,
                        msg: "Desription Business Can't be Null!",
                    },
                    notEmpty:{
                        args:true,
                        msg:"Desription Business Can't be Empty!",
                    }
                }
            },
            image:{
                type: Sequelize.TEXT("long"),
                allowNull: false,
                validate:{
                    notNull:{
                        args: true,
                        msg: "Image Can't be Null!",
                    },
                    notEmpty:{
                        args:true,
                        msg:"Image Can't be Empty!",
                    }
                }
            },
        }
    )
};
module.exports = ClientDetail;