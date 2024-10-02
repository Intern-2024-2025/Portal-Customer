const Sequelize = require("sequelize");

const ContactUs = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "contact",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "First Name Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "First Name Can't be Empty!",
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Last Name Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Last Name Can't be Empty!",
          },
        },
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: "emailAddress",
          msg: "Email Address Already Send Message, Please Waiting Admin Contact You!",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Email Address Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Email Address Can't be Empty!",
          },
          isEmail: {
            args: true,
            msg: "Invalid Email Address!",
          },
        },
      },
      message: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Message Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Message Can't be Empty!",
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

module.exports = ContactUs;
