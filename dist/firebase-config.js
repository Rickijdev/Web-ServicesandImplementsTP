// Configuración de Firebase para el panel privado de Nexo.
// 1) Crea una app web en Firebase Console.
// 2) Copia los valores de "firebaseConfig" y reemplaza los textos de abajo.
//
// IMPORTANTE: estos datos identifican tu proyecto web, pero NO sustituyen
// las reglas de seguridad. La protección real del listado de clientes está
// en firestore.rules, que debe restringirse a tu UID de administrador.

export const firebaseConfig = {
  apiKey: "REEMPLAZA_API_KEY",
  authDomain: "REEMPLAZA_PROJECT_ID.firebaseapp.com",
  projectId: "REEMPLAZA_PROJECT_ID",
  storageBucket: "REEMPLAZA_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "REEMPLAZA_MESSAGING_SENDER_ID",
  appId: "REEMPLAZA_APP_ID"
};

export const firebaseReady = Object.values(firebaseConfig).every(
  value => typeof value === "string" && value.length > 0 && !value.startsWith("REEMPLAZA_")
);
