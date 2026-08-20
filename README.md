# Gleis 1 — Kebab & Take Away, Liestal BL

Website für das Take Away an der Poststrasse 7 beim Bahnhof Liestal. Deutsch,
mobile-first, helles Erscheinungsbild in Rot und Gold, ohne externe Dienste.

**Status:** Website fertig. Das Admin-Panel folgt als zweiter Schritt — die
Datenschicht ist bereits darauf vorbereitet (siehe unten).

**Zum Datenstand:** Die **Speisekarte samt Preisen** stammt von der Menütafel im
Lokal (fotografiert, Stand August 2026). Adresse, Telefonnummer, Öffnungszeiten
und die Gesamtbewertung stammen aus öffentlichen Verzeichnissen und sind noch
**nicht vom Betrieb bestätigt**. Es steht kein einziges erfundenes Gästezitat
auf der Seite. Solange `demoMode` in
`content/site.json` auf `true` steht, weist die Seite selbst sichtbar darauf
hin. Die Checkliste vor dem Livegang steht in
[`content/README.md`](./content/README.md).

---

## Loslegen

```bash
npm install
```

```bash
npm run dev
```

Die Seite läuft dann auf <http://localhost:3000>.

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver mit Auto-Reload |
| `npm run build` | Produktions-Build |
| `npm start` | Produktions-Build lokal starten |
| `npm run typecheck` | TypeScript prüfen |
| `npm run check:hours` | Selbsttest der Öffnungszeiten-Logik |
| `npm run deploy` | Testfassung auf GitHub Pages veröffentlichen |

> **Wichtig:** `npm run build` nicht starten, solange `npm run dev` läuft.
> Beide schreiben in denselben Ordner `.next`, und der Build überschreibt die
> Dateien des laufenden Dev-Servers. Die Seite zeigt dann einen „Runtime Error"
> mit einer Meldung wie `Cannot find module './331.js'`.
>
> **Behebung:** Dev-Server stoppen (Strg + C), Ordner `.next` löschen,
> `npm run dev` neu starten.

---

## Testfassung im Netz

<https://4tacocat4.github.io/Gleis-1/>

Diese Fassung ist **vollständig für Suchmaschinen gesperrt** (robots.txt und
`noindex`). Das ist Absicht: Die Seite trägt den echten Namen, die echte
Adresse und die echte Telefonnummer eines bestehenden Betriebs, während die
Öffnungszeiten noch nicht bestätigt sind. Eine indexierte Testkopie würde
den echten Auftritt konkurrenzieren und Gäste in die Irre führen.

Sie wird **automatisch** neu gebaut und veröffentlicht, sobald etwas nach
`main` gepusht wird — siehe [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).
Der Workflow prüft dabei zusätzlich die Typen und lässt den
Öffnungszeiten-Selbsttest laufen; schlägt eines davon fehl, wird nicht
veröffentlicht.

Falls einmal von Hand veröffentlicht werden muss (z. B. ohne Actions):

```bash
npm run deploy
```

---

## Inhalte ändern

Alles, was auf der Seite steht, liegt in [`content/`](./content) als JSON.
Die ausführliche, nicht-technische Anleitung dazu:
[`content/README.md`](./content/README.md).

```
content/
├── site.json          Name, Adresse, Kontakt, Social Media, SEO, Demo-Hinweis
├── pages.json         Texte der Startseite (Hero, Highlights, Über uns, Besuch, Footer)
├── menu.json          Speisekarte: Kategorien, Gerichte, Preise, Kennzeichnungen
├── hours.json         Öffnungszeiten
├── reviews.json       Bewertungen: Gesamtnote mit Quelle, echte Zitate
└── legal.json         Impressum und Datenschutz
```

Vor dem Livegang in `site.json` `demoMode` auf `false` setzen — damit
verschwindet der Vorschau-Hinweis. Zuvor die Punkte unter „Das Wichtigste
zuerst" in [`content/README.md`](./content/README.md) abarbeiten.

---

## Technik

| Bereich | Entscheidung |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS 4, Design-Tokens in `src/app/globals.css` |
| Schriften | Playfair Display SC (Überschriften) + Karla (Fliesstext), über `next/font` selbst gehostet |
| Icons | Phosphor, serverseitig gerendert über `src/components/Icon.tsx` |
| Auslieferung | Alle Seiten statisch vorgerendert |

### Aufbau

