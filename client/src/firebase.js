import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase config is available
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

let auth = null;
let googleProvider = null;
let facebookProvider = null;

if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    facebookProvider = new FacebookAuthProvider();
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message);
  }
} else {
  console.warn('Firebase configuration not found. Social login features will be disabled.');
}

export { auth, googleProvider, facebookProvider };
