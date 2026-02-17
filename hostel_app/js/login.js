import { auth, db } from "../js/firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

document.getElementById("loginBtn").addEventListener("click", loginUser);

async function loginUser() {
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;

        const snap = await getDoc(doc(db, "users", user.uid));

        if (!snap.exists()) {
            alert("No user data found in Firestore.");
            return;
        }

        const data = snap.data();

        if (data.role === "student") {
            window.location.href = "student-dashboard.html";
        } else if (data.role === "warden") {
            window.location.href = "warden-dashboard.html";
        } else {
            alert("Invalid role in database.");
        }

    } catch (error) {
        console.log(error);
        alert("Login Error: " + error.message);
    }
}
