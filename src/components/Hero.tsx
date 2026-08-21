import { BrandPanel } from "./BrandPanel";
import { Icon } from "./Icon";
import { OpenStatus } from "./OpenStatus";
import { SmartImage } from "./SmartImage";
import type { HeroContent, OpeningHours, SiteConfig } from "@/lib/types";

interface HeroProps {
  hero: HeroContent;
  site: SiteConfig;
  hours: OpeningHours;
}

/**
 * Hero-Centric-Aufbau: Der Hero beherrscht den ersten Bildschirm, hat genau
 * eine primäre Handlungsaufforderung (Speisekarte), und der nächste Abschnitt
 * bleibt am unteren Rand angeschnitten sichtbar.
 */
export function Hero({ hero, site, hours }: HeroProps) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-surface-warm"
      style={{ paddingTop: "calc(var(--header-height) + 2rem)" }}
    >
      {/* Warmer Verlauf als Grundton, statisch und damit gratis. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 78% 8%, rgba(220,38,38,0.10), transparent 58%), linear-gradient(180deg, #fff7f5 0%, #fef2f2 100%)",
        }}
      />

      <div className="container-page pb-14 sm:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Textspalte */}
          <div className="lg:col-span-6">
            <div data-reveal className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{hero.eyebrow}</span>
              <OpenStatus hours={hours} />
            </div>

            <h1
              className="mt-6 font-display font-bold"
              style={{ fontSize: "clamp(2.75rem, 9vw, 5.25rem)", lineHeight: 0.98 }}
            >
              {hero.titleLines.map((line, index) => (
                <span
                  key={line}
                  data-reveal
                  style={{ "--reveal-delay": `${60 + index * 70}ms` } as React.CSSProperties}
                  className="block"
                >
                  {/* Die letzte Zeile trägt den Hauptakzent. */}
                  {index === hero.titleLines.length - 1 ? (
                    <span className="text-primary">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p
              data-reveal
              style={{ "--reveal-delay": "280ms" } as React.CSSProperties}
              className="lead mt-6"
            >
              {hero.subtitle}
            </p>

            {/* Genau eine primäre Aktion; der Anruf ist bewusst
                zurückhaltender gestaltet. */}
            <div
              data-reveal
              style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a href={hero.primaryCta.href} className="btn btn-primary">
                {hero.primaryCta.label}
                <Icon name="arrowRight" size={20} />
              </a>
              <a href={hero.secondaryCta.href} className="btn btn-secondary">
                <Icon name="phone" size={20} />
                <span className="tnum">{hero.secondaryCta.label}</span>
              </a>
            </div>

            <ul
              data-reveal
              style={{ "--reveal-delay": "400ms" } as React.CSSProperties}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5"
            >
              {hero.facts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-center gap-2 text-[0.9375rem] font-semibold text-foreground-soft"
                >
                  <Icon name="check" size={18} className="shrink-0 text-primary" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Bildspalte */}
          <div
            data-reveal
            style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            className="relative lg:col-span-6"
          >
            {/* Ohne hinterlegtes Foto steht hier die Markentafel statt eines
                grauen Platzhalters. Ein Pfad in hero.image.src schaltet
                automatisch auf das Foto um. */}
            {hero.image?.src ? (
              <SmartImage
                image={hero.image}
                ratio={null}
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="aspect-[5/4] rounded-2xl border-2 border-border shadow-[0_24px_60px_-30px_rgba(69,10,10,0.45)] sm:aspect-[16/10] lg:aspect-[4/3]"
              />
            ) : (
              <BrandPanel className="aspect-[5/4] rounded-2xl border-2 border-border shadow-[0_24px_60px_-30px_rgba(69,10,10,0.45)] sm:aspect-[16/10] lg:aspect-[4/3]" />
            )}

            {/* Adresskarte, überlappt das Bild und schafft Tiefe. */}
            <div className="mt-4 flex items-start gap-3 rounded-xl border-2 border-border bg-card p-4 sm:absolute sm:bottom-5 sm:left-5 sm:mt-0 sm:max-w-[17rem] sm:shadow-lg">
              <Icon name="pin" size={22} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-[0.9375rem] leading-snug">
                <span className="font-bold">{site.address.street}</span>
                <br />
                <span className="tnum">{site.address.zip}</span> {site.address.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
