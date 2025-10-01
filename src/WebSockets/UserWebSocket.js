import WebSocket from "./WebSocket.js";

class UserWebSocket extends WebSocket {
    constructor(server, socket, logger) {
        super(server, socket, "user", logger);
    }

    onConnect(socket) {
        this.logger.info(`User connected: ${socket.id}`);
    }
}

export default UserWebSocket;
