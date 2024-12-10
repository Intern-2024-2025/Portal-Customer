const router = require("express").Router();
const verifyToken = require("../middlewares/VerifyToken");
const AuthController = require("../controllers/AuthController.js");
const ContactController = require("../controllers/ContactController.js");
const ProductController = require("../controllers/ProductController.js")
const ClientController = require("../controllers/ClientController.js")
const ClientDetailController = require("../controllers/ClientDetailController.js");
const { IsAdmin, IsClinet } = require("../middlewares/chekRole.js");
const TransactionController = require("../controllers/TransactionController.js");
const ExampleApp = require("../controllers/ExampleAppController.js");

//Authentication
router.post("/login", AuthController.Login);
// router.post("/logout", verifyToken, AuthController.Logout);
router.get("/fetch", verifyToken, AuthController.Fetch);
router.post("/register", AuthController.registerClient)
router.post("/verification-email", AuthController.verificationEmail)
router.post("/reset-password", AuthController.ResetPassword);
router.post("/new-password", AuthController.newPassword);

router.post("/contact", ContactController.CreateContact)

//Client
router.get("/clients", verifyToken, IsAdmin, ClientController.GetAllClient);
router.get("/client-submisson", verifyToken, IsAdmin, ClientController.GetAllClientSubmisson);
router.get("/clients/:id", verifyToken, ClientController.GetClientById);
router.put("/clients/:id", verifyToken, ClientController.UpdateClient);
router.delete("/clients/:id", verifyToken, ClientController.DeleteClient);

//verification Data Business
router.post("/verification-data", verifyToken, IsClinet, ClientDetailController.createClientDetail);
router.get("/client-detail", verifyToken, ClientDetailController.getClientDetailById);
router.put("/client-detail/:id", verifyToken, ClientDetailController.UpdateClientDetail);
router.delete("/client-detail/:id", verifyToken, ClientDetailController.DeleteClientDetail);
router.get("/client-detail/:id", verifyToken, IsAdmin, ClientDetailController.getClientDetailByIdAdmin);

//Verification Admin Produk
router.post("/product", verifyToken, IsAdmin, ProductController.createProduct);
router.get("/product/:id", verifyToken, ProductController.getDetailProductById);
router.get("/product", verifyToken, ProductController.getDetailProductByClient);
router.get("/products", verifyToken, IsAdmin, ProductController.GetAllProducts);
router.put("/products/:id", verifyToken, IsAdmin, ProductController.UpdateProduct);
router.delete("/products/:id", verifyToken, IsAdmin, ProductController.DeleteProduct);

//Transaction
// router.get("/transaction", verifyToken, IsClinet, ProductController.getTransaction);
router.get("/transaction", verifyToken, IsClinet, TransactionController.getTransactionByClient)
router.get("/transaction-admin", verifyToken, IsAdmin, TransactionController.getTransactionByAdmin)
router.get("/transaction-detail-admin/:productId", verifyToken, IsAdmin, TransactionController.getTransactionByClientAdmin)

//SGKMS
router.post("/v1.0/agent/login", verifyToken, ExampleApp.LoginSGKMS)
router.post("/v1.0/agent/refreshSession", verifyToken, ExampleApp.RefreshSession)
router.post("/v1.0/rng", verifyToken, ExampleApp.RandomNumber)
router.post("/v1.0/mac/generate", verifyToken, ExampleApp.GenareteMAC)
router.post("/v1.0/mac/verify", verifyToken, ExampleApp.VerifyMAC)
router.post("/v1.0/seal", verifyToken, ExampleApp.Seal)
router.post("/v1.0/unseal", verifyToken, ExampleApp.Unseal)
router.post("/v1.0/encrypt", verifyToken, ExampleApp.EncryptSGKMS)
router.post("/v1.0/decrypt", verifyToken, ExampleApp.DescryptSGKMS)
router.post("/v1.0/tokenize", verifyToken, ExampleApp.Tokenize)
router.post("/v1.0/detokenize", verifyToken, ExampleApp.Detokenize)
router.post("/v1.0/sign", verifyToken, ExampleApp.Sign)
router.post("/v1.0/verify", verifyToken, ExampleApp.VerifySign)
router.post("/v1.0/key/info", verifyToken, ExampleApp.KeyInfo)
router.post("/v1.0/external/key/generate", verifyToken, ExampleApp.ExKeyGenerate)
router.post("/v1.0/external/keypair/generate", verifyToken, ExampleApp.ExKeyPairGenerate)
router.post("/v1.0/external/mac/generate", verifyToken, ExampleApp.ExMacGenerate)
router.post("/v1.0/external/mac/verify", verifyToken, ExampleApp.ExMacVerify)
router.post("/v1.0/external/seal", verifyToken, ExampleApp.ExSeal)
router.post("/v1.0/external/unseal", verifyToken, ExampleApp.ExUnseal)
router.post("/v1.0/external/encrypt", verifyToken, ExampleApp.ExEncrypt)
router.post("/v1.0/external/decrypt", verifyToken, ExampleApp.ExDecrypt)
router.post("/v1.0/external/tokenize", verifyToken, ExampleApp.ExTokenize)
router.post("/v1.0/external/detokenize", verifyToken, ExampleApp.ExDetokenize)
router.post("/v1.0/external/sign", verifyToken, ExampleApp.ExSign)
router.post("/v1.0/external/verify", verifyToken, ExampleApp.ExVerify)
router.post("/v1.0/secret/get", verifyToken, ExampleApp.ExSecretGet)


module.exports = router;