// Archivo principal de backend para registrar routers y exponer la API
const express = require("express");
const cors = require("cors");
const forosRouter = require("./routes/foros");
const chatRouter = require("./routes/chat");
const usuariosRouter = require("./routes/usuarios");

const app = express();

app.use(cors());
app.use(express.json());

// Registrar routers
app.use("/foros", forosRouter);
app.use("/chat", chatRouter);
app.use("/usuarios", usuariosRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API Tremia funcionando");
});

// Exportar app para usar con Firebase Functions o iniciar servidor local
module.exports = app;

// Si quieres correr localmente, descomenta esto:
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
