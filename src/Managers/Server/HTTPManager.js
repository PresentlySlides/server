import express from "express";
import http from "http";
import cors from "cors";
import Logger from "../../Utility/Logger.js";
import WebSocketManager from "./WebSocketManager.js";
import config from "../../../config.json" with { type: "json" };

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
        this.app.get(["/", "/api"], (_, res) => {
            res.json(config.about);
        });

        this.app.get("/api/websockets", (_, res) => {
            res.json([...this.server.webSocketManager.websockets.keys()]);
        });

        this.app.get("/api/websockets/:ws/permissions", (req, res) => {
            const websocket = this.server.webSocketManager.websockets.get(req.params.ws);
            if (!websocket) return res.status(404).json({"status": 404, "error": "WebSocket not found"});
            res.json([...websocket.permissions]);
        });

        this.app.get(/.*/, (_, res) => {
            res.status(404).json({"status": 404, "error": "Unrecognized endpoint"})
        })
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
