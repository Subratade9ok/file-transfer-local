import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

import uploadRoutes from "./routes/upload.routes.js";
import browseRoutes from "./routes/browse.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { loadEnvAndValidate } from "./utils/env.util.js";
loadEnvAndValidate();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use("/", uploadRoutes);
app.use("/", authRoutes);
app.use("/browse", browseRoutes);

export default app;
