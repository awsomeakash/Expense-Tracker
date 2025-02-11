// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZ9vIZFghgRtzib4HlSLrUvxBT6dcejHk",
    authDomain: "expense-tracker-8f2b0.firebaseapp.com",
    projectId: "expense-tracker-8f2b0",
    storageBucket: "expense-tracker-8f2b0.firebasestorage.app",
    messagingSenderId: "245484811077",
    appId: "1:245484811077:web:42b768ce879b344b13042c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//Authentication
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

//DB
export const firestore = getFirestore(app);