```
src/
├── app/
│   ├── layout.tsx           Grundgerüst, Metadaten, Schriften
│   ├── page.tsx             Startseite — bestimmt die Reihenfolge der Sektionen
│   ├── globals.css          Design-Tokens, Basis-Stile, Animationen
│   ├── opengraph-image.tsx  Vorschaubild für WhatsApp/Social, wird generiert
│   ├── sitemap.ts           sitemap.xml
│   ├── robots.ts            robots.txt
│   ├── impressum/, datenschutz/
│   └── not-found.tsx
├── components/              Eine Datei pro Sektion
└── lib/
    ├── types.ts             Datenmodell der gesamten Seite
    ├── content.ts           Zentrale Content-API  ← Andockpunkt fürs Admin-Panel
    ├── hours.ts             Öffnungszeiten-Logik (inkl. Mitternacht, Pausen)
    ├── legal.ts             Rechtstexte
    └── format.ts            Preis- und Telefonformatierung
```

### Warum das so gebaut ist

**Farben und Schriften an einer Stelle.** Der `@theme`-Block in
`src/app/globals.css` definiert die komplette Palette — warmes Rot als
Hauptakzent, Gold als zweiter Akzent, heller Grund. Für ein anderes Lokal
genügt es, dort die Werte zu tauschen — kein Suchen in Komponenten.

Zwei Tokens verdienen eine Erklärung: `--color-primary-text` und
`--color-accent-text` sind dunklere Varianten von Rot und Gold. Die
Palettenfarben erreichen in kleinen Schriftgraden den Kontrastwert 4.5:1 nicht;
diese Stufen tun es, bei praktisch gleichem Farbeindruck. Farbige **Texte**
nutzen deshalb die `-text`-Variante, farbige **Flächen** die Grundfarbe.

**Animationen ohne Bibliothek.** Ein einziger `IntersectionObserver`
(`src/components/ScrollReveal.tsx`) blendet alle Elemente mit `data-reveal`
beim Scrollen ein; die Bewegung selbst läuft rein über CSS und nur über
`opacity` und `transform`. Das bleibt im Compositor und damit auch auf älteren
Android-Geräten flüssig. `prefers-reduced-motion` schaltet alles ab.

**Kein externer Request zur Laufzeit.** Keine Font-CDN, keine Analytics, keine
eingebettete Google-Karte — die Karte ist ein gestalteter Platzhalter, der auf
Google Maps verlinkt. Ergebnis: schneller Aufbau und kein Cookie-Banner nötig.

**Bilder ohne Layout-Sprung.** `SmartImage` zeichnet einen gestalteten
Platzhalter im exakt gleichen Seitenverhältnis wie das spätere Foto. Ein Foto
einzusetzen verändert das Layout deshalb nicht.

**Öffnungszeiten im Browser berechnet.** Der Status „Jetzt geöffnet“ wird nach
dem Laden im Browser ermittelt, immer in `Europe/Zurich`. Dadurch bleibt die
Seite statisch auslieferbar und zeigt trotzdem nie einen veralteten Status.

---

## Barrierefreiheit & SEO

- Semantische Struktur, ein `<h1>`, Sprungmarke „Zum Inhalt springen“
- Textkontraste durchgehend über dem WCAG-AA-Minimum (geprüft bei 375, 768,
  1440 px Breite: keine Verstösse)
- Touch-Flächen mindestens 44 × 44 px
- Sichtbarer Fokusring, Tastaturbedienung, `aria-live` für den Öffnungsstatus
- Strukturierte Daten (`schema.org/Restaurant`) inklusive Speisekarte und
  Öffnungszeiten — bewusst **ohne** `aggregateRating`: Die gezeigte Note stammt
  von einer Plattform und wurde nicht hier erhoben. Sie auszuzeichnen, wäre ein
  Abstrafungsrisiko.
- `sitemap.xml`, `robots.txt`, Open-Graph-Bild, `lang="de-CH"`

---

## Nächster Schritt: Admin-Panel

Die Seite ist so gebaut, dass das Panel ohne Umbau andocken kann:

1. **Alle Inhalte gehen durch `src/lib/content.ts`.** Die Getter sind bereits
   `async`. Für das Panel wird nur der Inhalt dieser Datei auf
   Datenbankabfragen umgestellt — keine einzige Komponente muss angefasst werden.
2. **`src/lib/types.ts` ist das fertige Datenmodell** und lässt sich direkt in
   ein Datenbankschema übersetzen.
3. **Die JSON-Dateien entsprechen den Bereichen der späteren Admin-Navigation:**
   Stammdaten, Texte, Speisekarte, Öffnungszeiten, Bewertungen, Rechtstexte.
4. **Bilder** liegen unter `public/images/` — ein Upload-Bereich schreibt
   künftig dorthin und trägt den Pfad ins jeweilige `image`-Feld ein.

Offen und beim Bau des Panels zu entscheiden: Datenbank (SQLite oder Postgres),
Login-Verfahren und Hosting.
