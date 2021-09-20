import {Sequelize} from "sequelize"
import {PGConfig} from "../../types/config"

import DBConfig from "../../db/config"

const env = process.env.NODE_ENV || "development";
const pgConfig: PGConfig = DBConfig[env];

let sequelize: Sequelize = new Sequelize(pgConfig.database, pgConfig.username, pgConfig.password, pgConfig);

export {sequelize, Sequelize};
