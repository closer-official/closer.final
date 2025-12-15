// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { 
    getAuth, 
    onAuthStateChanged, 
    signOut, 
    updateProfile,
    GoogleAuthProvider, 
    signInWithPopup 
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
    where, // ★ここに追加しました！
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
    where, // ★ここにも追加しました！
    getDocs, 
    updateDoc, 
    increment,
    GoogleAuthProvider, 
    signInWithPopup
};