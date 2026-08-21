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
`hours.json` entfernen bzw. aktualisieren. Dass die Bewertung noch nicht
bestätigt ist, steht zurzeit im Vorschau-Hinweis (`demoNotice` in
`site.json`) — er verschwindet mit `demoMode: false`, also erst, wenn die
Zahlen stimmen.

---

## 3. Rechtstexte

[`content/legal.json`](./content/legal.json) enthält die echten Firmendaten aus
dem Handelsregister (Gleis 1 Take Away GmbH, UID CHE-262.813.970), aber:

- E-Mail-Adresse fehlt
- MWST-Nummer fehlt, falls mehrwertsteuerpflichtig
- Hosting-Anbieter und Aufbewahrungsdauer im Datenschutz fehlen

**Zu tun:** Ergänzen und die Texte rechtlich prüfen lassen.

---

## 4. Bilder sind Platzhalter aus einer Bilddatenbank

Seit 2026-08-21 stehen echte Fotos auf der Seite — aber **nicht aus dem
Lokal**. Es sind Aufnahmen von [Pexels](https://www.pexels.com/license/)
(kostenlos, kommerziell nutzbar, keine Namensnennung nötig). Die genaue
Zuordnung steht in [`public/images/BILDNACHWEIS.txt`](./public/images/BILDNACHWEIS.txt).

| Wo | Datei | Zeigt |
| --- | --- | --- |
| Döner Kebab | `doener-kebab.webp` | Einen Döner, nicht den von Gleis 1 |
| Dürüm Kebab | `duerum-kebab.webp` | Einen Dürüm, nicht den von Gleis 1 |
| Pepito | `pepito.webp` | Ein Baguette, nicht das von Gleis 1 |
| Falafel im Taschenbrot | `falafel-taschenbrot.webp` | Falafel, nicht die von Gleis 1 |
| Über uns | `lokal.webp` | Einen fremden Drehspiess, nicht das Lokal |

Im Kopfbereich steht bewusst kein Foto, sondern die Wortmarke. Ein echtes
Logo des Betriebs würde sie ersetzen; ein gutes Foto aus dem Lokal ebenso
(Pfad in `content/pages.json` unter `hero.image.src` eintragen).

**Warum das vor dem Livegang weg muss:** Ein Foto neben „Döner Kebab
CHF 10.00" liest sich als Zusage, wie das Gericht aussieht. Und das Bild
im Abschnitt „Über uns" behauptet, das Lokal zu zeigen. Beides trifft
zurzeit nicht zu.

**Zu tun:** Mit dem Handy im Lokal fotografieren und ersetzen — gleiche
Dateinamen genügen, dann muss nichts angepasst werden. Anleitung in
[`content/README.md`](./content/README.md) unter „Bilder einsetzen".
Gut brauchbar sind Aufnahmen bei Tageslicht ohne Blitz; Gesichter von
Gästen oder Mitarbeitenden nur mit deren Einverständnis.

---

## 5. Erst ganz zum Schluss

- `demoMode` in `content/site.json` auf `false` setzen — damit verschwindet der
  Vorschau-Hinweis auf der Seite.
- `seo.siteUrl` von `https://example.ch` auf die echte Domain ändern.
- Die Suchmaschinen-Sperre fällt automatisch weg, sobald nicht mehr nach
  GitHub Pages deployt wird (sie hängt an `GITHUB_PAGES=true`). Vorher prüfen,
  dass Punkte 1–3 erledigt sind — sonst geht eine Seite mit unbestätigten
  Zeiten und Preisen in den Google-Index.
