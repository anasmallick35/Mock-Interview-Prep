import { initializeApp, FirebaseOptions } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Auth,
  ConfirmationResult,
  RecaptchaVerifier
} from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBl3wdK3b7zBIMABQAS7vsZGusbe6DPlp8',
  authDomain: 'ai-interview-b0856.firebaseapp.com',
  projectId: 'ai-interview-b0856',
  storageBucket: 'ai-interview-b0856.firebasestorage.app',
  messagingSenderId: '334735891624',
  appId: '1:334735891624:web:ba9e5906a12e0f5deeb69d',
  measurementId: 'G-6ZJ3FQVZSH',
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export {
  auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier
};
export type { ConfirmationResult };
