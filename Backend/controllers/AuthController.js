const Models = require("../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendEmail.js");
const { Op } = require("sequelize");

const {
  handlerError,
  handleCreate,
  handleGet,
  handleUpdate,
  handleDelete,
  handleCreateCustom,
  handlerErrorCustom,
} = require("../helper/HandlerError.js");

const User = Models.User;
const { accesToken } = require("../helper/chekAccessToken.js");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
  const failedAttempts = new Map();

class AuthController {
  static async Login(req, res) {
    try {
      const { username, password} = req.body
      const userAdmin = await User.scope("visiblePassword").findOne({
        where: { username },
      });

      const userClient = await Models.Client.scope("visiblePassword").findOne({
        where: {
          [Op.or]: [
            { username},
            { email: req.body.username },
          ],
        },
      });
      let user;
      if (userAdmin) {
        user = userAdmin;
      } else if(userClient){
        user = userClient;
        user.dataValues.role = "client"
        if(user.dataValues.status_verification_email != true){
          return res.status(400).json({ code:400, message: "Account not found. Please check your username or email." });
        }
      }
      if (!user) return res.status(400).json({ code:400, message: "Account not found. Please check your username or email." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!failedAttempts.has(username)) {
        failedAttempts.set(username, { count: 0, lockUntil: null });
      } 
      console.log(failedAttempts);

      const attempts = failedAttempts.get(username);

      if (!isMatch) {
          attempts.count += 1;
          if (attempts.count >= 3) {
              if (!attempts.lockUntil) {
                  attempts.lockUntil = Date.now() + 5 * 60 * 1000;
                  setTimeout(() => failedAttempts.delete(username), 5 * 60 * 1000);
              }
              return res.status(400).json({
                  code: 400,
                  message: attempts.count === 3 
                      ? "Too many failed login attempts. Please try again in 5 minutes."
                      : "Your account is temporarily locked. Please try again later.",
                      lockUntil: Math.floor(attempts.lockUntil / 1000)
              });
          }

          return res.status(400).json({ code: 400, message: "Incorrect email or password. Please try again." });
      }

      // const attempts = failedAttempts.get(username);
      // if(!isMatch){
      //   attempts.count += 1;
      //   if(attempts.count == 3 && !isMatch){
      //     const lockUntil = Date.now() + 5 * 60 * 1000;
      //     attempts.lockUntil = lockUntil
      //     setTimeout(() => {
      //         failedAttempts.delete(username)
      //       }, 5 * 60 * 1000); 
      //     return res.status(429).json({
      //       message: "sudah tiga kali email atau username dan password tidak match",
      //       lockUntil: lockUntil,
      //     });
      //   }else if (attempts.count >= 3  && !isMatch){  
      //     return res.status(429).json({
      //       message: "gagal lebih tiga kali email atau username dan password tidak match",
      //       lockUntil: attempts.lockUntil,
      //     });
      //   }
      //   return res.status(429).json({
      //     message: "email atau username dan password tidak match"
      //   });
      // }


      const accessToken = jwt.sign(
        {
          id: user.id,
          role: user.dataValues.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "5678m",
        }
      );
      res.status(200).json({
        accessToken: accessToken,
        role: user.dataValues.role,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  static async ResetPassword(req, res) {
    try {
      const client = await Models.Client.scope("visiblePassword").findOne({
        where: { email: req.body.email },
      });
      if (!client)
        return res.status(400).json({ msg: "email tidak ditemukan" });
      
      const otp = Math.floor(100000 + Math.random() * 900000);

      await Models.Client.update({otp},{
        where: {id: client.id}
      })

      sendMail(
        req.body.email,
        "Reset Password Sandhiguna",
        `Your One-Time Password (OTP) is: ${otp}`
      );

      handleGet(res, {
        data: {
          status: `success`,
        },
      });
    } catch (error) {
      handlerError(res, error);
    }
  }

  static async Fetch(req, res) {
    try {
      const token = accesToken(req)
      let user
      if(token.role != 'client'){
        await User.findOne({
          where: {
            id: token.id
          }
        }).then(data =>{
          user = {
            username: data.username
          }
        })
      }else{
        await Models.Client.findOne({
          where: {
            id: token.id
          }
        }).then(data=>{
          // console.log("data", data)
          user ={
            username : data.username,
            verificationData: data.status_verification_data
          }
        })
      }
      handleGet(res, user)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async registerClient(req, res) {
    try {
      const { username, email, password } = req.body;
      
      const otp = Math.floor(100000 + Math.random() * 900000);

      await Models.Client.create({
        username,
        email,
        password,
        otp,
      });

      sendMail(
        email,
        "Kode OTP Register Sandhiguna",
        `Your One-Time Password (OTP) is: ${otp}`
      );
      handleCreateCustom(res, "Kami sudah kirim OTP di Email Anda");
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async verificationEmail(req, res) {
    try {
      const {otp, email} = req.body
      const chekOtp = await Models.Client.findOne({
        where: { [Op.and]: [{ otp }, { email}] },
      });
      if (!chekOtp) {
        return res.status(400).json({ msg: "OTP anda Salah!" });
      }
      await Models.Client.update(
        { status_verification_email: true },
        { where: { otp, email} }
      ).then((data) => {
        handleUpdate(res, data);
      });
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async newPassword(req, res) {
    try {
      const { email, otp, newPassword} = req.body
      await Models.Client.update(
        { password: hashPassword(newPassword) },
        { where: {[Op.and]: [{ email }, { otp }] } }
      ).then((data) => {
        handleUpdate(res, data);
      });
    } catch (error) {
      handlerError(res, error);
    }
  }
  // static async getUser(req, res) {
  //   try {
  //     await Models.User.findAll().then((data) => {
  //       return handleGet(res, data);
  //     });
  //   } catch (error) {
  //     handlerError(res, error);
  //   }
  // }
  // static async getUserById(req, res) {
  //   try {
  //     await Models.User.findOne({
  //       where: {
  //         id: req.params.id,
  //       },
  //     }).then((data) => {
  //       return handleGet(res, data);
  //     });
  //   } catch (error) {
  //     handlerError(res, error);
  //   }
  // }
  // static async updateUser(req, res) {
  //   try {
  //     const { fullname, username, password, phone, email, role } = req.body;
  //     await Models.User.update(
  //       {
  //         fullname,
  //         username,
  //         password,
  //         phone,
  //         email,
  //         role,
  //       },
  //       {
  //         where: {
  //           id: req.params.id,
  //         },
  //       }
  //     ).then((result) => {
  //       handleUpdate(res, result);
  //     });
  //   } catch (error) {
  //     handlerError(res, error);
  //   }
  // }

  // static async deleteUser(req, res) {
  //   try {
  //     await User.findOne({
  //       where: { role: "admin" },
  //     }).then((result) => {
  //       if (req.params.id == result.id) {
  //         return handlerError(res, { message: "Please chek Role!" });
  //       }
  //     });
  //     await User.destroy({
  //       where: {
  //         id: req.params.id,
  //       },
  //     }).then((result) => {
  //       handleDelete(res, result);
  //     });
  //   } catch (error) {
  //     handlerError(res, error);
  //   }
  // }
  // static async Logout(req, res) {
  //   try {
  //     const authHeader = req.headers["authorization"];
  //     const token = authHeader && authHeader.split(" ")[1];

  //     jwt.verify(
  //       token,
  //       process.env.REFRESH_TOKEN_SECRET,
  //       async (error, decoded) => {
  //         if (error) return res.sendStatus(403);
  //         res.clearCookie("refreshToken");
  //         return res.status(200).json({ msg: "Berhasil Logout" });
  //       }
  //     );
  //   } catch (error) {
  //     res.status(500).json({
  //       message: error.message,
  //     });
  //   }
  // }
}

module.exports = AuthController;
