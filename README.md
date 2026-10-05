# Nexo Automatización · edición 4.1.1

Web rediseñada para cualquier persona que quiera accionar su puerta desde el celular: hogares, consultorios odontológicos, estudios jurídicos, oficinas, negocios, estudios y alojamientos.

La dirección visual toma como referencia Stock Dutch Design: portada con fotografías superpuestas, grandes titulares serif, mucho espacio, líneas finas y parallax a distintas velocidades. La nueva paleta es **azul petróleo, arena y cobre**. El contenido, las imágenes de interiores y los modelos son propios de esta edición de Nexo.

### Qué se corrigió en esta entrega

- El visor muestra **cuatro modelos independientes**: ESP32, servomotor, brazo y carcasa. Cambiar la pestaña sustituye el objeto y sincroniza su descripción; ya no deja el montaje completo en pantalla.
- Un solo contexto WebGL se reutiliza al cambiar de pieza. Se cancelan las animaciones anteriores, se liberan los recursos del modelo y se reinician giro y zoom.
- Controles para girar, acercar, alejar, ver la acción y restablecer. También se puede elegir cada pieza con flechas, Inicio y Fin.
- Si WebGL 2 no está disponible, se muestra una ilustración detallada y distinta de la pieza seleccionada, con los mismos controles básicos.
- Galería y portada con una serie coherente de cuatro interiores de aspecto fotográfico, generados para esta edición. No se presentan como instalaciones reales.
- La demostración del celular se integra en la sección «Así funciona».
- Diseño adaptable, movimiento reducido y nueva paleta también en el panel administrativo.

## Abrir la web sin instalar nada

1. Extrae **todo** el ZIP. No abras el HTML dentro del archivo comprimido.
2. Abre `ABRIR-WEB.html` con doble clic.
3. Se abrirá la vista local de la página pública, con el mismo código compilado que la versión web.

También puedes abrir directamente `dist/ABRIR-WEB.html`. Las fuentes, las fotografías y las bibliotecas de la web pública están incluidas. WhatsApp y el panel de Firebase necesitan internet.

El acceso al panel de clientes debe abrirse con un servidor local o desde un hosting: los navegadores pueden bloquear los módulos de Firebase cuando se usa `file://`.

## Ver la versión compilada con un servidor

Con Node.js 22.12 o superior instalado, abre una terminal en esta carpeta:

```bash
npm start
```

Abre `http://localhost:4173`. No necesitas instalar dependencias para este comando: sirve la carpeta `dist` incluida. El panel está en `http://localhost:4173/admin.html`. Detén el servidor con `Ctrl+C`.

## Editar el proyecto en VS Code

Abre la carpeta `Nexo-Automatizacion`, no solo un archivo. En su terminal:

```bash
npm ci
npm run dev
```

Abre la dirección local que muestra Vite, normalmente `http://127.0.0.1:5173`. Los cambios en el código se reflejan automáticamente.

Cuando termines de editar:

```bash
npm run build
```

Este comando comprueba TypeScript, reconstruye `dist` y actualiza la vista de doble clic. La carpeta `dist` ya incluida en el ZIP está compilada; **las modificaciones en `src` necesitan una nueva compilación** para verse en `ABRIR-WEB.html`.

## Tecnologías y organización

- **React 19 + TypeScript**: componentes, estado del formulario, demostración e interacciones.
- **Vite 8**: desarrollo con recarga, compilación y optimización de recursos.
- **GSAP 3 + ScrollTrigger**: parallax de fotografías, movimiento de galería, recorrido por pasos y tipografía del pie.
- **Three.js**: modelos geométricos 3D con materiales, iluminación y acciones propias; renderizado a demanda.
- **CSS adaptable y SVG**: diseño para móvil, tablet y escritorio; objetos editables sin servicios externos.
- **Firebase Authentication + Cloud Firestore**: panel administrativo existente. Su integración y configuración original se conservan.

