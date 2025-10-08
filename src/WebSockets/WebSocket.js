class WebSocket {
    constructor(server, socket, type, logger) {
        this.server = server;

        this.logger = logger;

        this.socket = socket.of(`/${type}`);

        this.socket.on("connection", s => {
            this.onConnect(s);
            this.global_onConnect(s);
        });
    }

    global_onConnect(s) {
        s.on("create room", callback => {
            const room = this.server.roomManager.createRoom();
            s.join(room.id);
            callback({success: true, roomId: room.id});
        });

        s.on("join room", (data, callback) => {
            const room = this.server.roomManager.rooms.get(
                this.server.roomManager.joinCodes.get(data.roomId) || data.roomId
            );
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

export default WebSocket;
