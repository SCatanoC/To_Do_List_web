// backend/server.js
const express = require("express");
const cors = require("cors");
const taskroutes = require("./routes/tasks");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000; // <-- importante para Render

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/tasks", taskroutes);

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta para servir index.html en la raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
