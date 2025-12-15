// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ★ここを修正：必要な機能をすべて追加しました
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

// ★ここも修正：輸出すべき道具をすべて並べました
export { 
    auth, 
    db, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    updateProfile, 
    doc, 
    setDoc, 
    getDoc, 
    serverTimestamp,
    collection, // 追加
    query,      // 追加
    orderBy,    // 追加
    getDocs,    // 追加
    updateDoc,  // 追加
    increment   // 追加
};