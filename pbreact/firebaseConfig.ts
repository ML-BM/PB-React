import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
//const analytics = getAnalytics(app);

export { auth, db };