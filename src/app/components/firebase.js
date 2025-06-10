// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAY_P5ep3xxp88XhJ_djiAHeSfibg8ubrw",
  authDomain: "trading-simulator-440a8.firebaseapp.com",
  projectId: "trading-simulator-440a8",
  storageBucket: "trading-simulator-440a8.appspot.com", 
  messagingSenderId: "398224444164", 
  appId: "1:398224444164:web:01bee014b96c9ffa3a5e51"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
