// Vista de doble clic: mismo bundle, script clásico y fuentes incrustadas.
// Evita los imports ES y las restricciones CORS de fuentes sobre file://.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const html = await readFile(path.join(dist,"index.html"),"utf8");
const stylesheet=html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/);
if(!stylesheet)throw new Error("No se encontró la hoja de estilos compilada.");
const cssPath=path.resolve(dist,stylesheet[1]);
let css=await readFile(cssPath,"utf8");
for(const match of [...css.matchAll(/url\(([^)]+\.(woff2|ttf))\)/g)]){
 const relative=match[1].replace(/["']/g,"");
 const bytes=await readFile(path.resolve(path.dirname(cssPath),relative));
 css=css.replace(match[0],`url("data:font/${match[2]};base64,${bytes.toString("base64")}")`);
}
const classic=html
 .replace('type="module" crossorigin',"defer")
 .replace(/<link\s+rel="preload"[\s\S]*?\/>/g,"")
 .replace(stylesheet[0],`<style>${css}</style>`);
await writeFile(path.join(dist,"ABRIR-WEB.html"),classic);
await writeFile(new URL("../ABRIR-WEB.html",import.meta.url),`<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=./dist/ABRIR-WEB.html"><title>Abrir Nexo</title></head>
<body style="background:#f4f0e7;color:#173d46;font-family:Arial;padding:40px"><h1>Nexo Automatización</h1><p><a href="./dist/ABRIR-WEB.html">Abrir la nueva web de Nexo →</a></p><p>Para editar el código, sigue la guía LEEME-PRIMERO.txt.</p></body></html>`);
