import WebSocket from "./WebSocket.js";

class UserWebSocket extends WebSocket {
    constructor(server, io, logger) {
        super(server, io, "user", "-S-R", logger);
    }
}

export default UserWebSocket;
