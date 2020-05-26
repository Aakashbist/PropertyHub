import firebase from "firebase";
import '@firebase/firestore';
import FireBaseApiKey from "../resources/firebaseApiKey.js";

const firebaseConfig = {
  apiKey: FireBaseApiKey.FIREBASE_API_KEY,
  authDomain: FireBaseApiKey.AUTH_DOMAIN,
  databaseURL: FireBaseApiKey.DATABASE_URL,
  projectId: FireBaseApiKey.PROJECT_ID,
  storageBucket: FireBaseApiKey.STORAGE_BUCKET,
  messagingSenderId: FireBaseApiKey.MESSAGE_SENDER_ID,
  appId: FireBaseApiKey.APP_ID,
  measurementId: FireBaseApiKey.MEASUREMENT_ID
};

// Initialize Firebase
export const Firebase = firebase.initializeApp(firebaseConfig);

export const getCurrentUser = () => Firebase.auth().currentUser;

export async function getCurrentUserClaims() {
  try {
    const token = await getCurrentUser().getIdTokenResult();
    return token.claims.isOwner;
  } catch {
    return false;
  }
}

export function getServerTimestamp() {
  return firebase.database.ServerValue.TIMESTAMP;
}

