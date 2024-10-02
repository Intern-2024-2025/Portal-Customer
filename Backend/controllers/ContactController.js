const { handlerError, handleCreate } = require("../helper/HandlerError.js");
const Models = require("../models/index.js");
const Contact = Models.Contact;

class ContactController {
  static async CreateContact(req, res) {
    try {
      const { firstName, lastName, emailAddress, message } = req.body;
      await Contact.create({
        firstName,
        lastName,
        emailAddress,
        message,
      });
      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = ContactController;
