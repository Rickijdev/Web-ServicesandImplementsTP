# Nexo Automatización — proyecto de Ricky

Una web de presentación hecha con **HTML5, CSS y JavaScript puro**. No usa React, no requiere compilación y no depende de servicios externos para cargar las imágenes, los estilos o las fuentes.

## Abrir en VS Code

1. Extrae el ZIP completo.
2. En VS Code, elige **Archivo → Abrir carpeta** y abre `Nexo-Automatizacion`.
3. Abre `dist/index.html`.
4. Puedes hacer doble clic en ese archivo desde tu explorador para verlo en el navegador. Para editar con recarga automática, usa la extensión **Live Server**: clic derecho en `index.html` → **Open with Live Server**.

También puedes usar el servidor incluido si tienes Node.js 18 o superior:

```bash
npm run dev
```

Abre `http://localhost:4173`. **No necesitas ejecutar `npm install`.** Este servidor escucha solo en tu computadora. Para detenerlo, presiona `Ctrl+C`. Recarga el navegador después de guardar cambios; para recarga automática usa Live Server.

## Qué archivo editar

| Archivo | Qué contiene |
| --- | --- |
| `dist/index.html` | Textos, secciones, precios, presentación de Ricky e ilustraciones SVG. |
| `dist/styles.css` | Estilos base y reglas adaptables al tamaño de pantalla. |
| `dist/components.css` | Visor grande de ESP32, servomotor, brazo y carcasa 3D. |
| `dist/experience.css` | Nueva identidad visual, tamaños amplios, perfil de Ricky y escenas de scroll. |
| `dist/app.js` | Demostraciones, visor, comparador y mensajes para WhatsApp. |
| `dist/motion.js` | Entradas al hacer scroll, paralaje, barra de avance y recorrido de tres escenas. |
| `dist/assets/` | Fotografía, fuentes, favicon y portada para compartir. |
| `scripts/serve.mjs` | Servidor local opcional, sin dependencias. |
| `.vscode/` | Configuración sugerida para VS Code y Live Server. |

El orden de las hojas de estilo es intencional: base → componentes → experiencia. Para cambiar el diseño actual, empieza por **`experience.css`**.

## Cambios habituales

- **Nombre y presentación:** busca `Ricky` y la sección `id="sobre-mi"` en `index.html`. El saludo preparado de WhatsApp está también en `app.js`.
- **Foto de Ricky y logo UNT:** están en `dist/assets/ricky.webp` y `dist/assets/unt-logo.webp`. La foto conserva la imagen proporcionada; el `viewBox` del SVG con clase `founder-photo` ajusta el encuadre dentro de la tarjeta. Si sustituyes la foto, actualiza también sus dimensiones y ese encuadre.
- **WhatsApp:** el número es `51938681643`. Cámbialo en los enlaces de `index.html` y en `whatsappNumber`, al inicio de `app.js`.
- **Paleta:** las variables al principio de `experience.css` controlan los colores principales. Las ilustraciones SVG también tienen colores propios en `index.html`.
- **Precios:** revisa las tarjetas, las opciones del comparador, la consulta y las preguntas frecuentes en `index.html`; revisa también `typeLabels` en `app.js`. El comparador calcula con el valor elegido en sus opciones.
- **Explicaciones de componentes:** el objeto `partContent` de `app.js` contiene los títulos, descripciones, analogías y pasos de cada pieza.
- **Escenas del recorrido:** el arreglo `scenes` de `motion.js` contiene los tres textos. Sus ilustraciones están en la sección `id="experiencia"` del HTML.
- **Duración de las animaciones de componentes:** actualmente son 4.8 segundos. Si la cambias, actualiza tanto `components.css` como los tiempos del visor en `app.js`.

## Scroll e interacciones

La página mantiene el desplazamiento normal del navegador. Las secciones entran de forma escalonada, algunas imágenes se desplazan suavemente y el recorrido fijo cambia de escena según el avance. Las etapas también se pueden seleccionar con sus botones.

El sitio respeta la preferencia del sistema **reducir movimiento**. Con esa preferencia, o en ventanas de menos de 620 píxeles de alto, el recorrido se presenta sin una sección fija extensa y sus etapas se eligen con los botones. El texto siempre sigue siendo accesible.

El formulario prepara un mensaje de WhatsApp; la persona lo revisa y decide si lo envía. La página no guarda consultas. Las aperturas de puerta y las piezas animadas son demostraciones visuales: esta web promocional no está conectada al ESP32 ni controla una puerta real.

## Publicación propia

Sube **el contenido de la carpeta `dist`**, conservando su estructura, a un hosting de archivos estáticos. El archivo `index.html` debe quedar en la raíz pública. No necesitas subir `scripts`, `.vscode` ni `package.json` a ese hosting.

Si cambias el dominio, actualiza `canonical`, `og:url` y `og:image` dentro de `dist/index.html`. La URL incluida corresponde a la publicación de Nexo creada en esta conversación.

## Revisión

- Sintaxis de JavaScript y referencias internas verificadas.
- Visor de componentes: selección, pausa, continuación y repetición comprobados en la edición del visor.
- Recorrido de scroll y estados de navegación comprobados con una simulación de las APIs del navegador.
- La revisión visual completa en un navegador real quedó pendiente en el entorno de entrega. Revisa escritorio y celular al abrir el proyecto.

## Recursos

- Fotografía de ambiente: **Artem Artemov**, en Unsplash: https://unsplash.com/photos/warm-sunlight-streams-into-a-modern-living-room-dGZWlC4TXF0
- Fuentes locales: **DM Sans** e **Instrument Serif**, obtenidas de Google Fonts.
- Ilustraciones: SVG editables incluidos en `index.html`.
- Fotografía personal de Ricky y escudo de la UNT: archivos proporcionados por Ricky e incluidos como recursos locales.

La fotografía es ilustrativa. El perfil presenta la formación universitaria en curso de Ricky; no se incluyen testimonios, títulos profesionales terminados ni certificaciones no proporcionadas.
