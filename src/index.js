import HTTPManager from "./HTTPManager.js";
import config from "../config.json" with { type: "json" };

const httpManager = new HTTPManager();
httpManager.start(config.port);
