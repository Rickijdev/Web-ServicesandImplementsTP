// Servidor local de desarrollo. No requiere npm install.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const webRoot = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.NEXO_PORT || 4173);
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2'
};

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end('Método no permitido.');
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let target = resolve(webRoot, `.${pathname}`);
    if (target !== resolve(webRoot) && !target.startsWith(resolve(webRoot) + sep)) {
      response.writeHead(403).end('Acceso no permitido.');
      return;
    }
    if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html');
    const contents = await readFile(target);
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(target)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(request.method === 'HEAD' ? undefined : contents);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Archivo no encontrado.');
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `El puerto ${port} está ocupado. Cierra el otro servidor o cambia NEXO_PORT.`
    : error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Nexo está disponible en http://localhost:${port}`);
  console.log('Abre esa dirección en tu navegador. Detén el servidor con Ctrl+C.');
});
