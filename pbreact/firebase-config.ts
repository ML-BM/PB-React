// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3s5WoSkgYZWYYJUVoAvtcjBDBtUbDV7E",
    authDomain: "pbreact-4a98f.firebaseapp.com",
    databaseURL: "https://pbreact-4a98f-default-rtdb.firebaseio.com",
    projectId: "pbreact-4a98f",
    storageBucket: "pbreact-4a98f.firebasestorage.app",
    messagingSenderId: "353974451954",
    appId: "1:353974451954:web:09682590310538a9ff9a6b",
    measurementId: "G-2EJYC3MF0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);