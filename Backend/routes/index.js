const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
const ContactController = require("../controllers/ContactController.js");
const ClientDetailController = require("../controllers/ClientDetailController.js");

router.post("/login", AuthController.Login);
// router.post("/logout", verifyToken, AuthController.Logout);
// router.get("/fetch", verifyToken, AuthController.Fetch);

router.post("/register", AuthController.registerClient)
router.post("/verification-email", AuthController.verificationEmail)
router.post("/contact", ContactController.CreateContact)
router.post("/reset-password", AuthController.ResetPassword);
router.post("/new-password/:token", AuthController.newPassword);

router.post("/create-clientdet", verifyToken, ClientDetailController.CreateClientDetail)
router.post("/update-clientdet", ClientDetailController.UpdateClientDetail)
router.post("/delete-clientdet", ClientDetailController.DeleteClientDetail)
module.exports = router;
 