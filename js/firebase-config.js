// ▼▼▼ ここを修正しました（URL形式に変更） ▼▼▼
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ▼▼▼ あなたの鍵情報（そのまま使います） ▼▼▼
const firebaseConfig = {
  apiKey: "AIzaSyAmPN0z032Uo_ONsronn3smkIixRnBReJw",
  authDomain: "closer-official.firebaseapp.com",
  projectId: "closer-official",
  storageBucket: "closer-official.firebasestorage.app",
  messagingSenderId: "1039215613610",
  appId: "1:1039215613610:web:540ef7a026714e28dbe2d3",
  measurementId: "G-LYK0THB2Z2"
};

// アプリの初期化
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// 機能を配る
export { auth, db, analytics, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, doc, setDoc, getDoc, serverTimestamp };