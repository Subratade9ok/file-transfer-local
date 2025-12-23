import express from "express";
import QRCode from "qrcode";
import { upload } from "../controllers/upload.controller.js";
import { getLanIp } from "../utils/network.util.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const ip = getLanIp();
    const port = process.env.PORT || 3000;

    const url = `http://${ip}:${port}`;
    const qr = await QRCode.toDataURL(url);

    res.render("upload", { url, qr });
  } catch (err) {
    console.error("QR generation failed:", err);
    res.render("upload", { url: "", qr: "" });
  }
});

router.post("/upload", upload.array("files"), (req, res) => {
  res.redirect("/");
});





export default router;
