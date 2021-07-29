import * as path from "path";
import * as dotenv from "dotenv";
import * as express from "express";
import * as cors from "cors";

import ApiRouter from "./api";
import db from "./models";

const sequelize = db.sequelize;
// const User = db.User;

export class Server {
    public server: express.Application;
    public router: express.Router;

    private port: string | number;
    // private passport: passport.PassportStatic

    
    constructor() {
        this.server = express();
        this.setConfig();
        this.setApi();
        this.setRoutes();
    }


    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
            console.log(`http://127.0.0.1:${this.port}`);
        });
    }


    private setConfig(): void {
        dotenv.config();

        this.port = process.env.PORT || 5000;

        this.setCorsConfig();
        this.setExpressConfig();
        // this.setPassportConfig();
    }


    private setExpressConfig(): void {
        this.server.use(express.json());
        this.server.use(express.urlencoded({
            extended: false,
        }));

        this.server.use(express.static(path.join(__dirname, "../frontend/build")));
    }


    private setCorsConfig(): void {
        let corsOptions: {[name: string]: any} = {
            origin: "http://127.0.0.1:8080",
            optionsSuccessStatus: 200,
        };

        this.server.use(cors(corsOptions));
    }



    private setPassportConfig(): void {
        // this.server.use(passport.initialize());
        
        // this.passport.use(new passportLocal.Strategy({
        //     usernameField: "email"
        // }, findMatchingUser));
        
        // this.passport.use(new passportJWT.Strategy({
        //     jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        //     secretOrKey: process.env.JWT_SECRET
        // }, grantJwtToken));
    }


    private setApi(): void {
        this.server.use("/api", ApiRouter);
    }


    private setRoutes(): void {
        this.server.get("*", (req: express.Request, res: express.Response) => {
            return res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
        })
    }
}