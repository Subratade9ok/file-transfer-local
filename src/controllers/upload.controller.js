import multer from "multer";
import fs from "fs";
import path from "path";
import { resolveFileName } from "../utils/fileName.util.js";

const uploadRoot = path.resolve(process.env.UPLOAD_DIR || "./uploads");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const date = new Date().toISOString().slice(0, 10);

    // Store on request object so filename() can access it
    req.uploadDateDir = path.join(uploadRoot, date);

    fs.mkdirSync(req.uploadDateDir, { recursive: true });
    cb(null, req.uploadDateDir);
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
