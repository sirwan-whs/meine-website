/*
  seite-02-quiz.js – die Logik des Quiz.

  Neu hier:
  - Ein Array aus Objekten, in dem jedes Objekt selbst ein Array enthält (die Antworten).
  - Zustand ("state"): Variablen, die sich merken, wo wir gerade sind (Frage-Nummer, Punkte).
  - disabled: Buttons sperren, damit man nicht zweimal antworten kann.
  - hidden: Elemente per JavaScript ein- und ausblenden.
*/

// ----- 1. Die Fragen -----
// "richtig" ist die POSITION der richtigen Antwort im Array (Zählung beginnt bei 0!).
const fragen = [
  {
    frage: "Wofür steht HTML?",
    antworten: ["HyperText Markup Language", "Home Tool Making Language", "High Tech Modern Language", "Hyperlink Text Mode Language"],
    richtig: 0,
  },
  {
    frage: "Mit welcher CSS-Eigenschaft änderst du die Textfarbe?",
    antworten: ["font-color", "text-color", "color", "background-color"],
    richtig: 2,
  },
  {
    frage: "Wie legst du in JavaScript eine Variable an, die sich ändern darf?",
    antworten: ["const", "let", "var-change", "dim"],
    richtig: 1,
  },
  {
    frage: "Welcher Git-Befehl lädt deine Commits zu GitHub hoch?",
    antworten: ["git pull", "git commit", "git clone", "git push"],
    richtig: 3,
  },
  {
    frage: "Was macht event.preventDefault() bei einem Formular?",
    antworten: ["Es löscht das Formular", "Es verhindert das Neuladen der Seite", "Es speichert die Eingabe", "Es leert das Eingabefeld"],
    richtig: 1,
  },
];

// ----- 2. Elemente holen -----
const fortschritt = document.getElementById("quiz-fortschritt");
const balken = document.getElementById("quiz-balken");
const frageText = document.getElementById("quiz-frage");
const antwortBox = document.getElementById("quiz-antworten");
const rueckmeldung = document.getElementById("quiz-rueckmeldung");
const weiterButton = document.getElementById("quiz-weiter");
const neustartButton = document.getElementById("quiz-neustart");

// ----- 3. Zustand -----
let aktuelleFrage = 0; // Position im Array "fragen"
let punkte = 0;

// Der Balken soll so viele Schritte haben, wie es Fragen gibt.
balken.max = fragen.length;

// ----- 4. Eine Frage anzeigen -----
function frageAnzeigen() {
  const f = fragen[aktuelleFrage]; // das aktuelle Frage-Objekt

  fortschritt.textContent = `Frage ${aktuelleFrage + 1} von ${fragen.length} · Punkte: ${punkte}`;
  balken.value = aktuelleFrage;
  frageText.textContent = f.frage;
  rueckmeldung.textContent = "";
  weiterButton.hidden = true;

  // Alte Antwort-Buttons entfernen und für jede Antwort einen neuen bauen.
  antwortBox.innerHTML = "";
  f.antworten.forEach(function (antwort, index) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = antwort;
    button.className = "quiz-antwort";
    button.addEventListener("click", function () {
      antwortPruefen(index, button);
    });
    antwortBox.append(button);
  });
}

// ----- 5. Antwort prüfen -----
function antwortPruefen(gewaehlt, geklickterButton) {
  const f = fragen[aktuelleFrage];
  const alleButtons = antwortBox.querySelectorAll("button"); // alle Buttons in der Box

  // Alle Buttons sperren und die richtige Antwort grün markieren.
  alleButtons.forEach(function (button, index) {
    button.disabled = true;
    if (index === f.richtig) {
      button.classList.add("richtig");
    }
  });

  // === vergleicht zwei Werte auf Gleichheit.
  if (gewaehlt === f.richtig) {
    punkte = punkte + 1;
    rueckmeldung.textContent = "Richtig! 🎉";
  } else {
    geklickterButton.classList.add("falsch");
    rueckmeldung.textContent = `Leider falsch. Richtig ist: ${f.antworten[f.richtig]}`;
  }

  fortschritt.textContent = `Frage ${aktuelleFrage + 1} von ${fragen.length} · Punkte: ${punkte}`;

  // Gibt es noch eine Frage? Dann "Weiter" zeigen, sonst das Ergebnis.
  if (aktuelleFrage < fragen.length - 1) {
    weiterButton.hidden = false;
    weiterButton.focus();
  } else {
    ergebnisAnzeigen();
  }
}

// ----- 6. Ergebnis -----
function ergebnisAnzeigen() {
  balken.value = fragen.length;

  // Math.round rundet auf eine ganze Zahl.
  const prozent = Math.round((punkte / fragen.length) * 100);

  let lob;
  if (prozent === 100) {
    lob = "Perfekt! Du bist ein Web-Profi. 🏆";
  } else if (prozent >= 60) {
    lob = "Gut gemacht! 👍";
  } else {
    lob = "Weiter üben, das wird! 💪";
  }

  rueckmeldung.textContent = `Fertig! ${punkte} von ${fragen.length} richtig (${prozent} %). ${lob}`;
  neustartButton.hidden = false;
}

// ----- 7. Buttons "Weiter" und "Nochmal" -----
weiterButton.addEventListener("click", function () {
  aktuelleFrage = aktuelleFrage + 1;
  frageAnzeigen();
});

neustartButton.addEventListener("click", function () {
  aktuelleFrage = 0;
  punkte = 0;
  neustartButton.hidden = true;
  frageAnzeigen();
});

// Los geht's mit der ersten Frage.
frageAnzeigen();

/*
  Übungen zum Ausprobieren:
  1. Füge eine sechste Frage zum Array "fragen" hinzu. (Der Balken passt sich automatisch an!)
  2. Mische die Reihenfolge der Fragen beim Start.
     (Tipp: fragen.sort(function () { return Math.random() - 0.5; }))
  3. Speichere den besten Punktestand mit localStorage und zeig ihn oben an.
*/
