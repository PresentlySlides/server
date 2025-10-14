import PermissionsCodec from "../Utility/PermissionsCodec.js";

class WebSocket {
    constructor(server, io, type, permissions = "", logger) {
        this.server = server;

        this.logger = logger;

        this.io = io.of(`/${type}`);
        
        this.io.use((s, next) => this.handleRoom(s, next));
        this.io.use((s, next) => this.handleAuth(s, next));
        
        this.permsCodec = new PermissionsCodec();
        this.permissions = this.permsCodec.decode(permissions);

        this.io.on("connection", s => {
            this.onConnect(s);
            this.global_onConnect(s);
        });
    }

    onConnect(_) {}
    global_onConnect(socket) {
        socket.emit("room", socket.data.room);
    }

    handleRoom(socket, next) {
        const roomRq = socket.handshake.auth.room;

        if (!this.permissions.has("Connect")) return next(new Error("No permission to connect"));

        if (!roomRq) return next(new Error("[DISCONNECTED] No room data provided"));

        if (roomRq.action == "create") {
            if (!this.permissions.has("CreateRooms"))
                return next(new Error("[DISCONNECTED] No permission to create rooms"));

            const room = this.server.roomManager.createRoom();
            room.join(socket);
            next();
        } else if (roomRq.action == "join") {
            if (!this.permissions.has("JoinRooms"))
                return next(new Error("[DISCONNECTED] No permission to join rooms"));

            const room = this.server.roomManager.rooms.get(
                this.server.roomManager.joinCodes.get(roomRq.roomId) || roomRq.roomId
            );

            if (!room) return next(new Error("[DISCONNECTED] Room not found"));
            room.join(socket);
            next();
        }
    }

    handleAuth(_, next) {
        next();
    }
}

export default WebSocket;
