import * as dotenv from "dotenv";

dotenv.config();

export const development = {
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres",
    "database": process.env.DB_NAME,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
};

export const test = {
    "host": "127.0.0.1",
    "dialect": "postgres",
    "database": "loki-test",
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
};

export const production = {
    "host": "127.0.0.1",
    "dialect": "postgres",
    "database": "loki-test",
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
};

