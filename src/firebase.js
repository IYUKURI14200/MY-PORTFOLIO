import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (import.meta.env.DEV) {
  const missing = Object.entries(firebaseConfig)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  console.info(
    "[firebase] projectId:", firebaseConfig.projectId || "MISSING",
    missing.length ? `| missing values: ${missing.join(", ")}` : "| all values present"
  );
}

const app = initializeApp(firebaseConfig);

// Long-polling auto-detect fixes hanging writes on networks/extensions
// that interfere with Firestore's default streaming connection.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

const TIMEOUT_MS = 15000;

export async function saveMessage({ name, email, subject, message }) {
  const write = addDoc(collection(db, "messages"), {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    createdAt: serverTimestamp(),
  });

  const timeout = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error("Timed out waiting for Firestore (check network, ad blocker, .env, database)")),
      TIMEOUT_MS
    )
  );

  await Promise.race([write, timeout]);
}