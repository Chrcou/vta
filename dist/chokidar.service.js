"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChokidarService = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const flemmeFunction_1 = require("./flemmeFunction");
class ChokidarService {
    watcher;
    constructor(toWatchPath) {
        flemmeFunction_1.f.cl(toWatchPath);
        const config = { ignored: /^\./, persistent: true, awaitWriteFinish: { stabilityThreshold: 30000,
                pollInterval: 250 } };
        this.watcher = chokidar_1.default.watch(toWatchPath, config);
    }
    addCallbackObject(obj) {
        this.watcher.on("add", obj.add);
    }
}
exports.ChokidarService = ChokidarService;
