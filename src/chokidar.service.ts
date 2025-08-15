import chokidar, { FSWatcher } from "chokidar";
import { Stats } from "fs";
import { f } from "./flemmeFunction";

export class ChokidarService {
    watcher: FSWatcher;

    constructor(toWatchPath: string) {
    f.cl(toWatchPath)
        const config = { ignored: /^\./, persistent: true ,  awaitWriteFinish:{           stabilityThreshold: 30000,
                pollInterval: 250} }
        this.watcher = chokidar.watch(toWatchPath, config)
    }

    addCallbackObject(obj: { add: (path: string, stats?: Stats | undefined) => void }) {
        this.watcher.on("add", obj.add)
    }






}