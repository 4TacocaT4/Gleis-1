import { Logo } from "./Logo";

/**
 * Markentafel im Hero — dieselbe Wortmarke wie in der Kopfzeile, nur gross,
 * auf einer dunklen Fläche mit Bahnmotiv.
 *
 * Sie steht dort, wo sonst ein Foto liegt. Sobald in
 * `content/pages.json → hero.image.src` ein Pfad eingetragen ist, zeigt der
 * Hero wieder das Foto — die Tafel ist der Zustand ohne Bild, nicht ein
 * Ersatz für immer.
 *
 * Das Motiv nimmt den Namen auf: Schwellen und zwei Schienen unten, darüber
 * die gelb-schraffierte Perronkante. Alles reine CSS-Verläufe, dadurch keine
 * zusätzliche Datei und in jeder Auflösung scharf.
 */
export function BrandPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`relative isolate overflow-hidden bg-foreground ${className}`}>
      {/* Warmer Schein von oben, damit die Fläche nicht flach wirkt. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 65% at 50% 12%, rgba(220,38,38,0.5), transparent 62%)",
        }}
      />

      {/* Gleisbett: Schwellen als Streifenmuster, darüber zwei Schienen. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%]">
        <div
          className="h-full w-full"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(254,242,242,0.16) 0 7px, transparent 7px 30px)",
          }}
        />
        <div className="absolute inset-x-0 top-[26%] h-[3px] bg-background/40" />
        <div className="absolute inset-x-0 top-[64%] h-[3px] bg-background/40" />
      </div>

      {/* Perronkante. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2.5"
        style={{
          background:
            "repeating-linear-gradient(45deg, var(--color-accent) 0 9px, rgba(69,10,10,0.9) 9px 18px)",
        }}
      />

      <div className="absolute inset-0 grid place-items-center p-6">
        <Logo size="xl" withTagline onDark />
      </div>
    </div>
  );
}
