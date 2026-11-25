/*
  navigation.js – EINE Navigation für ALLE Seiten.

  Statt die Links in jede HTML-Datei zu kopieren, stehen alle Seiten
  hier in einem Array. Das Skript baut daraus:
  - die Links oben im Header (<nav id="navigation">)
  - die Übersicht auf der Startseite (<ol id="seiten-liste">)
  - "← vorherige" und "nächste →" unten auf jeder Seite (<div id="blaettern">)

  👉 Neue Seite? Einfach unten im Array "seiten" eine Zeile ergänzen. Fertig.
*/

const seiten = [
  { nummer: 1, datei: "seite-01-todo.html", titel: "To-do-Liste", thema: "Formulare, Arrays, localStorage" },
  { nummer: 2, datei: "seite-02-quiz.html", titel: "Quiz", thema: "Objekte, if/else, CSS Grid" },
];

// ----- Welche Seite ist gerade offen? -----

// location.pathname ist der Pfad in der Adresszeile, z. B. "/meine-website/seite-02-quiz.html".
// split("/") zerlegt ihn an jedem "/", pop() nimmt das letzte Stück: den Dateinamen.
// Ist der Pfad leer (z. B. ".../meine-website/"), ist es die Startseite.
const aktuelleDatei = location.pathname.split("/").pop() || "index.html";

// findIndex() gibt die Position der passenden Seite im Array zurück, oder -1, wenn keine passt.
const aktuellePosition = seiten.findIndex(function (seite) {
  return seite.datei === aktuelleDatei;
});

// ----- 1. Navigation im Header -----

const nav = document.getElementById("navigation");

if (nav) {
  // Eine kleine Hilfsfunktion, die einen Link baut.
  function linkBauen(ziel, text) {
    const link = document.createElement("a");
    link.href = ziel;
    link.textContent = text;
    // Den Link zur aktuellen Seite markieren (CSS macht ihn unterstrichen).
    if (ziel === aktuelleDatei) {
      link.classList.add("aktiv");
      link.setAttribute("aria-current", "page");
    }
    return link; // "return" gibt das fertige Element an den Aufrufer zurück
  }

  nav.append(linkBauen("index.html", "Start"));

  // for...of ist eine weitere Schleife: läuft über jedes Element des Arrays.
  for (const seite of seiten) {
    nav.append(linkBauen(seite.datei, `${seite.nummer}. ${seite.titel}`));
  }
}

// ----- 2. Übersicht auf der Startseite -----

const seitenListe = document.getElementById("seiten-liste");

if (seitenListe) {
  for (const seite of seiten) {
    const eintrag = document.createElement("li");
    const link = document.createElement("a");
    link.href = seite.datei;
    link.textContent = seite.titel;

    const thema = document.createElement("small");
    thema.textContent = ` – ${seite.thema}`;

    eintrag.append(link, thema);
    seitenListe.append(eintrag);
  }
}

// ----- 3. Blättern: vorherige / nächste Seite -----

const blaettern = document.getElementById("blaettern");

// Nur auf nummerierten Seiten (Position ist nicht -1).
if (blaettern && aktuellePosition !== -1) {
  const vorherige = seiten[aktuellePosition - 1]; // undefined, wenn es keine gibt
  const naechste = seiten[aktuellePosition + 1];

  // Vorherige Seite, sonst zurück zur Startseite
  const zurueck = document.createElement("a");
  if (vorherige) {
    zurueck.href = vorherige.datei;
    zurueck.textContent = `← ${vorherige.nummer}. ${vorherige.titel}`;
  } else {
    zurueck.href = "index.html";
    zurueck.textContent = "← Start";
  }
  blaettern.append(zurueck);

  if (naechste) {
    const weiter = document.createElement("a");
    weiter.href = naechste.datei;
    weiter.textContent = `${naechste.nummer}. ${naechste.titel} →`;
    blaettern.append(weiter);
  }
}
