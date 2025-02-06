const dbConfig = require("../config/config.js");
const Sequelize = require("sequelize");
const User = require("./UserModels.js");
const Contact = require("./ContactModels.js")
const Client = require("./ClientModels.js")
const Products = require("./ProductModels.js")
const ClientDetail = require("./ClientDetailModels.js")
const Blog = require("./BlogModels.js")
const Transaction = require("./TransactionModels.js")

const sequelizeInstance = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);
  
const db = {};
db.sequelizeInstance = sequelizeInstance;
db.User = User(sequelizeInstance);
db.Contact = Contact(sequelizeInstance)
db.Client = Client(sequelizeInstance)
db.Products = Products(sequelizeInstance)
db.ClientDetail = ClientDetail(sequelizeInstance)
db.Blog = Blog(sequelizeInstance)
db.Transaction = Transaction(sequelizeInstance)

// // History Patient - Patient
// db.Patient.hasMany(db.HistoryPatient, {
//   foreignKey: {
//     name: "patientId",
//     type: Sequelize.UUID,
//     allowNull: false,
//   },
// });

// db.HistoryPatient.belongsTo(db.Patient, {
//   targetKey: "id",
// });
db.Client.hasMany(db.Products, {
  foreignKey:{
    name: "clientId",
    type: Sequelize.UUID,
    allowNull: false
  },
});

db.Products.belongsTo(db.Client, {
  tergetKey:"id",
});

db.Client.hasOne(db.ClientDetail, {
  foreignKey:{
    name:"clientId",
    type: Sequelize.UUID,
    allowNull: false
  }
});
db.ClientDetail.belongsTo(db.Client, {
  targetKey:"id",
})

db.Products.hasMany(db.Transaction, {
  foreignKey:{
    name:"productId",
    type: Sequelize.UUID,
    allowNull: false
  }
});
db.Transaction.belongsTo(db.Products, {
  targetKey:"id",
})



module.exports = db;
