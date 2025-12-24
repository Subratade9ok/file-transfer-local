import { loadEnvAndValidate } from "./utils/env.util.js";
loadEnvAndValidate();
import { getLanIp } from "./utils/network.util.js";
import app from "./app.js";

const IP = getLanIp();
const PORT = process.env.PORT;


app.listen(PORT, () =>
  console.log(`🔄 File Transfer running on http://${IP}:${PORT}`)
);
