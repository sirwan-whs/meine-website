/*
  konsole.js – zeigt console.log() direkt auf der Seite an.

  Normalerweise sieht man console.log() nur in den Entwicklertools (F12 → Konsole).
  Auf den JavaScript-Kursseiten soll man die Ausgabe aber direkt beim Beispiel sehen.
  Dieses Skript "umhüllt" console.log: Es ruft das echte console.log auf UND schreibt
  die Ausgabe in einen schwarzen Kasten im jeweiligen Beispiel.

  Wichtig: Diese Datei muss im <head> stehen, damit sie vor den Beispielen geladen wird.
  Du musst diesen Code nicht verstehen, er ist nur ein Werkzeug für den Kurs.
*/

(function () {
  // Das zuletzt angeklickte Beispiel. Für Ausgaben, die erst nach einem Klick passieren.
  let letztesBeispiel = null;
  document.addEventListener("click", function (e) {
    const b = e.target.closest && e.target.closest(".beispiel");
    if (b) letztesBeispiel = b;
  }, true);
  document.addEventListener("input", function (e) {
    const b = e.target.closest && e.target.closest(".beispiel");
    if (b) letztesBeispiel = b;
  }, true);

  // Wandelt einen Wert in lesbaren Text um
  function alsText(wert) {
    if (typeof wert === "string") return wert;
    if (wert === undefined) return "undefined";
    if (typeof wert === "function") return "ƒ " + (wert.name || "anonym") + "()";
    if (wert instanceof Error) return wert.name + ": " + wert.message;
    if (wert instanceof HTMLElement) return "<" + wert.tagName.toLowerCase() + ">";
    if (typeof wert === "object" && wert !== null) {
      try { return JSON.stringify(wert); } catch (e) { return String(wert); }
    }
    return String(wert);
  }

  // Sucht oder erzeugt den Ausgabe-Kasten eines Beispiels
  function kastenFuer(beispiel) {
    let kasten = beispiel.querySelector(":scope > .konsole");
    if (!kasten) {
      kasten = document.createElement("pre");
      kasten.className = "konsole";
      kasten.setAttribute("aria-label", "Konsolen-Ausgabe");
      beispiel.append(kasten);
    }
    return kasten;
  }

  function umhuellen(art) {
    const original = console[art].bind(console);
    console[art] = function (...werte) {
      original(...werte); // das echte console.log trotzdem ausführen
      const skript = document.currentScript;
      const beispiel = (skript && skript.closest(".beispiel")) || letztesBeispiel;
      if (!beispiel) return;
      const zeile = document.createElement("div");
      zeile.className = "konsole-" + art;
      zeile.textContent = werte.map(alsText).join(" ");
      kastenFuer(beispiel).append(zeile);
    };
  }

  ["log", "info", "warn", "error"].forEach(umhuellen);

  // Ungefangene Fehler auch im Beispiel anzeigen
  window.addEventListener("error", function (e) {
    const skript = document.currentScript;
    const beispiel = (skript && skript.closest(".beispiel")) || letztesBeispiel;
    if (!beispiel) return;
    const zeile = document.createElement("div");
    zeile.className = "konsole-error";
    zeile.textContent = "❌ " + e.message;
    kastenFuer(beispiel).append(zeile);
  });
})();
