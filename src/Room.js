class Room {
    constructor(server, logger) {
        this.server = server;
        this.logger = logger;

        this.id = crypto.randomUUID();
        this.users = new Set();
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
