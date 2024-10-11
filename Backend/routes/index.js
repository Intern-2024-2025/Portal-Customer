const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
const ContactController = require("../controllers/ContactController.js");
const ProductController = require("../controllers/ProductController.js")
const ClientController = require("../controllers/ClientController.js")

router.post("/login", AuthController.Login);
// router.post("/logout", verifyToken, AuthController.Logout);
// router.get("/fetch", verifyToken, AuthController.Fetch);

router.post("/register", AuthController.registerClient)
router.post("/verification-email", AuthController.verificationEmail)
router.post("/contact", ContactController.CreateContact)
router.post("/reset-password", AuthController.ResetPassword);
router.post("/new-password/:token", AuthController.newPassword);
router.post("/create-product", ProductController.CreateProduct);
router.get("/products",ProductController.GetAllProducts);
router.get("/products/:id",ProductController.GetProductById);
router.put("/products/:id",ProductController.UpdateProduct);
router.delete("/products/:id",ProductController.DeleteProduct);
router.get('/clients', ClientController.GetAllClient);
router.get('/clients/:id', ClientController.GetClientById);
router.put('/clients/:id', ClientController.UpdateClient);
router.delete('/clients/:id', ClientController.DeleteClient);

module.exports = router;
 