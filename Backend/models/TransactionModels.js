const sequelize = require("sequelize");

const Transaction = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "transactions",
    {
      id: {
        type: sequelize.UUID,
        defualtValue: sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      endpoint: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Endpoint Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Endpoint Can't be Empty!",
          },
        },
      },
      status: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Status Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Status Can't be Empty!",
          },
        },
      },
      create: {
        type: sequelize.DATE,
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
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true,
    }
  );
};
module.exports = Transaction;
