import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

if (import.meta.env.DEV) {
  const firebaseConfig = {
    apiKey: "AIzaSyBkCT1mHm2fwPXqQ-o2_sG92Z9iGFKsvc4",
    authDomain: "music-app-e8e6a.firebaseapp.com",
    projectId: "music-app-e8e6a",
    storageBucket: "music-app-e8e6a.appspot.com",
    messagingSenderId: "145109003141",
    appId: "1:145109003141:web:f72442d7d555be65ee32ec",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectStorageEmulator(storage, "localhost", 9199);
}

const firebaseConfig = {
  apiKey: "AIzaSyBkCT1mHm2fwPXqQ-o2_sG92Z9iGFKsvc4",
  authDomain: "music-app-e8e6a.firebaseapp.com",
  projectId: "music-app-e8e6a",
  storageBucket: "music-app-e8e6a.appspot.com",
  messagingSenderId: "145109003141",
  appId: "1:145109003141:web:f72442d7d555be65ee32ec",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };
