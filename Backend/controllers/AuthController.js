const Models = require("../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendEmail.js");

const {
  handlerError,
  handleCreate,
  handleGet,
  handleUpdate,
  handleDelete,
  handleCreateCustom,
} = require("../helper/HandlerError.js");

const User = Models.User;

class AuthController {
  static async Login(req, res) {
    try {
      const user = await User.scope("visiblePassword").findOne({
        where: { username: req.body.username },
      });
      if (!user)
        return res.status(400).json({ msg: "username tidak ditemukan" });
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return res.status(400).json({ msg: "password anda salah" });
      const accessToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "5760m",
        }
      );
      res.status(200).json({
        accessToken: accessToken,
        role: user.role.name,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // static async Fetch(req, res) {
  //   try {
  //     const authHeader = req.headers["authorization"];
  //     const token = authHeader && authHeader.split(" ")[1];

  //     const user = jwt.verify(
  //       token,
  //       process.env.REFRESH_TOKEN_SECRET,
  //       (error, decoded) => {
  //         if (error) return res.sendStatus(403);
  //         return decoded;
  //       }
  //     );
  //     const fetch = await User.findOne({
  //       where: { id: user.id },
  //       attributes: ["username"],
  //     }).then((data) => {
  //       return {
  //         username: data.username,
  //         role: user.role,
  //       };
  //     });
  //     return res.status(200).json(fetch);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: error.message,
  //     });
  //   }
  // }

  static async registerClient(req, res) {
    try {
      const { username, email, password } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000);
      
      await Models.User.create({
        username,
        email,
        password,
        otp,
        status_verification: false,
      });

      sendMail(email, "Kode OTP Register Sandhiguna", `Kode OTP Anda adalah: ${codeOtp}`);
      handleCreateCustom(res, "Kami sudah kirim OTP di Email Anda");
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async verificationEmail(req, res) {
    try {
      const chekOtp = await User.findOne({
        where: {
          otp: req.body.otp
        }
      })

      if(!chekOtp){
        return res.status(400).json({ msg: "OTP anda Salah!" });
      }
      
      handleCreateCustom(res, "OTP Anda terverifikasi");
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
