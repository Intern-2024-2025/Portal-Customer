const Sequelize = require("sequelize");

const Product = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "products",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Name can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Name can't be Empty!",
          },
        },
      },
      csr_key: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "CSR Key can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "CSR Key can't be Empty!",
          },
        },
      },
      postman_pem: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Postman can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Postman can't be Empty!",
          },
        },
      },
      key_id: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Key Id can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Key Id can't be Empty!",
          },
        },
      },
      slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Slot ID can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Slot ID can't be Empty!",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Password Can't be Empty!",
          },
        },
      },
      status: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      call_api: {
        type: Sequelize.INTEGER,
        default: null,
      },
      count_trial: {
        type: Sequelize.INTEGER,
        default: null,
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true,
    }
  );
};
module.exports = Product;
