const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const ApiRouter = require("./controller");
const {sequelize} = require("./db/models");
const {errorHandler} = require("./lib/errors");

class Server {
 
    constructor() {
        this.server = express();
        this.port = 5500;
        this.setConfig();
        this.setApi();
        this.setRoutes();
    
        /**
         * Error handling middleware must be defined LAST, after
         * other this.server.use() or routes calls
         */
        this.server.use(errorHandler);
    }


    start() {
        return this.server.listen(this.port, () => {
            if(this.env == "development") {
                console.log(`Server listening on port ${this.port}`);
                console.log(`http://127.0.0.1:${this.port}`);
            }
        });
    }


    setConfig() {
        dotenv.config();

        this.port = process.env.PORT || 5500;
        this.env = process.env.NODE_ENV || "development";

        this.setDbConfig();
        this.setCorsConfig();
        this.setExpressConfig();
    }

    async setDbConfig() {
        await sequelize.authenticate();
    }


    setExpressConfig() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({
            extended: false,
        }));
        this.server.use(express.static(path.join(__dirname, "../../frontend/build")));
    }


    setCorsConfig() {
        let corsOptions = {
            origin: "http://127.0.0.1:8080",
            optionsSuccessStatus: 200,
        };

        this.server.use(cors(corsOptions));
    }


    setApi() {
        this.server.use("/api", ApiRouter);
    }


    setRoutes() {
        this.server.get("/", (req, res) => {
            return res.send("Hi, this is home");
        })
        // this.server.get("*", (req, res) => {
        //     return res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
        // })
    }
}

module.exports = Server;