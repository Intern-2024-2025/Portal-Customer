const dbConfig = require("../config/config.js");
const Sequelize = require("sequelize");
const User = require("./UserModels.js");
const Contact = require("./ContactModels.js")

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



module.exports = db;
