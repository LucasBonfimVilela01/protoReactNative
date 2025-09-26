// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Carrega configuração do Firebase a partir de variáveis de ambiente.
// No desenvolvimento local você pode manter um arquivo `.env` que não deve
// ser commitado. No CI (GitHub Actions) injetaremos essas variáveis a partir
// dos GitHub Secrets.
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validação mínima para ajudar a detectar falta de variáveis no CI
const missing = Object.entries(firebaseConfig).filter(([, v]) => !v).map(([k]) => k);
if (missing.length) {
  // Não lançar em produção do app mobile — apenas log para desenvolvedores.
  // Se preferir, transforme em throw para falhar rápido no CI.
  // eslint-disable-next-line no-console
  console.warn("Firebase config incompleta. Variáveis faltando:", missing);
}

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha a instÃ¢ncia do Firebase Authentication
const auth = getAuth(app);

export { auth };