
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
  
  import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,
    signOut,

   } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";


  import { getFirestore,
    setDoc, 
    doc, getDoc, updateDoc, addDoc, collection, deleteDoc, getDocs
    
 } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"; 
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDseabs5L4lukLhBc6McyeX24ETHBwvEOw",
    authDomain: "user-authentication-b874c.firebaseapp.com",
    projectId: "user-authentication-b874c",
    storageBucket: "user-authentication-b874c.appspot.com",
    messagingSenderId: "291164069457",
    appId: "1:291164069457:web:849e07fc4e7a3d96c26270",
    measurementId: "G-MVVQPJPEGC"
  };

  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth =getAuth(app);
  const db = getFirestore(app);

  console.log(db);
  

  export {  auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    db,
    doc,
    setDoc, getDoc, updateDoc, addDoc, collection, deleteDoc, getDocs
  };