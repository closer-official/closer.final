// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// ★ここを変更：signInWithPopup を削除し、signInWithRedirect と getRedirectResult を追加
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut, 
    updateProfile,
    GoogleAuthProvider, 
    signInWithRedirect, // 追加：画面遷移でログイン
    getRedirectResult   // 追加：戻ってきた時の処理
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    serverTimestamp, 
    collection, 
    query, 
    orderBy, 
    getDocs, 
    updateDoc, 
    increment 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmPN0z032Uo_ONsronn3smkIixRnBReJw",
  authDomain: "closer-official.firebaseapp.com",
  projectId: "closer-official",
  storageBucket: "closer-official.firebasestorage.app",
  messagingSenderId: "1039215613610",
  appId: "1:1039215613610:web:540ef7a026714e28dbe2d3",
  measurementId: "G-LYK0THB2Z2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
    auth, 
    db, 
    onAuthStateChanged, 
    signOut, 
    updateProfile, 
    doc, 
    setDoc, 
    getDoc, 
    serverTimestamp,
    collection, 
    query, 
    orderBy, 
    getDocs, 
    updateDoc, 
    increment,
    GoogleAuthProvider, 
    signInWithRedirect, // 輸出
    getRedirectResult   // 輸出
};