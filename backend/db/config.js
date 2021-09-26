const dotenv = require("dotenv");
dotenv.config();

const development = {
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432,
    "database": `${process.env.DB_NAME || "project"}-dev`,
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || "postgres",
};

const test = {
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432,
    "database": `${process.env.DB_NAME || "project"}-test`,
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || "postgres",
    "logging": false,
};

const production = {
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432,
    "database": process.env.DB_NAME || "project",
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || "postgres",
};

const DBConfig = {
    development: development,
    test: test,
    production: production
}

module.exports = DBConfig;