// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg_YKE_fu4biQGeCRxBwzUoss6mWJW3kc",
  authDomain: "thesis-management-783c2.firebaseapp.com",
  projectId: "thesis-management-783c2",
  storageBucket: "thesis-management-783c2.appspot.com",
  messagingSenderId: "758170392438",
  appId: "1:758170392438:web:c37f369fd1564d4539cc57",
  measurementId: "G-D62HB2VWTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app)
