import { Icon } from "./Icon";
import type { HighlightsContent } from "@/lib/types";

/**
 * „Warum Gleis 1" — zwei Karten nebeneinander statt drei untereinander.
 *
 * Das Icon steht neben der Überschrift statt darüber; allein das spart je
 * Karte rund 50 px. Bei ungerader Anzahl nimmt der letzte Eintrag die volle
 * Breite ein und wirkt gesetzt statt vergessen.
 */
export function Highlights({ content }: { content: HighlightsContent }) {
  return (
    <section id="highlights" className="section relative bg-surface-warm">
      <div className="container-page">
        <header data-reveal className="max-w-2xl">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title !text-[clamp(1.75rem,7vw,3rem)]">
            {content.title}
          </h2>
        </header>

        <ul className="mt-6 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {content.items.map((item, index) => {
            const isLastOdd =
              content.items.length % 2 === 1 && index === content.items.length - 1;

            return (
              <li
                key={item.id}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className={isLastOdd ? "min-[360px]:col-span-2 lg:col-span-1" : undefined}
              >
                <article className="card h-full border-2 p-4 transition-colors duration-200 hover:border-primary sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary sm:h-14 sm:w-14 sm:rounded-xl">
                      <Icon name={item.icon} size={22} />
                    </span>
                    <h3 className="min-w-0 break-words font-display text-[0.9375rem] leading-tight hyphens-auto sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
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
