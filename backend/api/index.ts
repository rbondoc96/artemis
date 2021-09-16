import * as express from "express";

const ApiRouter = express.Router();

ApiRouter.get("/test", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return res.status(200).json({
        "message": "this was a test owo"
    })
})

ApiRouter.get("/test2", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return res.status(200).json({
        "message": "another test uwu"
    })
})

export default ApiRouter;
