import {Server} from "socket.io";
import Logger from "../../Utility/Logger.js";
import WebSocket from "../../WebSockets/WebSocket.js";
import UserWebSocket from "../../WebSockets/UserWebSocket.js";
import PresenterWebSocket from "../../WebSockets/PresenterWebSocket.js";

class WebSocketManager {
    constructor(server) {
        this.server = server;

        this.logger = new Logger(this.server, "WSKT");

        this.io = new Server(server.httpManager.http, {
            cors: this.server.httpManager.corsOptions
        });

        this.websockets = new Map();
    }

    addListeners() {
        this.logger.info("Adding WebSocket listeners...");
        this.UserWebSocket = new UserWebSocket(this.server, this.io, this.logger);
        this.PresenterWebSocket = new PresenterWebSocket(this.server, this.io, this.logger);
        this.websockets.set("user", this.UserWebSocket);
        this.websockets.set("presenter", this.PresenterWebSocket);
    }
}

export default WebSocketManager;
