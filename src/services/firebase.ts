import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let isFirebaseConnected = false;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  
  // Use custom databaseId if configured, or default database
  const databaseId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
    ? firebaseConfig.firestoreDatabaseId
    : undefined;

  db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
  auth = getAuth(app);
  isFirebaseConnected = true;
} catch (error) {
  console.warn('Firebase initialization warning:', error);
}

// Connection check as required by Firebase skill
export async function testFirebaseConnection(): Promise<boolean> {
  if (!db) return false;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client appears offline. Please check connection.');
      return false;
    }
    // Document might not exist, but network reachable
    return true;
  }
}

export { app, db, auth, isFirebaseConnected, firebaseConfig };
