/*
  theme.js – Hell/Dunkel-Schalter für ALLE Seiten.
  Weil beide Seiten diese Datei einbinden, schreiben wir den Code nur einmal.

  Neu hier:
  - localStorage: ein kleiner Speicher im Browser. Was dort steht, bleibt
    auch nach dem Neuladen oder Schließen des Tabs erhalten.
  - Attribute setzen: Wir schreiben data-theme="dark" an das <html>-Element.
    In style.css gibt es eine Regel, die darauf reagiert und die Farben ändert.
*/

const themeButton = document.getElementById("theme-button");

// document.documentElement ist das <html>-Element ganz oben.
const html = document.documentElement;

// Eine Funktion ist ein wiederverwendbarer Code-Block mit einem Namen.
// "modus" ist ein Parameter: ein Wert, den man beim Aufruf mitgibt ("hell" oder "dunkel").
function setzeModus(modus) {
  if (modus === "dunkel") {
    html.setAttribute("data-theme", "dark");
    themeButton.textContent = "☀️ Hell";
  } else {
    html.removeAttribute("data-theme");
    themeButton.textContent = "🌙 Dunkel";
  }

  // Merken, was gewählt wurde. try/catch fängt Fehler ab, falls der Browser
  // den Speicher blockiert (z. B. im privaten Modus). Dann geht es einfach ohne weiter.
  try {
    localStorage.setItem("modus", modus);
  } catch (fehler) {
    console.log("Konnte den Modus nicht speichern:", fehler);
  }
}

// Beim Laden der Seite: gespeicherten Modus lesen, sonst "hell".
let gespeicherterModus = "hell";
try {
  gespeicherterModus = localStorage.getItem("modus") || "hell";
} catch (fehler) {
  // nichts tun, wir bleiben bei "hell"
}
setzeModus(gespeicherterModus);

// Beim Klick umschalten. Der ? : Operator ist eine Kurzform von if/else:
//   bedingung ? wertWennJa : wertWennNein
themeButton.addEventListener("click", function () {
  const istDunkel = html.getAttribute("data-theme") === "dark";
  setzeModus(istDunkel ? "hell" : "dunkel");
});
