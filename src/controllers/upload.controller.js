import multer from "multer";
import fs from "fs";
import path from "path";
import { resolveFileName } from "../utils/fileName.util.js";
import { loadEnvAndValidate } from "../utils/env.util.js";
loadEnvAndValidate();

const uploadRoot = path.resolve(process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const date = new Date().toISOString().slice(0, 10);

    const targetPath = req.query.targetPath;
    let dest;

    if (targetPath !== undefined) {
      dest = path.resolve(uploadRoot, targetPath ?? "/");
    } else {
      const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress?.split(":").pop();
      dest = path.join(uploadRoot, date, clientIp);
    }

    if (!dest.startsWith(uploadRoot)) {
      return cb(new Error("Invalid path"));
    }

    req.uploadDateDir = dest;
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },


  filename(req, file, cb) {
    try {
      const safeName = resolveFileName(
        req.uploadDateDir,
        file.originalname
      );
      cb(null, safeName);
    } catch (err) {
      cb(err);
    }
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: Infinity // unlimited
  }
});