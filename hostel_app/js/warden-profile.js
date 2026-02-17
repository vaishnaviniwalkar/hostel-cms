import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const nameField = document.getElementById("wardenName");
const emailField = document.getElementById("wardenEmail");
const phoneField = document.getElementById("wardenPhone");

const saveBtn = document.getElementById("saveProfileBtn");
const logoutBtn = document.getElementById("logoutBtn");
const statusMsg = document.getElementById("statusMsg");

let userRef;

// Protect page & load data
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "../index.html";
        return;
    }

    emailField.value = user.email;

    userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
        const data = snap.data();
        nameField.value = data.name || "";
        phoneField.value = data.phone || "";
    }
});

// Save Profile
saveBtn.addEventListener("click", async () => {
    statusMsg.textContent = "Saving...";

    await updateDoc(userRef, {
        name: nameField.value,
        phone: phoneField.value
    });

    statusMsg.textContent = "Profile updated successfully!";
    statusMsg.style.color = "green";
});

// Logout
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "../index.html";
    });
});
