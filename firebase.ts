
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAb7bm38owCAJyrJundA2sdp55x0YN-3U0",
  authDomain: "trendbet-45e1c.firebaseapp.com",
  projectId: "trendbet-45e1c",
  storageBucket: "trendbet-45e1c.firebasestorage.app",
  messagingSenderId: "737863877750",
  appId: "1:737863877750:web:30e5cc0d46c7788eca8b57",
  measurementId: "G-JYQB275JGS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
