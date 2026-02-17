/* ======================================================
    WARDEN JS — Full Functionality for Dashboard + Complaints
   ====================================================== */

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import {
    collection,
    onSnapshot,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// DOM Elements
const logoutBtn = document.getElementById("logoutBtn");
const complaintList = document.getElementById("complaintList");

let allComplaints = [];

/* ======================================================
    AUTH PROTECTION
====================================================== */
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../index.html";
    }
});

/* ======================================================
    LOGOUT FUNCTION
====================================================== */
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "../index.html";
        });
    });
}

/* ======================================================
    REAL-TIME FIRESTORE LISTENER
====================================================== */

if (complaintList) {
    onSnapshot(collection(db, "complaints"), (snapshot) => {
        allComplaints = [];

        snapshot.forEach((docSnap) => {
            allComplaints.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        // Render Complaints
        renderComplaints(allComplaints);
    });
}

/* ======================================================
    RENDER COMPLAINT CARDS
====================================================== */
function renderComplaints(data) {
    if (!complaintList) return;

    complaintList.innerHTML = "";

    if (data.length === 0) {
        complaintList.innerHTML = `<p>No complaints found.</p>`;
        return;
    }

    data.forEach((c) => {
        complaintList.innerHTML += `
        <div class="complaint-item"
             data-title="${c.title}"
             data-category="${c.category}"
             data-status="${c.status}"
             style="border-left:6px solid ${
                 c.status === "Resolved" ? "#16a34a" :
                 c.status === "In Progress" ? "#f97316" : "#eab308"
             };">
            
            <b>${c.title}</b>
            <p>${c.category} — ${c.location || "Hostel"}</p>
            <p><b>Description:</b> ${c.description}</p>
            <p><b>Status:</b> ${c.status}</p>

            <button class="btn" onclick="updateStatus('${c.id}', 'In Progress')"
                style="background:#f97316; margin-right:8px;">
                Mark In Progress
            </button>

            <button class="btn" onclick="updateStatus('${c.id}', 'Resolved')"
                style="background:#16a34a;">
                Mark Resolved
            </button>
        </div>
        `;
    });
}

/* ======================================================
    UPDATE COMPLAINT STATUS
====================================================== */
window.updateStatus = async function (id, newStatus) {
    await updateDoc(doc(db, "complaints", id), {
        status: newStatus
    });
    alert("Status updated successfully!");
};

/* ======================================================
    FILTERS FOR DASHBOARD
====================================================== */
window.filterComplaints = function (type) {
    if (type === "all") {
        renderComplaints(allComplaints);
    } else {
        const filtered = allComplaints.filter(c => c.status === type);
        renderComplaints(filtered);
    }
};
