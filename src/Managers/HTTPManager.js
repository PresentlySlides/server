import express from "express";
import http from "http";
import cors from "cors";
import Logger from "../Utility/Logger.js";
import WebSocketManager from "./WebSocketManager.js";
import config from "../../config.json" with { type: "json" };

class HTTPManager {
    constructor(server, corsOptions = {origin: true, credentials: true}) {
        this.server = server;

        this.logger = new Logger(this.server, "HTTP");

        this.corsOptions = corsOptions;
        this.app = express();
        this.http = http.createServer(this.app);

        this.app.use(cors(this.corsOptions));
    }

    initiateEndpoints() {
        this.app.get("/", (_, res) => {
            res.json(config.about);
        });
    }

    startWebSocket() {
        this.server.webSocketManager.addListeners();
    }

    listen(port = 3000) {
        this.http.listen(port, () => {
            this.logger.info(`Server is running on port ${port}`);
        });
    }

    start(port) {
        this.initiateEndpoints();
        this.startWebSocket();
        this.listen(port);
    }
}

export default HTTPManager;
