import {Server} from "socket.io";
import Logger from "../Utility/Logger.js";
import WebSocket from "../WebSockets/WebSocket.js";
import UserWebSocket from "../WebSockets/UserWebSocket.js";

class WebSocketManager {
    constructor(server) {
        this.server = server;

        this.logger = new Logger(this.server, "WSKT");

        this.io = new Server(server.httpManager.http, {
            cors: this.server.httpManager.corsOptions
        });
    }

    addListeners() {
        this.logger.info("Adding WebSocket listeners...");
        this.WebSocket = new WebSocket(this.server, this.io, "", this.logger);
        this.UserWebSocket = new UserWebSocket(this.server, this.io, this.logger);
    }
}

export default WebSocketManager;
