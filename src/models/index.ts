"use strict";

import * as fs from "fs";
import * as path from "path";
import {Sequelize, DataTypes} from "sequelize";

import * as dbconfig from "../config/database"

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const pgConfig = dbconfig[env];
const db: {[name: string]: any} = {};

let sequelize;
if (pgConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[pgConfig.use_env_variable], pgConfig);
} else {
  sequelize = new Sequelize(pgConfig.database, pgConfig.username, pgConfig.password, pgConfig);
}

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
  console.log(modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
