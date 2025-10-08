import WebSocket from "./WebSocket.js";

class UserWebSocket extends WebSocket {
    constructor(server, socket, logger) {
        super(server, socket, "user", logger);
    }
}

export default UserWebSocket;
