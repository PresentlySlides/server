import Server from "./src/Server.js";

const server = new Server(process.argv.includes("debug"));
server.start();
