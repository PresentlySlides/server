import express from "express";
import http from "http";
import cors from "cors";
import Logger from "./Logger.js";
import WebSocketManager from "./WebSocketManager.js";

class HTTPManager {
    constructor(corsOptions = {origin: true, credentials: true}) {
        this.logger = new Logger("HTTP");

        this.corsOptions = corsOptions;
        this.app = express();
        this.server = http.createServer(this.app);

        this.app.use(cors(this.corsOptions));
    }

    initiateEndpoints() {
        this.app.get("/", (_, res) => {
            res.type("text").send("presentlyslides");
        });
    }

    startWebSocket() {
        this.websocket = new WebSocketManager(this.server, this.corsOptions);
        this.websocket.addListeners();
    }

    listen(port = 3000) {
        this.server.listen(port, () => {
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
