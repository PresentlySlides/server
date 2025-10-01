import HTTPManager from "./Managers/HTTPManager.js";
import WebSocketManager from "./Managers/WebSocketManager.js";
import Logger from "./Utility/Logger.js";
import config from "../config.json" with { type: "json" };

class Server {
    constructor(debugMode = false) {
        this.logger = new Logger(this, "INDX");
        
        this.httpManager = new HTTPManager(this);
        this.webSocketManager = new WebSocketManager(this);
        
        this.debugMode = debugMode;
        if (this.debugMode) this.logger.debug("Debug mode is enabled.");
    }

    start() {
        this.httpManager.start(config.port);
    }
}

export default Server;
