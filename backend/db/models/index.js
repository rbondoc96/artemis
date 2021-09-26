const fs = require("fs");
const path = require("path");

const {Sequelize, DataTypes} = require("sequelize");

const DBConfig = require("../config");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const pgConfig = DBConfig[env];
const db= {};

let sequelize = new Sequelize(pgConfig.database, pgConfig.username, pgConfig.password, pgConfig);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
