import * as dotenv from "dotenv";

import {PGConfig, DatabaseConfig} from "../types/config"

dotenv.config();

const development: PGConfig = {
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432,
    "database": `${process.env.DB_NAME || "project"}-dev`,
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || "postgres",
};

const test: PGConfig = {
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432,
    "database": `${process.env.DB_NAME || "project"}-test`,
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || "postgres",
};

const production: PGConfig = {
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432,
    "database": process.env.DB_NAME || "project",
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || "postgres",
};

const DBConfig: DatabaseConfig = {
    development: development,
    test: test,
    production: production
}
export default DBConfig;