import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDSJ-h3_V94hRw_7nsJdfcO2O6QEIAdgDs",
  authDomain: "wapum-dev.firebaseapp.com",
  projectId: "wapum-dev",
  storageBucket: "wapum-dev.appspot.com",
  messagingSenderId: "305035758274",
  appId: "1:305035758274:web:68014bd143779d2f6bc95b",
  measurementId: "G-B6ER29HJTC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
