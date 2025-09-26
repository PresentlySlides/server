class WebSocket {
    constructor(socket, type, logger) {
        this.logger = logger;

        this.socket = socket.of(`/${type}`);

        this.socket.on("connection", s => this.onConnect(s));
    }

    onConnect(_) {}
}

export default WebSocket;
