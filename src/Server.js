import HTTPManager from "./Managers/Server/HTTPManager.js";
import WebSocketManager from "./Managers/Server/WebSocketManager.js";
import RoomManager from "./Managers/Server/RoomManager.js";
import Logger from "./Utility/Logger.js";
import config from "../config.json" with { type: "json" };

class Server {
    constructor(debugMode = false) {
        this.logger = new Logger(this, "INDX");
        
        this.httpManager = new HTTPManager(this);
        this.webSocketManager = new WebSocketManager(this);
        this.roomManager = new RoomManager(this);
        
        this.debugMode = debugMode;
        if (this.debugMode) this.logger.debug("Debug mode is enabled.");
    }

    start() {
        this.httpManager.start(config.port);
    }
}

export default Server;
