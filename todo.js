/*
  todo.js – die Logik der To-do-Liste.

  Neu hier:
  - Arrays: Listen von Werten, z. B. ["a", "b", "c"]. Wir speichern darin alle Aufgaben.
  - Objekte: Werte mit Namen, z. B. { text: "Einkaufen", erledigt: false }.
  - Elemente erzeugen: document.createElement("li") baut neues HTML per JavaScript.
  - JSON: wandelt Arrays/Objekte in Text um (und zurück), damit localStorage sie speichern kann.
*/

const form = document.getElementById("todo-form");
const eingabe = document.getElementById("todo-eingabe");
const liste = document.getElementById("todo-liste");
const zaehler = document.getElementById("todo-zaehler");
const loeschenButton = document.getElementById("erledigte-loeschen");

// ----- 1. Aufgaben laden -----

// Unser Array mit allen Aufgaben. Jede Aufgabe ist ein Objekt mit text und erledigt.
let aufgaben = [];

try {
  // JSON.parse macht aus dem gespeicherten Text wieder ein Array.
  aufgaben = JSON.parse(localStorage.getItem("aufgaben")) || [];
} catch (fehler) {
  aufgaben = [];
}

// ----- 2. Hilfsfunktionen -----

// Speichert das Array im Browser. JSON.stringify macht daraus Text.
function speichern() {
  try {
    localStorage.setItem("aufgaben", JSON.stringify(aufgaben));
  } catch (fehler) {
    console.log("Konnte die Aufgaben nicht speichern:", fehler);
  }
}

// Zeichnet die komplette Liste neu, passend zum Array.
// So gibt es nur EINE Stelle, die das HTML der Liste erzeugt.
function anzeigen() {
  // Erst alles leeren ...
  liste.innerHTML = "";

  // ... dann für jede Aufgabe ein <li> bauen. forEach läuft über alle Einträge.
  // "index" ist die Position im Array (0, 1, 2, ...).
  aufgaben.forEach(function (aufgabe, index) {
    const eintrag = document.createElement("li");

    // Checkbox zum Abhaken
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = aufgabe.erledigt;
    checkbox.addEventListener("change", function () {
      aufgaben[index].erledigt = checkbox.checked;
      speichern();
      anzeigen();
    });

    // Der Text der Aufgabe. textContent (nicht innerHTML!) ist sicher,
    // weil eingegebener Text nie als HTML-Code ausgeführt wird.
    const text = document.createElement("span");
    text.textContent = aufgabe.text;

    // classList.add hängt eine CSS-Klasse an. In style.css wird erledigt durchgestrichen.
    if (aufgabe.erledigt) {
      eintrag.classList.add("erledigt");
    }

    // Ein ✕-Button zum Löschen genau dieser Aufgabe
    const entfernen = document.createElement("button");
    entfernen.type = "button";
    entfernen.textContent = "✕";
    entfernen.className = "entfernen";
    entfernen.setAttribute("aria-label", "Aufgabe löschen");
    entfernen.addEventListener("click", function () {
      // splice(index, 1) entfernt 1 Element an der Position index.
      aufgaben.splice(index, 1);
      speichern();
      anzeigen();
    });

    // Die Teile in das <li> stecken und das <li> in die Liste.
    eintrag.append(checkbox, text, entfernen);
    liste.append(eintrag);
  });

  // filter() gibt ein neues Array zurück, nur mit den Einträgen, für die die Bedingung stimmt.
  const offen = aufgaben.filter(function (aufgabe) {
    return !aufgabe.erledigt; // ! bedeutet "nicht"
  }).length;

  if (aufgaben.length === 0) {
    zaehler.textContent = "Keine Aufgaben. Zeit für eine Pause! ☕";
  } else {
    zaehler.textContent = `${offen} von ${aufgaben.length} Aufgaben offen`;
  }
}

// ----- 3. Auf Eingaben reagieren -----

// "submit" passiert, wenn man Enter drückt oder auf "Hinzufügen" klickt.
form.addEventListener("submit", function (event) {
  // Normalerweise lädt ein Formular die Seite neu. Das verhindern wir hier.
  event.preventDefault();

  // trim() entfernt Leerzeichen am Anfang und Ende.
  const neuerText = eingabe.value.trim();
  if (neuerText === "") {
    return; // nichts tun, wenn das Feld leer ist
  }

  // push() hängt ein neues Element hinten an das Array an.
  aufgaben.push({ text: neuerText, erledigt: false });
  speichern();
  anzeigen();

  // Feld leeren und wieder den Cursor hineinsetzen.
  eingabe.value = "";
  eingabe.focus();
});

loeschenButton.addEventListener("click", function () {
  // Nur die NICHT erledigten Aufgaben behalten.
  aufgaben = aufgaben.filter(function (aufgabe) {
    return !aufgabe.erledigt;
  });
  speichern();
  anzeigen();
});

// Beim ersten Laden der Seite die gespeicherten Aufgaben anzeigen.
anzeigen();

/*
  Übungen zum Ausprobieren:
  1. Zeig im Zähler zusätzlich an, wie viele Aufgaben erledigt sind.
  2. Verhindere, dass dieselbe Aufgabe zweimal eingetragen wird.
     (Tipp: aufgaben.some(function (a) { return a.text === neuerText; }))
  3. Füge einen Button "Alle löschen" hinzu, der das Array komplett leert.
*/
