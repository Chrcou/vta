import dotenv from "dotenv";
import { f } from "./flemmeFunction";
import { ChokidarService } from "./chokidar.service";
import { exec } from "child_process";
import { FfmpegService } from "./ffmpeg.service";
const pathConfig = (
  dotenv.config() ?? {
    parsed: {
      inputPath: "./",
      outputPath: "./",
    },
  }
).parsed;
f.cl(pathConfig);
let watcherService = new ChokidarService(pathConfig!.inputPath);
let ffmpegService = new FfmpegService(pathConfig!.outputPath);
watcherService.addCallbackObject({
  add: (path: string) => {
    ffmpegService.onAddingFile(path);
  },
});
