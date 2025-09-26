import {Server} from "socket.io";
import Logger from "./Logger.js";
import WebSocket from "./WebSockets/WebSocket.js";
import UserWebSocket from "./WebSockets/UserWebSocket.js";

class WebSocketManager {
    constructor(server, corsOptions) {
        this.logger = new Logger("WSKT");

        this.server = server;
        this.corsOptions = corsOptions;
        this.io = new Server(server, {
            cors: this.corsOptions
        });
    }

    addListeners() {
        this.WebSocket = new WebSocket(this.io, "", this.logger);
        this.UserWebSocket = new UserWebSocket(this.io, this.logger);
    }
}

export default WebSocketManager;
