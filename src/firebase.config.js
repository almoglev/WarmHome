import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDakWgDFAOmN4tzrHadWIARQmnT10Gi6T0",
  authDomain: "warm-home-2d7bd.firebaseapp.com",
  projectId: "warm-home-2d7bd",
  storageBucket: "warm-home-2d7bd.appspot.com",
  messagingSenderId: "313269296122",
  appId: "1:313269296122:web:ad1862bf11f3c6fdf86243"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();