| Archivo                                      | Para qué sirve                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------- |
| `src/content.ts`                             | Casos de uso, componentes, precios, FAQ y teléfono de contacto.           |
| `src/App.tsx`                                | Estructura general, navegación, planes, comparación, perfil y privacidad. |
| `src/components/Hero.tsx`                    | Portada editorial con seis encuadres fotográficos y parallax.             |
| `src/components/PhoneDemo.tsx`               | Demostración interactiva de apertura.                                     |
| `src/components/ModelViewer.tsx`             | Visor de una pieza, controles, ciclo de vida WebGL y alternativa SVG.     |
| `src/three/models.ts`                        | Geometría, materiales y acción de cada modelo 3D.                         |
| `src/components/Experience.tsx`              | Proceso en tres pasos y explorador de componentes.                        |
| `src/components/Contact.tsx`                 | Formulario y preparación de la consulta por WhatsApp.                     |
| `src/hooks/useMotion.ts`                     | Animaciones de scroll y preferencia de movimiento reducido.               |
| `src/styles.css`                             | Diseño completo y reglas responsive.                                      |
| `public/admin.html`, `admin.css`, `admin.js` | Panel de clientes; la lógica de Firebase se conserva.                     |
| `public/firebase-config.js`                  | Configuración web original de Firebase.                                   |
| `public/assets/`                             | Fuentes, fotografías, favicon y portada social.                           |
| `scripts/serve.mjs`                          | Servidor local sin dependencias para la versión compilada.                |
| `scripts/create-preview.mjs`                 | Genera la vista de doble clic después de compilar.                        |
| `dist/`                                      | Web compilada lista para publicar. No es la carpeta de edición.           |

### Cambios habituales

- **Teléfono**: cambia `CONTACT` en `src/content.ts` y también el contacto del bloque `noscript` en `index.html`.
- **Precios**: modifica `plans` en `src/content.ts`. Ajusta los importes relacionados en `Contact.tsx`, la comparación y la selección de planes de `App.tsx`, las FAQ y los metadatos de `index.html`.
- **Colores**: modifica las variables de `:root` en `src/styles.css`. Los materiales de hardware están en `src/three/models.ts` y los colores de la alternativa ilustrada en `ModelViewer.tsx`.
- **Fotografía de Ricky**: se conserva la original. El encuadre se hace en el SVG `founder-photo` de `App.tsx`, sin modificar el archivo fotográfico.
- **Dominio**: cambia `canonical`, `og:url` y `og:image` en `index.html`. El proyecto conserva el dominio de GitHub Pages que tenía la web original.

## Qué hace la web

- Explica el sistema para personas y negocios, no solo para anfitriones.
- Muestra una **simulación** de apertura desde el celular. No manda órdenes a un ESP32 ni abre una puerta real.
- Explica que se acciona un pulsador o mecanismo compatible; la persona mueve la hoja de la puerta.
- Permite explorar ESP32, servomotor, brazo y carcasa en un visor con selección real de cada pieza.
- Conserva referencias desde **S/150** para pulsador y **S/210** para perilla, sujetas a evaluación.
- Preselecciona el espacio y el mecanismo en el formulario.
- Prepara un mensaje de WhatsApp. La persona pulsa **Abrir mi consulta en WhatsApp**, revisa el texto y lo envía allí.
- No guarda consultas ni añade analítica a la página pública.
- Mantiene el panel privado de clientes y su enlace al pie.

## Movimiento y accesibilidad

La barra de desplazamiento de la página está oculta mediante CSS. Se conserva el desplazamiento con rueda, teclado y gestos táctiles.

El scroll sigue siendo el del navegador. No se captura la rueda ni se obliga a un desplazamiento horizontal.

En escritorio amplio, con suficiente altura, el proceso queda visible mientras avanzan sus tres pasos y los objetos se desplazan a velocidades distintas. En móvil, ventanas bajas y modo de movimiento reducido, el proceso se presenta de forma normal y los pasos se eligen con botones.

Se respeta `prefers-reduced-motion`. El pie permite pausar el movimiento. Las pestañas admiten flechas, Inicio y Fin; el menú se cierra con Escape. Hay etiquetas de formulario, estados anunciados, foco visible y enlace para saltar al contenido.

## Panel de clientes y Firebase

Se conservan la configuración Firebase del archivo recibido y la lógica de inicio de sesión, CRUD, filtros y exportación CSV. El panel adopta la nueva paleta.

**El archivo `firestore.rules` recibido todavía contiene `REEMPLAZA_CON_TU_UID`.** Eso no permite saber qué reglas están publicadas actualmente en tu proyecto. Para configurar o publicar estas reglas, reemplaza ese texto por el UID del administrador autorizado y verifica la configuración en Firebase Console. No publiques la plantilla sin completar ni abras el acceso a todo el mundo.

No se modificaron cuentas, clientes, permisos ni reglas remotas. La comprobación de esta edición no incluyó iniciar sesión ni escribir en la base de datos.

Si utilizas GitHub Pages, el dominio autorizado para Authentication debe ser `rickijdev.github.io`, sin la ruta del repositorio. Si ya estaba configurado, puedes mantenerlo.

## Publicación

### Cualquier hosting estático

Ejecuta `npm run build` y sube **el contenido de `dist`**, conservando su estructura. `index.html` debe estar en la raíz pública. Las rutas de Vite son relativas para funcionar también en una subcarpeta.

No subas `node_modules`, el código de `src` ni el ZIP como reemplazo del contenido web. No edites solamente `dist` si quieres conservar los cambios después de recompilar.

### GitHub Pages mediante Actions

El flujo `.github/workflows/static.yml` ahora instala las dependencias, compila y publica únicamente `dist`. El flujo original subía la raíz del proyecto.

1. Reemplaza los archivos del proyecto en tu repositorio y guarda tus cambios.
2. En GitHub, ve a **Settings → Pages → Source → GitHub Actions**.
3. Haz push a `main` o ejecuta el workflow manualmente.

El ZIP no contiene el historial `.git`. Si ya tienes el repositorio en tu PC, copia los archivos nuevos dentro de esa carpeta conservando su `.git` existente. `node_modules` tampoco está incluido: se genera con `npm ci`.

### Alternativa: rama gh-pages

Si ya publicas desde `gh-pages`, puedes conservar ese método:

```bash
npm ci
npm run deploy
```

El comando compila y publica `dist`. En Settings → Pages, selecciona la rama `gh-pages` y su raíz. Elige un solo método de publicación para evitar despliegues duplicados; si usas la rama, desactiva el workflow automático.

### Firebase Hosting

Se conserva `firebase.json` con `dist` como carpeta pública. Si ya utilizas Firebase CLI, ejecuta primero `npm run build` y después tu flujo habitual. No se realizó ningún despliegue remoto durante esta edición.

## Verificación de esta entrega

- Compilación de producción y comprobación de TypeScript.
- Pruebas DOM de las cuatro piezas, selección repetida, cancelación de acciones al cambiar de pestaña, giro, zoom, restablecimiento y navegación con teclado.
- Pruebas de geometría: cuatro modelos distintos, coordenadas finitas, cambio de pose o luz durante la acción, retorno a la pose inicial y liberación de geometrías y materiales.
- Pruebas de apertura simulada, pasos, menú, planes, comparación, diálogo, formulario, conservación de datos y enlace de WhatsApp.
- Modos normal y movimiento reducido; enlaces internos, identificadores y referencias locales de imágenes.
- La lógica del panel y la configuración Firebase conservan el contenido recibido. No se inició sesión ni se modificó la base de datos.
- **Revisión visual en navegador y renderizado GPU pendientes**: el navegador de este entorno bloqueó el servidor local y el protocolo de archivos. Las pruebas DOM y de geometría no comprueban el aspecto final, el render WebGL real ni la geometría del parallax en dispositivos físicos.

Abre la vista incluida antes de publicar para revisar el diseño y el visor en tu navegador. La alternativa SVG se activa automáticamente si tu equipo no ofrece WebGL 2.

## Recursos y créditos

- Referencia visual: https://stockdutchdesign.com/en/home/
- Interiores creados con IA para Nexo: `public/assets/space-home.webp`, `space-clinic.webp`, `space-office.webp`, `space-studio.webp`. Los prompts completos están en `ASSETS-PROMPTS.json`.
- Son ambientes ilustrativos; no son fotografías de clientes ni casos de instalación reales.
- Fotografía de Ricky: archivo proporcionado en el proyecto original.
- DM Sans: archivos locales y licencia incluida en `FONT-LICENSES.txt`.
- Cormorant Garamond: archivos locales; licencia en `licenses/Cormorant-Garamond-OFL.txt`.
- Modelos 3D e ilustraciones de respaldo creados en código para el proyecto; no corresponden a un plano de fabricación ni a una pieza comercial exacta.
- Se conservan los recursos originales de la UNT, sin usarlos como sello comercial.

Las dependencias y los recursos públicos están incluidos en la versión compilada. Se conserva un único bundle JavaScript para que `ABRIR-WEB.html` funcione sin servidor ni importaciones remotas; por eso el bundle incorpora también Three.js. Vite muestra un aviso de tamaño, sin impedir la compilación.
