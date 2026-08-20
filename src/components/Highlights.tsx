import { Icon } from "./Icon";
import type { HighlightsContent } from "@/lib/types";

/**
 * „Warum Gleis 1".
 *
 * Ab 640 px exakt wie ursprünglich: Icon über der Überschrift, grosszügige
 * Karten, zwei bzw. drei Spalten.
 *
 * Nur auf dem Handy wird umgestellt — dort stehen zwei Karten nebeneinander
 * und das Icon rückt neben die Überschrift, was je Karte rund 50 px spart.
 * Bei ungerader Anzahl nimmt der letzte Eintrag die volle Breite ein.
 */
export function Highlights({ content }: { content: HighlightsContent }) {
  return (
    <section id="highlights" className="section relative bg-surface-warm">
      <div className="container-page">
        <header data-reveal className="max-w-2xl">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title">{content.title}</h2>
        </header>

        <ul className="mt-6 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {content.items.map((item, index) => {
            const isLastOdd =
              content.items.length % 2 === 1 && index === content.items.length - 1;

            return (
              <li
                key={item.id}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className={
                  isLastOdd ? "min-[360px]:col-span-2 sm:col-span-1" : undefined
                }
              >
                <article className="card h-full border-2 p-4 transition-colors duration-200 hover:border-primary sm:p-7">
                  {/* Auf dem Handy eine Zeile (Icon neben Titel), ab 640 px
                      wieder normaler Blockfluss: Icon oben, Titel darunter. */}
                  <div className="flex items-center gap-3 sm:block">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary sm:h-14 sm:w-14 sm:rounded-xl">
                      <Icon name={item.icon} size={22} />
                    </span>
                    <h3 className="min-w-0 break-words font-display text-[0.9375rem] leading-tight hyphens-auto sm:mt-6 sm:text-2xl sm:leading-[1.06]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
                    {item.text}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
