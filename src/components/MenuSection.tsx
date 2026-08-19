import { Icon } from "./Icon";
import { MenuBadge } from "./MenuBadge";
import { MenuCategoryNav } from "./MenuCategoryNav";
import { SmartImage } from "./SmartImage";
import { getFeaturedItems } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import type { Menu, MenuItem, MenuSectionContent } from "@/lib/types";

interface MenuSectionProps {
  content: MenuSectionContent;
  menu: Menu;
}

/**
 * Speisekarte — der Hauptinhalt der Seite.
 *
 * Auf das Handy hin gebaut: Empfehlungen und Gerichte stehen ab 360 px zu
 * zweit nebeneinander statt untereinander. Das halbiert die Höhe der Karte,
 * ohne dass etwas verloren geht — auf dem Handy sucht man einen Namen und
 * einen Preis, nicht einen Fliesstext. Beschreibungen erscheinen deshalb erst
 * ab 640 px.
 *
 * Unter 360 px bleibt es bei einer Spalte: Dort wäre eine Zelle nur noch rund
 * 109 px breit — schmaler als das Abzeichen „Hausspezialität".
 */
export function MenuSection({ content, menu }: MenuSectionProps) {
  const featured = getFeaturedItems(menu, 4);

  return (
    <section id="speisekarte" className="section relative scroll-mt-24">
      <div className="container-page">
        {/* Bewusst flach gehalten: Der Weg zur Karte soll kurz sein, nicht
            zeremoniell. */}
        <header data-reveal className="max-w-2xl">
          {content.eyebrow && <span className="eyebrow">{content.eyebrow}</span>}
          <h2 className="section-title !text-[clamp(1.75rem,7vw,3rem)]">
            {content.title}
          </h2>
          <p className="lead mt-2.5">{content.intro}</p>
        </header>

        {/* Preishinweis bewusst nicht ausblendbar, solange die Preise nicht
            bestätigt sind — er steht direkt über den ersten Beträgen. */}
        {menu.priceNotice && (
          <p
            data-reveal
            className="mt-5 flex items-start gap-2 rounded-xl border-2 border-accent/30 bg-accent/[0.07] px-3.5 py-2.5 text-sm font-semibold text-accent-text"
          >
            <Icon name="sparkle" size={18} className="mt-0.5 shrink-0" />
            {menu.priceNotice}
          </p>
        )}

        {featured.length > 0 && (
          <ul className="mt-7 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {featured.map((item, index) => (
              <li
                key={item.id}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
              >
                <article className="card h-full border-2 transition-colors duration-200 hover:border-primary">
                  <SmartImage
                    image={item.image}
                    ratio="4 / 3"
                    sizes="(min-width: 1024px) 25vw, 46vw"
                    fallbackLabel={item.name}
                  />

                  <div className="p-3 sm:p-5">
                    <p className="hidden text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-accent-text sm:block">
                      {item.categoryName}
                    </p>
                    <h3 className="break-words font-display text-[0.9375rem] leading-snug hyphens-auto sm:mt-2 sm:text-xl">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 hidden text-[0.9375rem] text-muted-foreground sm:line-clamp-2 sm:block">
                      {item.description}
                    </p>
                    <p className="tnum mt-2 text-[0.9375rem] font-bold text-primary-text sm:mt-4 sm:text-lg">
                      {menu.currency} {formatPrice(item.price)}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {/* Vollständige Karte */}
        <div className="mt-10">
          <MenuCategoryNav
            categories={menu.categories.map(({ id, name }) => ({ id, name }))}
          />

          <div className="mt-7 flex flex-col gap-8">
            {menu.categories.map((category) => (
              <section
                key={category.id}
                id={`kategorie-${category.id}`}
                aria-labelledby={`kategorie-${category.id}-titel`}
                className="scroll-mt-40"
              >
                <div data-reveal className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3
                    id={`kategorie-${category.id}-titel`}
                    className="font-display text-xl sm:text-3xl"
                  >
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="hidden text-[0.9375rem] text-muted-foreground sm:block">
                      {category.description}
                    </p>
                  )}
                </div>

                <div className="rule mt-2.5" />

                <ul className="mt-3 grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
                  {category.items.map((item) => (
                    <li key={item.id} data-reveal>
                      <MenuRow item={item} currency={menu.currency} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {menu.note && (
            <p className="mt-8 max-w-2xl text-sm text-muted-foreground">{menu.note}</p>
          )}
        </div>
      </div>
    </section>
  );
}

function MenuRow({ item, currency }: { item: MenuItem; currency: string }) {
  const hasVariants = Boolean(item.variants?.length);

  return (
    <div className="h-full rounded-lg border border-border bg-card px-3 py-2.5 transition-colors duration-200 hover:border-primary">
      {/* break-words als harte Absicherung: Chrome trennt lange deutsche
          Komposita in schmalen Spalten auch mit hyphens-auto nicht zuverlässig. */}
      <h4 className="break-words text-[0.9375rem] font-bold leading-snug hyphens-auto">
        {item.name}
      </h4>

      {item.description && (
        <p className="mt-1 hidden text-[0.9375rem] leading-relaxed text-muted-foreground sm:block">
          {item.description}
        </p>
      )}

      <p className="tnum mt-1.5 text-[0.9375rem] font-bold text-primary-text">
        {item.price === null ? (
          <span className="text-sm font-semibold text-muted-foreground">
            auf Anfrage
          </span>
        ) : (
          <>
            {hasVariants && (
              <span className="mr-1 text-xs font-semibold text-muted-foreground">
                ab
              </span>
            )}
            <span className="mr-1 text-xs font-semibold text-muted-foreground">
              {currency}
            </span>
            {formatPrice(item.price)}
          </>
        )}
      </p>

      {hasVariants && (
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
          {item.variants?.map((variant) => (
            <span key={variant.label} className="tnum text-sm text-muted-foreground">
              {variant.label}{" "}
              <span className="font-semibold text-foreground">
                {currency} {formatPrice(variant.price)}
              </span>
            </span>
          ))}
        </div>
      )}

      {item.badges && item.badges.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {item.badges.map((badge) => (
            <MenuBadge key={badge} badge={badge} />
          ))}
        </div>
      )}
    </div>
  );
}
