import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

/* ============ SIGNUP FUNCTION ============ */

export async function signupUser(name, email, password, role, room) {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role,
      room: role === "student" ? room : "NA"
    });

    alert("Account created successfully!");

    if (role === "student") {
      window.location.href = "login.html";
    } else {
      window.location.href = "login.html";
    }

  } catch (error) {
    alert("Signup Error: " + error.message);
  }
}
