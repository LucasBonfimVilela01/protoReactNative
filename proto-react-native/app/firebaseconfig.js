// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB-ZB80z4Mb3MB683JAT94u7wUamnT4otg",
  authDomain: "bloomyproto.firebaseapp.com",
  projectId: "bloomyproto",
  storageBucket: "bloomyproto.firebasestorage.app",
  messagingSenderId: "412696495238",
  appId: "1:412696495238:web:55bdab649d1e7a01737d07",
  measurementId: "G-4H23XBPSBM"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha a instÃ¢ncia do Firebase Authentication
const auth = getAuth(app);

export { auth };