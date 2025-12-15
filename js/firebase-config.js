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
    where, 
    getDocs, 
    updateDoc, 
    increment 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ★追加：画像保存用の機能
import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmPN0z032Uo_ONsronn3smkIixRnBReJw",
  authDomain: "closer-official.firebaseapp.com",
  projectId: "closer-official",
  storageBucket: "closer-official.firebasestorage.app", // ←ここが重要
  messagingSenderId: "1039215613610",
  appId: "1:1039215613610:web:540ef7a026714e28dbe2d3",
  measurementId: "G-LYK0THB2Z2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ★追加

export { 
    auth, 
    db, 
    storage, // ★追加
    ref,     // ★追加
    uploadBytes, // ★追加
    getDownloadURL, // ★追加
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
    where,
    getDocs, 
    updateDoc, 
    increment,
    GoogleAuthProvider, 
    signInWithPopup
};