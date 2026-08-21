/**
 * Bildmarke: Perrontafel mit der Gleisnummer.
 *
 * Die Form nimmt den Namen auf — eine Tafel mit der Nummer, darunter die
 * goldene Perronkante, wie sie auch im Hero über die Markentafel läuft. Eine
 * Ecke bleibt eckig; das unterscheidet die Marke von den vielen Zahlen in
 * abgerundeten Quadraten und bleibt bis hinunter auf 16 px erkennbar.
 *
 * Die Ziffer ist als Pfad gezeichnet, nicht als Schrift gesetzt: Dieselbe
 * Zeichnung liegt als `public/icon.svg` im Browser-Tab, und dort steht keine
 * Webschrift zur Verfügung.
 *
 * Die Farben sind bewusst fest eingetragen statt über Tokens gezogen — eine
 * Marke wechselt die Farbe nicht mit dem Umfeld. Sie entsprechen
 * `--color-primary`, `--color-background` und `--color-accent-on-dark`.
 * Wer sie ändert, ändert sie auch in `public/icon.svg`.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M24 0 H100 V76 A24 24 0 0 1 76 100 H24 A24 24 0 0 1 0 76 V24 A24 24 0 0 1 24 0 Z"
        fill="#dc2626"
      />
      <path d="M28 25 L44 15 L62 15 L62 67 L44 67 L44 27 L28 37 Z" fill="#fef2f2" />
      <rect x="22" y="75" width="56" height="9" rx="4.5" fill="#e8b04b" />
    </svg>
  );
}
