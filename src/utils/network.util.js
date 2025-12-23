import os from "os";

export function getLanIp() {
  const nets = os.networkInterfaces();
  for (const iface of Object.values(nets)) {
    for (const net of iface) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
  return "localhost";
}
