import WebSocket from "./WebSocket.js";

class UserWebSocket extends WebSocket {
    constructor(server, socket, logger) {
        super(server, socket, "user", logger);
    }

    onConnect(s) {
        s.on("create room", callback => {
            const room = this.server.roomManager.createRoom();
            s.join(room.id);
            callback({success: true, roomId: room.id});
        });

        s.on("join room", (data, callback) => {
            const room = this.server.roomManager.rooms.get(data.roomId);
            if (room) {
                room.join(s);
                callback({success: true});
            } else callback({success: false, error: "Room not found"});
        });

        s.on("leave room", callback => {
            this.server.roomManager.leaveUser(s);
            callback({success: true});
        });
    }
}

export default UserWebSocket;
