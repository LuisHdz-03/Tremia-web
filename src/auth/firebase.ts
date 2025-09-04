import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
}

const missing = Object.entries(cfg)
  .filter(([_, v]) => !v)
  .map(([k]) => k)

if (missing.length) {
  const msg = `Faltan variables de entorno Firebase: ${missing.join(', ')}. Asegúrate de definirlas en .env.local con prefijo VITE_.`
  // Registrar para facilitar debugging
  // eslint-disable-next-line no-console
  console.error(msg)
  throw new Error(msg)
}

const firebaseConfig = cfg as Required<typeof cfg>

// Avoid re-initializing in HMR
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export default app
