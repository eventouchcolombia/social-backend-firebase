import express from "express";
import admin from "firebase-admin";
import path from "path";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "socialeventouch.firebasestorage.app"
});
const bucket = admin.storage().bucket();

// Endpoint para listar todos los archivos en photos/
app.get("/list", async (req, res) => {
  try {
    const [files] = await bucket.getFiles({ prefix: "photos/" });
    const fileNames = files.map(file => file.name.replace("photos/", ""));
    res.json(fileNames);
  } catch (err) {
    console.error("Error detallado al listar archivos:", err);
    res.status(500).send("Error al listar archivos");
  }
});

// Endpoint para descargar la foto
app.get("/download/:filename", async (req, res) => {
  const { filename } = req.params;
  try {
    console.log(`Solicitando archivo: photos/${filename}`);
    const file = bucket.file(`photos/${filename}`);
    const [exists] = await file.exists();
    console.log(`¿Existe en Firebase?: ${exists}`);
    if (!exists) return res.status(404).send("Archivo no encontrado");

    res.setHeader("Content-Disposition", `attachment; filename=\"${filename}\"`);
    res.setHeader("Content-Type", "application/octet-stream");
    file.createReadStream().pipe(res);
  } catch (err) {
    console.error("Error al descargar la foto:", err);
    res.status(500).send("Error al descargar la foto");
  }
});

app.get("/", (req, res) => {
  res.send("Servidor de descarga de fotos de Firebase activo.");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
