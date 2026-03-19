const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/api/status", (_req, res) => {
  res.json({
    ok: true,
    message: "Backend operativo para Eccomfy",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`API activa en http://localhost:${PORT}`);
});
