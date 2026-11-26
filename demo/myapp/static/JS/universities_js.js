// URL-ul API-ului pentru România
const API_URL = "http://universities.hipolabs.com/search?country=Romania";

const status = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
const exportBtn = document.getElementById("exportBtn");

let all = [];
let currentFiltered = []; // Păstrăm referința și pentru datele filtrate

function setStatus(text) {
  status.textContent = text;
}

function render(data) {
  tbody.innerHTML = data.map(u => {
    const site = u.web_pages?.[0]
      ? `<a href="${u.web_pages[0]}" target="_blank">${u.web_pages[0]}</a>`
      : "";
    return `
      <tr>
        <td>${u.name || ""}</td>
        <td>${u.country || ""}</td>
        <td>${site}</td>
      </tr>`;
  }).join("");
}

async function loadUniversities() {
  setStatus("Se încarcă...");
  tbody.innerHTML = "";
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    all = data;
    currentFiltered = all;
    render(all);
    setStatus(`Încărcat (${all.length} rezultate).`);
  } catch {
    setStatus("Eroare la încărcare. Încearcă din nou.");
  }
}

// Filtrare dinamică la tastare
qInput.addEventListener("input", () => {
  const q = qInput.value.trim().toLowerCase();
  currentFiltered = q
    ? all.filter(u => (u.name || "").toLowerCase().includes(q))
    : all;
  
  render(currentFiltered);
  setStatus(`Filtrate: ${currentFiltered.length} din ${all.length}.`);
});

// Funcția de Export CSV (Folosește interfața Blob)
function exportCSV(data) {
  if (!data.length) return alert("Nu există date de exportat.");
  
  const header = ["Nume", "Țara", "Site"];
  const rows = data.map(u => [
    u.name || "",
    u.country || "",
    (u.web_pages && u.web_pages[0]) || ""
  ]);
  
  const csvContent = [header, ...rows]
    .map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(","))
    .join("\n");
  
  // Creare Blob
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "universitati_romania.csv";
  a.click();
  
  URL.revokeObjectURL(url);
}

// Ascultător pentru butonul de export
exportBtn.addEventListener("click", () => {
  exportCSV(currentFiltered);
});

// Apel inițial la încărcare
loadUniversities();