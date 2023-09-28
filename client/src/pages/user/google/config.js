
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOnmwp0xfNQtgYGApwQUSifBmZUpLdCf8",
  authDomain: "tourpackage-d6fc7.firebaseapp.com",
  projectId: "tourpackage-d6fc7",
  storageBucket: "tourpackage-d6fc7.appspot.com",
  messagingSenderId: "24407860111",
  appId: "1:24407860111:web:a85f1645aca0b568aa21fa",
  measurementId: "G-CLK3SX28VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };