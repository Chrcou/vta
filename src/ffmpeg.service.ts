import path from "path";
import { f } from "./flemmeFunction";

import fs from "fs";
import { exec } from "child_process";
const ffmpegSupportedInputExtensions = [
  // === VIDÉO ===
  // Conteneurs vidéo courants
  "3g2",
  "3gp",
  "3gp2",
  "3gpp",
  "amv",
  "asf",
  "avi",
  "avs",
  "bik",
  "drc",
  "dsf",
  "dvr-ms",
  "f4v",
  "flv",
  "gxf",
  "m1v",
  "m2v",
  "m2ts",
  "m4v",
  "mkv",
  "mng",
  "mov",
  "mp2",
  "mp4",
  "mpe",
  "mpeg",
  "mpg",
  "mpv",
  "mts",
  "mxf",
  "nsv",
  "nuv",
  "ogg",
  "ogv",
  "ps",
  "rec",
  "rm",
  "rmvb",
  "roq",
  "rpl",
  "seq",
  "smk",
  "swf",
  "ts",
  "vob",
  "webm",
  "wmv",
  "y4m",
  "yuv",

  // Vidéo brute ou séquences d'images
  "cin",
  "dpx",
  "exr",
  "gif",
  "j2c",
  "j2k",
  "jfif",
  "jif",
  "jp2",
  "jpc",
  "jpe",
  "jps",
  "pcx",
  "pgm",
  "pgmyuv",
  "png",
  "ppm",
  "qtrle",
  "sgi",
  "tga",
  "tif",
  "tiff",
  "y",



 
  // === AUTRES (Métadonnées, playlists, etc.) ===
  "cue",
  "iff",
  "m3u",
  "m3u8",
  "pls",
  "xspf",

  // === FORMATS BRUTS (Raw) ===
  "aac",
  "adts",
  "alaw",
  "avr",
  "cavs",
  "dts",
  "dv",
  "eac3",
  "g722",
  "g723_1",
  "g726",
  "g729",
  "h261",
  "h263",
  "h264",
  "hevc",
  "mlp",
  "mp1",
  "mp2",
  "mp3",
  "mulaw",
  "pcm",
  "s16be",
  "s16le",
  "s24be",
  "s24le",
  "s32be",
  "s32le",
  "s8",
  "u16be",
  "u16le",
  "u24be",
  "u24le",
  "u32be",
  "u32le",
  "u8",
  "vc1",
  "vorbis",

  // === PROTOCOLES (pseudo-extensions pour flux réseau) ===
  // Ces "extensions" sont utilisées dans les URLs (ex: rtmp://, http://)
  // Elles ne sont pas des fichiers, mais FFmpeg les gère comme des entrées.
  "concat",
  "crypto",
  "file",
  "ftp",
  "gopher",
  "hls",
  "http",
  "https",
  "icecast",
  "mmsh",
  "mmst",
  "pipe",
  "rtmp",
  "rtmpe",
  "rtmpte",
  "rtmps",
  "rtmpt",
  "rtp",
  "rtsp",
  "sctp",
  "srtp",
  "tcp",
  "udp",

  // === PÉRIPHÉRIQUES (device inputs) ===
  // Extensions virtuelles pour capture (ex: webcam, micro, écran)
  "alsa",
  "avfoundation",
  "decklink",
  "dshow",
  "dv1394",
  "fbdev",
  "gdigrab",
  "iec61883",
  "jack",
  "kmsgrab",
  "lavfi",
  "openal",
  "opengl",
  "oss",
  "pulse",
  "sndio",
  "v4l2",
  "x11grab",
];
const directoryPath = "/path/to/your/directory";

// Use fs.readdirSync to read the contents of the directory synchronously

export class FfmpegService {
  outputPath: string;
  ffmpegSupportedInputExtensions = ffmpegSupportedInputExtensions;
  constructor(outputPath: string) {
    this.outputPath = outputPath;
    // f.cl(this.ffmpegSupportedInputExtensions);
  }

  onAddingFile(filePath: string) {
    // f.cl("the file to work with is " + filePath);

    let exists = this.doesFileExists(filePath);
    console.log(exists, path.parse(filePath).ext);
    if (
      !exists &&
      this.ffmpegSupportedInputExtensions.includes(
        path.parse(filePath).ext.replace(".", "")
      )
    ) {

      let inputPathObject=path.parse(filePath)
      f.cl("sortie ::::" ,path.format(inputPathObject))
      let execString = "ffmpeg -i $$$$  \
  -vn -ar 44100 -ac 2 -ab 192k \
  @@@@@".replace("$$$$", '"'+ filePath+'"')
        .replace("@@@@@", '"'+this.outputPath+path.parse(filePath).name+'.mp3"');
        f.cl(execString)
      const ffMpegTreatment = exec(execString, function (err, stdout, stderr) {
        if (err) {
          console.error(err);
        }
            console.log(stdout);
      });

      ffMpegTreatment.on("exit", function (code) {
        f.cl(code);
      });
    }
  }

  doesFileExists(filePath: string) {
    const fileName = path.parse(filePath).name;
    f.cl(fileName);
    const outputFileList = fs
      .readdirSync(this.outputPath, { recursive: true })
      .map((x) => {
        return path.parse(x as string).name;
      });
    f.cl(outputFileList);
    let isFileExist = outputFileList.filter((n) => {
      return n === fileName;
    });
    f.cl("nom en commun : " + isFileExist.length);
    return isFileExist.length > 0;
  }
}

// f.cl("File", path, "has been added");

// const dir = exec("ls", function (err, stdout, stderr) {
//   if (err) {
//     // should have err.code here?
//   }
//   console.log(stdout);
// });

// dir.on("exit", function (code) {
// f.cl(code)
// });
