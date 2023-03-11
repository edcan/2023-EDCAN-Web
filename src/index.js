import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore";
import "firebase/storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKRgWydxXhJ1r8JKYMfO0ZLRdU-L7m1Ck",
  authDomain: "edcan2023.firebaseapp.com",
  projectId: "edcan2023",
  storageBucket: "edcan2023.appspot.com",
  messagingSenderId: "470694882856",
  appId: "1:470694882856:web:6e74c2998bd694431b8f1d",
  measurementId: "G-LM94KMDJQR"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const storage = getStorage();


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
