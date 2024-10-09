const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
const ContactController = require("../controllers/ContactController.js");

router.post("/login", AuthController.Login);
// router.post("/logout", verifyToken, AuthController.Logout);
// router.get("/fetch", verifyToken, AuthController.Fetch);

router.post("/register", AuthController.registerClient)
router.post("/verification-email", AuthController.verificationEmail)
router.post("/contact", ContactController.CreateContact)

module.exports = router;
 