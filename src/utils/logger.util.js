

const getDurationInMilliseconds = (startTime) => {
  const diff = process.hrtime(startTime);
  return (diff[0] * 1000 + diff[1] / 1e6).toFixed(3);
};


export const loggerMiddleware = (req, res, next) => {
  const date = new Date().toISOString().slice(0, 10);
  const clientIp = (req.headers["x-forwarded-for"] || req.socket.remoteAddress).split(":").pop();
  const start = process.hrtime();

  res.on('finish', () => {
    const duration = getDurationInMilliseconds(start);
    console.log(`[${clientIp}] - ${date} - ${req.method} - [${req.originalUrl}] - ${duration}ms`);
  });
  
  next();
};
