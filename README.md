# Backend para descarga directa de fotos desde Firebase Storage

## ¿Qué hace?
Este servidor Express permite descargar fotos almacenadas en Firebase Storage usando una URL como:

```
http://localhost:3001/download/NOMBRE_DE_LA_FOTO.png
```

Esto fuerza la descarga en cualquier dispositivo móvil o escritorio.

## Cómo usar
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor:
   ```bash
   npm start
   ```
3. Accede a la URL de descarga desde tu frontend:
   ```
   http://localhost:3001/download/NOMBRE_DE_LA_FOTO.png
   ```

## Requisitos
- Node.js
- Tener configuradas las credenciales de Firebase Admin (por defecto busca GOOGLE_APPLICATION_CREDENTIALS en tu entorno).

## Seguridad
No expongas este backend públicamente sin autenticación.
