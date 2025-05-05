if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("✅ Service Worker registrado con éxito!"))
        .catch(error => console.error("❌ Error registrando Service Worker:", error));
}

let deferredPrompt;
const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.style.display = "block";

    installButton.addEventListener("click", () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("✅ Aplicación instalada correctamente!");
            }
        });
    });
});

function saveEntry() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("entry").value.trim();
    const editingIndex = document.getElementById("editingIndex").value;

    if (title && content) {
        let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        if (editingIndex === "") {
            entries.push({ date: new Date().toLocaleDateString(), title, content });
        } else {
            entries[editingIndex] = { date: new Date().toLocaleDateString(), title, content };
        }
        localStorage.setItem("diaryEntries", JSON.stringify(entries));
        resetForm();
        loadEntries();
    }
}

function loadEntries() {
    const entriesList = document.getElementById("entriesList");
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    entriesList.innerHTML = entries.length === 0
        ? '<div class="placeholder">Empieza escribiendo tu primera entrada...</div>'
        : entries.map((entry, index) => `
        <div class="mb-4 p-6 border-2 border-blue-500 rounded-lg bg-white shadow-md w-full">
            <h2 class="text-xl font-bold text-blue-700">${entry.title}</h2>
            <p class="text-gray-600">${entry.date}</p>
        </div>
    `).join('');
}

loadEntries();
