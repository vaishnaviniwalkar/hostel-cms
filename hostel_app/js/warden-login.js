import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const wardenForm = document.getElementById("wardenLoginForm");

wardenForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) {
      alert("User record missing!");
      return;
    }

    const data = snap.data();

    if (data.role === "warden") {
      window.location.href = "warden-dashboard.html";
    } else {
      alert("You are not authorized as a warden.");
    }

  } catch (error) {
    alert(error.message);
  }
});
