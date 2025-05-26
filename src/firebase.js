// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqcHDxApH0sj_NQ4RcJy1SABXSzP1hUfI",
  authDomain: "cartasdeamor-dbb18.firebaseapp.com",
  projectId: "cartasdeamor-dbb18",
  storageBucket: "cartasdeamor-dbb18.firebasestorage.app",
  messagingSenderId: "306556393806",
  appId: "1:306556393806:web:e585ae7028d91bbceba61f",
  measurementId: "G-B8Q005W0HP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);