import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDU-FVmPBuC2wNrJvFgZCL7Yt1IkbNhyoQ",
  authDomain: "nona-175e4.firebaseapp.com",
  projectId: "nona-175e4",
  storageBucket: "nona-175e4.firebasestorage.app",
  messagingSenderId: "630472810581",
  appId: "1:630472810581:web:nona-marketing",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
