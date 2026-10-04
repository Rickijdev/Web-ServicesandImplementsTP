// Configuración de Firebase para el panel privado de Nexo.
// 1) Crea una app web en Firebase Console.
// 2) Copia los valores de "firebaseConfig" y reemplaza los textos de abajo.
//
// IMPORTANTE: estos datos identifican tu proyecto web, pero NO sustituyen
// las reglas de seguridad. La protección real del listado de clientes está
// en firestore.rules, que debe restringirse a tu UID de administrador.

export const firebaseConfig = {
  apiKey: "AIzaSyAVL5c3yrnOplatnK7NXjEQS8VDUBp05cQ",
  authDomain: "servicesandesp32.firebaseapp.com",
  projectId: "servicesandesp32",
  storageBucket: "servicesandesp32.firebasestorage.app",
  messagingSenderId: "580306930699",
  appId: "1:580306930699:web:ed4be7eff6b317f2a2cb0e",
  measurementId: "G-X1DMTV5P6N"
};

export const firebaseReady = Object.values(firebaseConfig).every(
  value => typeof value === "string" && value.length > 0 && !value.startsWith("REEMPLAZA_")
);
