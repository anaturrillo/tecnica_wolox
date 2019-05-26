import * as express from "express";
import * as bodyParser from "body-parser";
import {routes} from "./api/routes";
import * as http from "http";
import * as morgan from "morgan";
import {shouldSkipLog} from "./utils/helpers";
import * as path from "path";
import * as fs from "fs";
import RotatingFileStream from "rotating-file-stream";

export const init = (port): http.Server => {
    const app = express();

    app.use("/api", bodyParser.json());
    app.use("/api", bodyParser.urlencoded({extended: true}));

    // LOGS
    const logDirectory: string = path.join(__dirname, "log");

    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    const logStream = RotatingFileStream("error.log", {
        interval: "1d",
        path: logDirectory,
    });

    app.use(morgan(":date[clf] :method :url :status - :response-time ms",
        {
            skip: shouldSkipLog,
            stream: logStream,
        },
    ));

    app.use(morgan("tiny", {skip: shouldSkipLog }));


    app.use("/api", routes());

    return app.listen(port, () => {
        console.log(`Server listening at port ${port}`);
    });
};
