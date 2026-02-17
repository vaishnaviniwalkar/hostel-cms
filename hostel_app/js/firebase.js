/* ======================================================
   Firebase Initialization (Browser ES Modules Version)
   ====================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

/* ======================================================
   Your Firebase Config
   ====================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyDnZ5OOcFQkpPRVbwJIIln8rXAMZiR9ppA",
  authDomain: "hostel-cms.firebaseapp.com",
  projectId: "hostel-cms",
//   storageBucket: "hostel-cms.firebasestorage.app",
  storageBucket: "hostel-cms.appspot.com",
  messagingSenderId: "1070341505799",
  appId: "1:1070341505799:web:61d1d4f4a9ef8f7da8fba2"
};

/* ======================================================
   Initialize Firebase
   ====================================================== */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
