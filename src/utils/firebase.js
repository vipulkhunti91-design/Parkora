import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Real Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey.trim() !== '' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId.trim() !== ''
);

// Initialize Firebase safely
let app = null;
let auth = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export { auth };

// Helper to format Firebase user into Parkora user profile
export function formatFirebaseUser(user) {
  if (!user) return null;
  return {
    id: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    phone: user.phoneNumber || '',
    picture: user.photoURL || null,
    provider: user.providerData?.[0]?.providerId || 'password',
  };
}

// 1. Google Sign-In with Firebase OAuth Popup
export async function signInWithGoogleFirebase() {
  if (!isFirebaseConfigured || !auth) {
    throw new Error(
      'Firebase is not configured. Please add your Firebase credentials (VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, etc.) in .env'
    );
  }
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  return formatFirebaseUser(result.user);
}

// 2. Apple Sign-In with Firebase OAuth
export async function signInWithAppleFirebase() {
  if (!isFirebaseConfigured || !auth) {
    throw new Error(
      'Firebase is not configured. Please add your Firebase credentials in .env'
    );
  }
  const provider = new OAuthProvider('apple.com');
  provider.addScope('email');
  provider.addScope('name');
  const result = await signInWithPopup(auth, provider);
  return formatFirebaseUser(result.user);
}

// 3. Twitter / X Sign-In with Firebase OAuth
export async function signInWithTwitterFirebase() {
  if (!isFirebaseConfigured || !auth) {
    throw new Error(
      'Firebase is not configured. Please add your Firebase credentials in .env'
    );
  }
  const provider = new TwitterAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return formatFirebaseUser(result.user);
}

// 4. Email/Password Login
export async function loginWithEmailFirebase(email, password) {
  if (!isFirebaseConfigured || !auth) {
    throw new Error(
      'Firebase is not configured. Please add your Firebase credentials in .env'
    );
  }
  const result = await signInWithEmailAndPassword(auth, email, password);
  return formatFirebaseUser(result.user);
}

// 5. Email/Password Sign Up with Name & Phone
export async function registerWithEmailFirebase(email, password, displayName, phone) {
  if (!isFirebaseConfigured || !auth) {
    throw new Error(
      'Firebase is not configured. Please add your Firebase credentials in .env'
    );
  }
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName && result.user) {
    try {
      await updateProfile(result.user, { displayName });
    } catch (e) {
      console.warn('Could not update profile name:', e);
    }
  }
  const formatted = formatFirebaseUser(result.user);
  if (phone) formatted.phone = phone;
  return formatted;
}

// 6. Sign Out
export async function signOutFirebase() {
  if (auth) {
    await signOut(auth);
  }
}

// 7. Subscribe to Auth State Changes
export function subscribeToAuthChanges(callback) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, (user) => {
    callback(formatFirebaseUser(user));
  });
}
