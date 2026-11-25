/*
  lektion.js – Hilfsskript für alle Kurs-Seiten.

  Jedes Beispiel auf einer Kurs-Seite steht in einem Element mit class="beispiel".
  Dieses Skript liest den HTML-Code des Beispiels aus und zeigt ihn direkt
  darunter als Text an. So siehst du immer beides: das Ergebnis UND den Code.

  Neu hier:
  - querySelectorAll(".beispiel") findet ALLE Elemente mit dieser Klasse.
  - innerHTML liest den HTML-Code eines Elements als Text.
  - <details> und <summary> sind HTML-Elemente zum Auf- und Zuklappen.
*/

// Entfernt die gemeinsame Einrückung aller Zeilen, damit der Code schön linksbündig ist.
function einrueckungEntfernen(text) {
  // Leere Zeilen am Anfang und Ende abschneiden
  const zeilen = text.replace(/^\s*\n/, "").replace(/\s+$/, "").split("\n");

  // Kleinste Einrückung (Anzahl Leerzeichen am Zeilenanfang) suchen
  let kleinste = Infinity;
  for (const zeile of zeilen) {
    if (zeile.trim() === "") continue; // leere Zeilen überspringen
    const leerzeichen = zeile.match(/^ */)[0].length;
    kleinste = Math.min(kleinste, leerzeichen);
  }
  if (kleinste === Infinity) kleinste = 0;

  // Von jeder Zeile genau so viele Zeichen vorne abschneiden
  return zeilen.map(function (zeile) {
    return zeile.slice(kleinste);
  }).join("\n");
}

document.querySelectorAll(".beispiel").forEach(function (beispiel) {
  // Eine Kopie machen und den Konsolen-Kasten (von konsole.js) entfernen,
  // damit nur der echte Code angezeigt wird
  const kopie = beispiel.cloneNode(true);
  kopie.querySelectorAll(".konsole").forEach(function (k) { k.remove(); });
  const code = einrueckungEntfernen(kopie.innerHTML);

  // <details open> ist anfangs aufgeklappt, mit einem Klick auf <summary> geht es zu
  const details = document.createElement("details");
  details.className = "code-box";
  details.open = true;

  const summary = document.createElement("summary");
  summary.textContent = "Code anzeigen";

  // <pre> behält Leerzeichen und Zeilenumbrüche, <code> markiert es als Programmcode.
  // textContent sorgt dafür, dass der Code als TEXT erscheint und nicht ausgeführt wird.
  const pre = document.createElement("pre");
  const codeElement = document.createElement("code");
  codeElement.textContent = code;

  pre.append(codeElement);
  details.append(summary, pre);

  // after() setzt das neue Element direkt HINTER das Beispiel
  beispiel.after(details);
});
