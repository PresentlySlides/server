class WebSocket {
    constructor(server, socket, type, logger) {
        this.server = server;

        this.logger = logger;

        this.socket = socket.of(`/${type}`);

        this.socket.on("connection", s => this.onConnect(s));
    }
}

export default WebSocket;
