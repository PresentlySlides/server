import WebSocket from "./WebSocket.js";

class UserWebSocket extends WebSocket {
    constructor(server, io, logger) {
        super(server, io, "presenter", logger);

        this.permissions = new Set(["Connect", "JoinRooms", "CreateRooms"]);
    }
}

export default UserWebSocket;
