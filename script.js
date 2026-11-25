/*
  script.js – das VERHALTEN der Website.
  JavaScript macht die Seite interaktiv: auf Klicks reagieren, Text ändern, rechnen ...

  Tipp: Drück im Browser F12 und öffne den Reiter "Konsole".
  Dort siehst du Ausgaben von console.log() und eventuelle Fehler.
*/

// Eine Zeile mit // ist ein Kommentar. Der Browser ignoriert sie.
console.log("script.js wurde geladen!");

// ----- 1. Aktuelles Jahr im Footer anzeigen -----

// document.getElementById("jahr") sucht im HTML das Element mit id="jahr".
// "const" legt eine Variable an, deren Wert sich nicht mehr ändert.
const jahrElement = document.getElementById("jahr");

// new Date() ist das heutige Datum, .getFullYear() holt daraus das Jahr (z. B. 2026).
// .textContent setzt den Text innerhalb des Elements.
jahrElement.textContent = new Date().getFullYear();

// ----- 2. Auf den Button reagieren -----

const button = document.getElementById("gruss-button");
const grussText = document.getElementById("gruss-text");

// "let" legt eine Variable an, die sich ändern darf. Wir zählen damit die Klicks.
let anzahlKlicks = 0;

// addEventListener("click", ...) sagt: "Wenn jemand auf den Button klickt, führe diese Funktion aus."
button.addEventListener("click", function () {
  anzahlKlicks = anzahlKlicks + 1; // Zähler um 1 erhöhen

  // Mit `Backticks` und ${...} kann man Variablen direkt in Text einsetzen.
  grussText.textContent = `Hallo! Du hast ${anzahlKlicks}-mal geklickt. 🎉`;
  if (anzahlKlicks >= 5) {
    grussText.textContent = "Wow, du bist ein Klick-Meister! 🏆";
  }
});

/*
  Kleine Übungen zum Ausprobieren:
  1. Ändere in style.css die Farbe bei --akzent und lade die Seite neu.
  2. Füge in index.html einen weiteren <li>-Punkt zu deinen Lernzielen hinzu.
  3. Lass den Button nach 5 Klicks einen anderen Text anzeigen.
     (Tipp: if (anzahlKlicks >= 5) { ... })
*/
