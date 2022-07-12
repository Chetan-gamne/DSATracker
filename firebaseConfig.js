// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import { getFirestore } from "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCfJRs70d89930p_yknmp4riIjusrMpQ-o",
  authDomain: "dsatracker-5faa4.firebaseapp.com",
  projectId: "dsatracker-5faa4",
  storageBucket: "dsatracker-5faa4.appspot.com",
  messagingSenderId: "214889139132",
  appId: "1:214889139132:web:808526e9b8f522486839b9",
});

export const db = getFirestore(app);
export const auth = app.auth();

export default app;
