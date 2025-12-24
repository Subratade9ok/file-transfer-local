import express from "express";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import archiver from "archiver";
import { requirePin } from "../middlewares/auth.middleware.js";

const router = express.Router();
const ROOT = path.resolve(process.env.UPLOAD_DIR || "./uploads");

router.get("/", requirePin, (req, res) => {
  const dir = path.resolve(ROOT, req.query.path || "");
  if (!dir.startsWith(ROOT)) return res.sendStatus(403);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const items = fs.readdirSync(dir).map(name => {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    return {
      name,
      isDir: stat.isDirectory(),
      path: path.relative(ROOT, full)
    };
  });

  res.render("browse", { items, current: path.relative(ROOT, dir) });
});

router.get("/download", requirePin, (req, res) => {
  const file = path.join(ROOT, req.query.file);
  res.download(file);
});

router.post("/zip", requirePin, (req, res) => {
  const files = [].concat(req.body.files || []);
  res.attachment("files.zip");
  const archive = archiver("zip");
  archive.pipe(res);

  files.forEach(f => archive.file(path.join(ROOT, f), { name: path.basename(f) }));
  archive.finalize();
});



router.post("/mkdir", requirePin, (req, res) => {
  const { basePath, name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Folder name required" });
  }

  const target = path.resolve(ROOT, basePath || "", name);

  // Security: prevent ../ escape
  if (!target.startsWith(ROOT)) {
    return res.sendStatus(403);
  }

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  res.json({ success: true });
});


export default router;
