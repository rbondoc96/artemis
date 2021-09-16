import {Options, Dialect} from "sequelize/types"

export interface DatabaseConfig {
    [index: string]: PGConfig

    development: PGConfig,
    test: PGConfig,
    production: PGConfig
}

export interface PGConfig extends Options {
    host: string,
    port: number,
    dialect: Dialect,
    database: string,
    username: string,
    password: string,
}