import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import { 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const room = document.getElementById("room").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      room: room,
      role: "student"
    });

    alert("Signup Successful!");
    window.location.href = "student-dashboard.html";

  } catch (error) {
    alert(error.message);
  }
});
