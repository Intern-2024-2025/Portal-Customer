require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/index.js");
const Models = require("./models/index");
const cookieParser = require("cookie-parser");
const { createAdmin } = require("./seeders/AdminSeeders.js");
const path = require("path");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');

// Insialisasi ke Database
Models.sequelizeInstance
  .sync({ force: false, alter: true })
  .then(async () => {
    try {
      const user = await Models.User.findAll();
      if (user.length == 0) {
        createAdmin()
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Synced db.");
    }
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use('/api-docs/:token', (req, res, next) => {
    const token = req.params.token;
    if (!token) {
        return res.status(400).json({ message: 'Token tidak ditemukan di URL' });
    }
    req.swaggerToken = token;
    next();
});


app.use('/api-docs/:token', swaggerUi.serve, (req, res, next) => {
  const swaggerOptions = {
        swaggerOptions: {
            authAction: {
                BearerAuth: {
                    name: "BearerAuth",
                    schema: {
                        type: "apiKey",
                        in: "header",
                        name: "Authorization",
                        description: "Masukkan token dengan prefix Bearer"
                    },
                    value: `${req.swaggerToken}`
                }
            }
        }
    };
    
    swaggerUi.setup(swaggerDocument, swaggerOptions)(req, res, next);
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

// app.use(
//   "/assets/images/laporan",
//   express.static(path.join(__dirname, "assets/images/laporan"))
// );
// app.use(
//   "/assets/images/artikel",
//   express.static(path.join(__dirname, "assets/images/artikel"))
// );

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "https://dashboard.sandhiguna.com",
    ],
    exposedHeaders: "Authorization",
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);
// app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(router);

app.listen(process.env.PORT || 5003, () => {
  console.log("Server running at port 5003");
});
