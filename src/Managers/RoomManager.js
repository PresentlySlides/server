import Logger from "../Utility/Logger.js";
import Room from "../Room.js";

class RoomManager {
    constructor(server) {
        this.server = server;

        this.logger = new Logger(this.server, "ROOM");

        this.rooms = new Map();
        this.joinCodes = new Map();
    }

    validateJoinCode(room, code) {
        if (this.joinCodes.get(code)) return false;

        this.joinCodes.set(code, room.id);

        setTimeout(() => {
            this.joinCodes.delete(code);
            room.onJoinCodeExpire(code);
        }, 5 * 60 * 1000); // 5 minutes

        return true;
    }

    createRoom() {
        const room = new Room(this.server, this.logger);
        this.rooms.set(room.id, room);
        return room;
    }

    leaveUser(socket) {
        for (const room of this.rooms.values()) if (room.users.has(socket)) room.leave(socket);
        return true;
    }

    joinRoom(roomId, socket) {
        const room = this.rooms.get(roomId);
        if (room) return room.join(socket);
        return null;
    }
}

export default RoomManager;
