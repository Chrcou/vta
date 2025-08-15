"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const flemmeFunction_1 = require("./flemmeFunction");
const chokidar_service_1 = require("./chokidar.service");
const ffmpeg_service_1 = require("./ffmpeg.service");
const pathConfig = (dotenv_1.default.config() ?? {
    parsed: {
        inputPath: "./",
        outputPath: "./",
    },
}).parsed;
flemmeFunction_1.f.cl(pathConfig);
let watcherService = new chokidar_service_1.ChokidarService(pathConfig.inputPath);
let ffmpegService = new ffmpeg_service_1.FfmpegService(pathConfig.outputPath);
watcherService.addCallbackObject({
    add: (path) => {
        ffmpegService.onAddingFile(path);
    },
});
