class Room {
    constructor(server, logger) {
        this.server = server;
        this.logger = logger;

        this.id = crypto.randomUUID();
        this.users = new Set();
    }

    generateJoinCode(n = 0) {
        const code = crypto.randomInt(0, 1000000).toString().padStart(6, "0");
        const response = this.server.roomManager.validateJoinCode(this, code);
        if (!response && n >= 5) return false;
        if (!response) return this.generateJoinCode(n + 1);
        return code;
    }

    join(socket) {
        socket.join(this.id);
        this.users.add(socket);
        return this;
    }

    leave(socket) {
        socket.leave(this.id);
        this.users.delete(socket);
        if (this.users.size == 0) this.delete();
        return true;
    }

    delete() {
        for (const socket of this.users) this.leave(socket);

        this.server.roomManager.rooms.delete(this.id);

        return true;
    }
}

export default Room;
