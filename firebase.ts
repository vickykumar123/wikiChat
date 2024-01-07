import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: "wikitranslator-saas.firebaseapp.com",
  projectId: "wikitranslator-saas",
  storageBucket: "wikitranslator-saas.appspot.com",
  messagingSenderId: "63331673967",
  appId: "1:63331673967:web:371bb0c934c39b3f866a9a",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
// Here, you initialize specific Firebase services using the app instance (app). getAuth initializes the authentication service, getFirestore initializes the Firestore database service, and getFunctions initializes the Cloud Functions service.

export { db, auth, functions };
