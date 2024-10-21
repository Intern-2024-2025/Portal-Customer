const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

const Client = (sequelizeInstance) =>{
    return sequelizeInstance.define(
      "clients",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
          unique: "id",
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            args: "username",
            msg: "Username Already Registered!",
          },
          validate: {
            notNull: {
              args: true,
              msg: "Username can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Username can't be Empty!",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            args: "email",
            msg: "Email Already Registered!",
          },
          validate: {
            notNull: {
              args: true,
              msg: "Email can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Email can't be Empty!",
            },
            isEmail: {
              args: true,
              msg: "Invalid Email",
            },
          },
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "password Can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "Password Can't be Empty!",
            },
            validatePassword: function (password) {
              if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                  password
                )
              ) {
                throw new Error(
                  "The password must contain at least 8 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
                );
              }
            },
          },
        },
        otp: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "OTP Can't be Null!",
            },
            notEmpty: {
              args: true,
              msg: "OTP Can't be Empty!",
            },
          },
        },
        status_verification_email: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        status_verification_data: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        freezeTableName: true,
        paranoid: true,
        underscored: true,
        //don't show password
        defaultScope: {
          attributes: {
            exclude: ["password"],
          },
        },
        //do show password with visible password
        scopes: {
          visiblePassword: {
            attributes: {
              include: ["password"],
            },
          },
        },
        hooks: {
          beforeCreate: (admin, opt) => {
            const hashedPassword = hashPassword(admin.password);
            admin.password = hashedPassword;
          },
        },
      }
    );
};
module.exports = Client;