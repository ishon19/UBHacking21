// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcuQPrv4ecWj5rhYWbyWR_wHg4swsv_bM",
  authDomain: "ub-hacking-27144.firebaseapp.com",
  projectId: "ub-hacking-27144",
  storageBucket: "ub-hacking-27144.appspot.com",
  messagingSenderId: "299832788601",
  appId: "1:299832788601:web:18646bbb28edb5dd9eb6a8",
  measurementId: "G-9C5HV07XG3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = app.auth();
const db = getFirestore(app);

console.log("db: ", db);

export { db };
