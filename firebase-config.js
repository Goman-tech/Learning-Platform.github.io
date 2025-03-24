// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6V5QTmH0Rvwvj5kOLINKYLhINQ30wRyM",
    authDomain: "college-management-syste-1863c.firebaseapp.com",
    databaseURL: "https://college-management-syste-1863c-default-rtdb.firebaseio.com",
    projectId: "college-management-syste-1863c",
    storageBucket: "college-management-syste-1863c.firebasestorage.app",
    messagingSenderId: "124590872407",
    appId: "1:124590872407:web:65bdebab2b3cca48a2d012",
    measurementId: "G-3YCGS02BE9"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage(); 