const sequelize = require("sequelize");

const Blog = (sequelizeInstance) =>{
    return sequelizeInstance.define(
        "blogs",
        {
            id:{
                type: sequelize.UUID,
                defualtValue: sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
                unique:"id",
            },
            title:{
                type: sequelize.STRING,
                allowNull: false,
                validate: {
                  notNull: {
                    args: true,
                    msg: "Title Can't be Null!",
                  },
                  notEmpty: {
                    args: true,
                    msg: "Title Can't be Empty!",
                  },
                },
            },
            slug:{
                type: sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                      args: true,
                      msg: "Title Can't be Null!",
                    },
                    notEmpty: {
                      args: true,
                      msg: "Title Can't be Empty!",
                    },
                },
            },
            content:{
                type: sequelize.TEXT("long"),
                allowNull: false,
                validate: {
                  notNull: {
                    args: true,
                    msg: "Content Can't be Null!",
                  },
                  notEmpty: {
                    args: true,
                    msg: "Content Can't be Empty!",
                  },
                },
            }
        }
    )
}
module.exports = Blog