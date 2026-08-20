/**
 * Statisches Kartenbild für den Besuch-Bereich erzeugen.
 *
 * Warum nicht einfach eine eingebettete Karte? Eine Google-Maps-Einbettung
 * (oder Leaflet mit Live-Tiles) lädt bei jedem Seitenaufruf von fremden
 * Servern nach, setzt Cookies und kostet Ladezeit. Die ganze Seite kommt
 * bewusst ohne solche Requests aus — deshalb werden die Kacheln hier
 * **einmalig beim Entwickeln** heruntergeladen und als fertiges Bild in
 * public/images/ abgelegt. Zur Laufzeit passiert nichts mehr.
 *
 * Quelle: OpenStreetMap. Die Lizenz (ODbL) verlangt eine sichtbare
 * Namensnennung — sie steht im Besuch-Bereich unter der Karte.
 *
 * Aufruf:  node scripts/build-map.mjs
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const LAT = 47.4831772;
const LON = 7.7335616;
const ZOOM = 17;
// Angezeigt wird die Karte höchstens ~640 CSS-Pixel breit. 1200 px reichen
// damit auch für Retina-Displays; 1400 war unnötig schwer, und beim
// statischen Export liefert Next.js die Datei ungerechnet aus.
const WIDTH = 1200;
const HEIGHT = 525; // 16:7, passend zum Seitenverhältnis der Karte im Layout
const TILE = 256;

const UA = "Gleis1-Website/1.0 (statisches Kartenbild, einmaliger Build)";

/** Weltpixel-Koordinaten nach Web-Mercator. */
function project(lat, lon, zoom) {
  const scale = TILE * 2 ** zoom;
  const x = ((lon + 180) / 360) * scale;
  const sin = Math.sin((lat * Math.PI) / 180);
  const y = (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale;
  return { x, y };
}

async function fetchTile(z, x, y) {
  const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Kachel ${z}/${x}/${y}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

const center = project(LAT, LON, ZOOM);
const left = Math.round(center.x - WIDTH / 2);
const top = Math.round(center.y - HEIGHT / 2);

const tileX0 = Math.floor(left / TILE);
const tileY0 = Math.floor(top / TILE);
const tileX1 = Math.floor((left + WIDTH) / TILE);
const tileY1 = Math.floor((top + HEIGHT) / TILE);

const cols = tileX1 - tileX0 + 1;
const rows = tileY1 - tileY0 + 1;
console.log(`Lade ${cols * rows} Kacheln (Zoom ${ZOOM}) …`);

const composites = [];
for (let ty = tileY0; ty <= tileY1; ty++) {
  for (let tx = tileX0; tx <= tileX1; tx++) {
    const buf = await fetchTile(ZOOM, tx, ty);
    composites.push({
      input: buf,
      left: tx * TILE - tileX0 * TILE,
      top: ty * TILE - tileY0 * TILE,
    });
    // Höflich bleiben: die OSM-Kachelserver sind ein Freiwilligenprojekt.
    await new Promise((r) => setTimeout(r, 120));
  }
}

const stitched = await sharp({
  create: {
    width: cols * TILE,
    height: rows * TILE,
    channels: 3,
    background: { r: 242, g: 239, b: 233 },
  },
})
  .composite(composites)
  .png()
  .toBuffer();

// Ausschnitt so wählen, dass das Lokal genau in der Mitte liegt.
const cropped = await sharp(stitched)
  .extract({
    left: left - tileX0 * TILE,
    top: top - tileY0 * TILE,
    width: WIDTH,
    height: HEIGHT,
  })
  .toBuffer();

// Markierung in den Farben der Seite (--color-primary #dc2626).
const markerSize = 92;
const marker = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${markerSize}" height="${markerSize}" viewBox="0 0 92 92">
  <circle cx="46" cy="46" r="30" fill="#dc2626" opacity="0.18"/>
  <circle cx="46" cy="46" r="19" fill="#dc2626" stroke="#ffffff" stroke-width="5"/>
  <circle cx="46" cy="46" r="6" fill="#ffffff"/>
</svg>`);

const withMarker = await sharp(cropped)
  .composite([
    {
      input: marker,
      left: Math.round(WIDTH / 2 - markerSize / 2),
      top: Math.round(HEIGHT / 2 - markerSize / 2),
    },
  ])
  .toBuffer();

await sharp(withMarker)
  .webp({ quality: 76 })
  .toFile("public/images/karte-liestal.webp");

// Bewusst nur WebP: Alles in public/ wird beim statischen Export
// mitausgeliefert, ein ungenutztes JPEG wäre reiner Ballast. WebP wird von
// allen aktuellen Browsern unterstützt.
const meta = await sharp(withMarker).metadata();
writeFileSync(
  "public/images/karte-liestal.txt",
  `Kartenausschnitt Poststrasse 7, 4410 Liestal\n` +
    `Koordinaten: ${LAT}, ${LON} (Zoom ${ZOOM})\n` +
    `Erzeugt mit scripts/build-map.mjs\n` +
    `Kartendaten © OpenStreetMap-Mitwirkende, ODbL\n`,
);

console.log(`Fertig: ${meta.width}×${meta.height} → public/images/karte-liestal.webp`);
