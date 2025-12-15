// js/firebase-config.js
// ここには「設定」と「道具の準備」だけを書きます

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// あなたのFirebase設定
const firebaseConfig = {
  apiKey: "AIzaSyAmPN0z032Uo_ONsronn3smkIixRnBReJw",
  authDomain: "closer-official.firebaseapp.com",
  projectId: "closer-official",
  storageBucket: "closer-official.firebasestorage.app",
  messagingSenderId: "1039215613610",
  appId: "1:1039215613610:web:540ef7a026714e28dbe2d3",
  measurementId: "G-LYK0THB2Z2"
};

// 初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 他のファイルで使う道具を輸出（エクスポート）する
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, doc, setDoc, getDoc, serverTimestamp };