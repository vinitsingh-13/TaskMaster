// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCbFXmkrBqNPk69Q3Gjt5-yakJUfEQxM0A",
  authDomain: "taskmastertodo.firebaseapp.com",
  projectId: "taskmastertodo",
  storageBucket: "taskmastertodo.appspot.com",
  messagingSenderId: "977684502626",
  appId: "1:977684502626:web:649b3fd846f94f7d46593b",
  measurementId: "G-951X9V6FH1",
  databaseURL:"https://taskmastertodo-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export  const auth = getAuth()