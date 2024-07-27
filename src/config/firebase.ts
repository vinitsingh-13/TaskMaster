
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbFXmkrBqNPk69Q3Gjt5-yakJUfEQxM0A",
  authDomain: "taskmastertodo.firebaseapp.com",
  databaseURL: "https://taskmastertodo-default-rtdb.firebaseio.com",
  projectId: "taskmastertodo",
  storageBucket: "taskmastertodo.appspot.com",
  messagingSenderId: "977684502626",
  appId: "1:977684502626:web:704401a5ab657a4046593b",
  measurementId: "G-93TM8779CY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()