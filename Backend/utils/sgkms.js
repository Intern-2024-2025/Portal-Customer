require("dotenv").config();
const axios = require("axios");
const https = require("https");
const fs = require("fs");
const path = require("path");

const clientCertPath = path.resolve(__dirname, "./sertifikat/postman.pem");
const clientKeyPath = path.resolve(__dirname, "./sertifikat/csrprivatekey.key");

const clientCert = fs.readFileSync(clientCertPath);
const clientKey = fs.readFileSync(clientKeyPath);

const axiosInstance = axios.create({
  baseURL: process.env.URL_SGKMS,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: new https.Agent({
    cert: clientCert,
    key: clientKey,
    rejectUnauthorized: false,
  }),
});

class SGKMS {
  static async sendLogin(slotId, password) {
    try {
      const response = await axiosInstance.post("/v1.0/agent/login", {
        slotId,
        password
      });
    //   console.log(response, "login")
      return response.data;
    } catch (err) {
      console.log(err)
      // console.error("error login:", err.response.data);
      return err.response.data;
    }
  }

  static async encryptData(sessionToken, slotId, keyId, plaintext) {
    try {
      const response = await axiosInstance.post("/v1.0/encrypt", {
        sessionToken,
        slotId,
        keyId,
        plaintext,
      });
      return response.data;
    } catch (err) {
      console.error("error Encrypt:", err.response.data);
      return err.response.data;
    }
  }

  static async decryptData(sessionToken, slotId, keyId, keyVersion, ciphertext) {
    try {
      const response = await axiosInstance.post("/v1.0/decrypt", {
        sessionToken,
        slotId,
        keyId,
        keyVersion,
        ciphertext,
      });
      // console.log("response", response)
      return response.data;
    } catch (err) {
      console.error("error Decrypt:", err.response.data);
      return err.response.data;
    }
  }

  //seal wity syncmetric (publickey and privatekey)
  static async seal(sessionToken, plaintext) {
    const response = await axiosInstance.post("/v1.0/seal", {
      sessionToken: sessionToken,
      slotId: parseInt(process.env.SLOT_ID),
      keyId: process.env.KEY_ID,
      plaintext: plaintext,
    });
    // console.log(sessionToken);
    return response.data;
  }

  //unseal wity syncmetric (publickey and privatekey)
  static async unseal(sessionToken, ciphertext) {
    const response = await axiosInstance.post("/v1.0/unseal", {
      sessionToken: sessionToken,
      slotId: parseInt(process.env.SLOT_ID),
      ciphertext: ciphertext,
    });
    // console.log(ciphertext);
    return response.data;
  }

  static async refreshSession(sessionToken) {
    try {
      const payload = {
        slotId: parseInt(process.env.SLOT_ID),
        sessionToken: sessionToken,
      };

      const response = await axiosInstance.post(
        "/agent/refreshSession",
        payload
      );

      return response.result;
    } catch (error) {
      console.error("Kesalahan login:", err);
    }
  }

  static async getSecret(sessionToken, secretId) {
    const payload = {
      sessionToken,
      slotId: 1,
      secretId,
    };

    const response = await axiosInstance.post("/secret/get", payload);
    return response.result;
  }
}

module.exports = SGKMS;