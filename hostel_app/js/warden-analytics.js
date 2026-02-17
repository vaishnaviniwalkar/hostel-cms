import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const totalBox = document.getElementById("totalComplaints");
const pendingBox = document.getElementById("pendingCount");
const resolvedBox = document.getElementById("resolvedCount");
const logoutBtn = document.getElementById("logoutBtn");

// Protect page
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../index.html";
    }
});

// Logout
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "../index.html";
    });
});

// Load analytics numbers
onSnapshot(collection(db, "complaints"), (snapshot) => {
    let total = 0;
    let pending = 0;
    let resolved = 0;

    snapshot.forEach(doc => {
        total++;
        const status = doc.data().status;

        if (status === "Pending") pending++;
        if (status === "Resolved") resolved++;
    });

    totalBox.innerText = total;
    pendingBox.innerText = pending;
    resolvedBox.innerText = resolved;
});
