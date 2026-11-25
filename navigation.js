/*
  navigation.js – EINE Navigation für ALLE Seiten.

  Statt die Links in jede HTML-Datei zu kopieren, stehen alle Seiten
  hier in einem Array. Das Skript baut daraus:
  - die Links und eine Seiten-Auswahl oben im Header (<nav id="navigation">)
  - die Übersicht auf der Startseite (<div id="seiten-liste">), nach Bereichen gruppiert
  - "← vorherige" und "nächste →" unten auf jeder Seite (<div id="blaettern">)

  👉 Neue Seite? Einfach unten im Array "seiten" eine Zeile ergänzen. Fertig.
*/

const seiten = [
  { nummer: 1, datei: "seite-01-todo.html", bereich: "Projekte", titel: "To-do-Liste", thema: "Formulare, Arrays, localStorage" },
  { nummer: 2, datei: "seite-02-quiz.html", bereich: "Projekte", titel: "Quiz", thema: "Objekte, if/else, CSS Grid" },
  { nummer: 3, datei: "seite-03-html-grundlagen.html", bereich: "HTML", titel: "HTML Grundlagen", thema: "Elemente, Attribute, Überschriften, Text, Kommentare" },
  { nummer: 4, datei: "seite-04-html-links-bilder-listen-tabellen.html", bereich: "HTML", titel: "Links, Bilder, Listen, Tabellen", thema: "a, img, ul/ol/dl, table" },
  { nummer: 5, datei: "seite-05-html-formulare.html", bereich: "HTML", titel: "HTML Formulare", thema: "form, input-Typen, select, textarea, Validierung" },
  { nummer: 6, datei: "seite-06-html-semantik-medien.html", bereich: "HTML", titel: "Semantik und Medien", thema: "header/main/footer, Block/Inline, Audio, Video, iframe, Entities" },
  { nummer: 7, datei: "seite-07-css-grundlagen.html", bereich: "CSS", titel: "CSS Grundlagen", thema: "Einbinden, Selektoren, Farben, Hintergründe, Einheiten, Kaskade, Variablen" },
  { nummer: 8, datei: "seite-08-css-boxmodell.html", bereich: "CSS", titel: "Box-Modell", thema: "padding, margin, border, Größen, box-sizing, display, overflow, Schatten" },
  { nummer: 9, datei: "seite-09-css-text-schrift.html", bereich: "CSS", titel: "Text und Schrift", thema: "Text, Schriften, Web Fonts, Links, Listen, Tabellen, Cursor" },
  { nummer: 10, datei: "seite-10-css-position-pseudo.html", bereich: "CSS", titel: "Position und Pseudo-Klassen", thema: "position, z-index, float, :hover, :nth-child, ::before, ::after" },
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
  // Link zur Startseite
  const start = document.createElement("a");
  start.href = "index.html";
  start.textContent = "Start";
  if (aktuelleDatei === "index.html") {
    start.classList.add("aktiv");
  }
  nav.append(start);

  // Bei vielen Seiten wäre eine Link-Reihe zu lang. Deshalb eine Auswahlliste (<select>).
  const auswahl = document.createElement("select");
  auswahl.className = "seiten-auswahl";
  auswahl.setAttribute("aria-label", "Seite wählen");

  // Erste Option als Hinweis
  const hinweis = document.createElement("option");
  hinweis.textContent = "Seite wählen …";
  hinweis.value = "";
  auswahl.append(hinweis);

  for (const seite of seiten) {
    const option = document.createElement("option");
    option.value = seite.datei;
    option.textContent = `${seite.nummer}. ${seite.titel}`;
    if (seite.datei === aktuelleDatei) {
      option.selected = true; // aktuelle Seite vorauswählen
    }
    auswahl.append(option);
  }

  // "change" passiert, wenn man eine andere Option wählt. Dann zur Seite springen.
  auswahl.addEventListener("change", function () {
    if (auswahl.value !== "") {
      location.href = auswahl.value;
    }
  });

  nav.append(auswahl);
}

// ----- 2. Übersicht auf der Startseite, nach Bereichen gruppiert -----

const seitenListe = document.getElementById("seiten-liste");

if (seitenListe) {
  // Alle Bereiche ohne Doppelte sammeln. new Set(...) entfernt doppelte Werte.
  const bereiche = [...new Set(seiten.map(function (s) { return s.bereich; }))];

  for (const bereich of bereiche) {
    const ueberschrift = document.createElement("h3");
    ueberschrift.textContent = bereich;

    const liste = document.createElement("ol");
    liste.className = "seiten-liste";

    // Nur die Seiten dieses Bereichs
    const passende = seiten.filter(function (s) { return s.bereich === bereich; });

    for (const seite of passende) {
      const eintrag = document.createElement("li");
      eintrag.value = seite.nummer; // <li value="3"> zeigt die echte Seitennummer

      const link = document.createElement("a");
      link.href = seite.datei;
      link.textContent = seite.titel;

      const thema = document.createElement("small");
      thema.textContent = ` – ${seite.thema}`;

      eintrag.append(link, thema);
      liste.append(eintrag);
    }

    seitenListe.append(ueberschrift, liste);
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
