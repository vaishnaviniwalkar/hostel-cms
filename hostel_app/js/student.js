import { auth, db } from "./firebase.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const logoutBtn = document.getElementById("logoutBtn");
const welcomeText = document.getElementById("welcomeText");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const resolvedCount = document.getElementById("resolvedCount");

const recentBox = document.getElementById("recentComplaints");

// Logout function
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "../index.html";
    });
});

// Protect page + load data
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../index.html";
        return;
    }

    welcomeText.textContent = "Welcome, " + (user.displayName || "Student");

    loadComplaints(user.uid);
});

// Load complaints from Firestore
function loadComplaints(uid) {
    const q = query(collection(db, "complaints"), where("studentId", "==", uid));

    onSnapshot(q, (snapshot) => {
        let total = 0, pending = 0, resolved = 0;
        recentBox.innerHTML = "";

        snapshot.forEach((doc) => {
            const c = doc.data();
            total++;

            if (c.status === "Pending") pending++;
            if (c.status === "Resolved") resolved++;

            recentBox.innerHTML += `
                <div class="complaint-item">
                    <b>${c.title}</b>
                    <p>${c.category} • ${c.location} • ${c.date}</p>
                    <p><b>Status:</b> ${c.status}</p>
                </div>
            `;
        });

        // Update Stats
        totalCount.textContent = total;
        pendingCount.textContent = pending;
        resolvedCount.textContent = resolved;
    });
}
