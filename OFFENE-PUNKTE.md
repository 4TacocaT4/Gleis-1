# Offene Punkte vor dem Livegang

> **Diese Liste vor dem Abschluss des Projekts durchgehen.**
> Sie enthält Angaben, die auf der Seite stehen, aber noch nicht bestätigt sind.

---

## 1. Speisekarte: drei Stellen sind abgelesen, nicht gesichert

Die Karte in [`content/menu.json`](./content/menu.json) stammt von den
abfotografierten Menütafeln im Lokal (Stand August 2026). An drei Stellen lag
ein Lichtreflex über der Tafel — diese Werte sind **die beste Lesart, keine
gesicherte Angabe**:

| Gericht | Eingetragen | Was unklar ist |
| --- | --- | --- |
| **Döner Box** | Klein CHF 10.00 / Gross CHF 12.00 | Zwei Preise mit gedrehter Beschriftung daneben. Gelesen als „klein" oben, „gross" unten — die Zuordnung ist unsicher. |
| **Döner Teller** | CHF 18.00 | Die erste Ziffer lag unter einer Reflexion, nur die 8 war sicher. Auffällig: Das Schnitzel-Menü **inklusive Getränk** kostet CHF 17.00. |
| **Pide Spinat** | „Mit Schafskäse und Spinat." | Auf der Tafel folgt nach „mit Schafskäse," eine zweite Zutatenzeile, die komplett verdeckt war. |

Kleinere Ergänzung aus eigenem Schluss:

- **Pide Sucuk** hatte keine Zutatenzeile auf der Tafel. Eingetragen:
  „Mit türkischer Knoblauchwurst."

**Zu tun:** Im Lokal kurz auf die Tafel schauen und die vier Einträge
korrigieren oder bestätigen.

---

## 2. Betriebsdaten aus öffentlichen Verzeichnissen

Diese Angaben in [`content/site.json`](./content/site.json) und
[`content/hours.json`](./content/hours.json) sind **nicht vom Betrieb
bestätigt**:

- Adresse und Telefonnummer
- Sämtliche Öffnungszeiten
- Die Google-Gesamtnote (3.9 aus 231 Bewertungen) in
  [`content/reviews.json`](./content/reviews.json)

**Zu tun:** Mit dem Betrieb abgleichen. Danach den Hinweis `note` in
`hours.json` und `asOf` in `reviews.json` entfernen bzw. aktualisieren.

---

## 3. Rechtstexte

[`content/legal.json`](./content/legal.json) enthält die echten Firmendaten aus
dem Handelsregister (Gleis 1 Take Away GmbH, UID CHE-262.813.970), aber:

- E-Mail-Adresse fehlt
- MWST-Nummer fehlt, falls mehrwertsteuerpflichtig
- Hosting-Anbieter und Aufbewahrungsdauer im Datenschutz fehlen

**Zu tun:** Ergänzen und die Texte rechtlich prüfen lassen.

---

## 4. Bilder

Es sind noch keine echten Fotos hinterlegt — überall stehen gestaltete
Platzhalter. Anleitung dazu in [`content/README.md`](./content/README.md)
unter „Bilder einsetzen".

---

## 5. Erst ganz zum Schluss

- `demoMode` in `content/site.json` auf `false` setzen — damit verschwindet der
  Vorschau-Hinweis auf der Seite.
- `seo.siteUrl` von `https://example.ch` auf die echte Domain ändern.
- Die Suchmaschinen-Sperre fällt automatisch weg, sobald nicht mehr nach
  GitHub Pages deployt wird (sie hängt an `GITHUB_PAGES=true`). Vorher prüfen,
  dass Punkte 1–3 erledigt sind — sonst geht eine Seite mit unbestätigten
  Zeiten und Preisen in den Google-Index.
