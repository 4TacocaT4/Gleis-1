import Image from "next/image";
import { Icon } from "./Icon";
import { OpenStatus } from "./OpenStatus";
import { OpeningHoursTable } from "./OpeningHoursTable";
import { telHref } from "@/lib/format";
import type { OpeningHours, SiteConfig, VisitContent } from "@/lib/types";

interface VisitProps {
  content: VisitContent;
  site: SiteConfig;
  hours: OpeningHours;
}

export function Visit({ content, site, hours }: VisitProps) {
  const { address, contact } = site;
  const query =
    address.mapsQuery || `${site.name}, ${address.street}, ${address.zip} ${address.city}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <section id="besuch" className="section relative">
      <div className="container-page">
        <header data-reveal className="max-w-2xl">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title">{content.title}</h2>
          <p className="lead mt-4">{content.intro}</p>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Öffnungszeiten */}
          <div data-reveal className="card border-2 p-6 sm:p-8 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex min-w-0 items-center gap-2.5 font-display text-xl sm:text-2xl">
                <Icon name="clock" size={24} className="text-primary" />
                Öffnungszeiten
              </h3>
              <OpenStatus hours={hours} compact />
            </div>

            <div className="mt-5">
              <OpeningHoursTable hours={hours} />
            </div>
          </div>

          {/* Kontakt & Anfahrt */}
          <div
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            className="card flex flex-col border-2 p-6 sm:p-8 lg:col-span-7"
          >
            <h3 className="flex items-center gap-2.5 font-display text-2xl">
              <Icon name="pin" size={24} className="text-primary" />
              Adresse &amp; Kontakt
            </h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <address className="not-italic">
                <p className="font-bold">{site.name}</p>
                <p className="mt-1 text-muted-foreground">
                  {address.street}
                  <br />
                  <span className="tnum">{address.zip}</span> {address.city}
                  <br />
                  {address.region}
                </p>
                {address.hint && (
                  <p className="mt-3 text-sm text-muted-foreground">{address.hint}</p>
                )}
              </address>

              <div className="flex flex-col items-start gap-3">
                <a
                  href={telHref(contact.phoneHref)}
                  className="btn btn-primary w-full sm:w-auto"
                >
                  <Icon name="phone" size={20} />
                  <span className="tnum">{contact.phone}</span>
                </a>

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex min-h-11 items-center gap-2 font-semibold text-foreground underline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-primary"
                  >
                    <Icon name="mail" size={20} className="text-primary" />
                    {contact.email}
                  </a>
                )}
              </div>
            </div>

            {/* Karte: fertiges Bild aus OpenStreetMap-Kacheln, erzeugt von
                scripts/build-map.mjs. Bewusst keine eingebettete Live-Karte —
                die würde bei jedem Aufruf von fremden Servern nachladen,
                Cookies setzen und Ladezeit kosten. So bleibt die Seite frei
                von externen Requests. */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              // Auf dem Handy höher: Bei 16:7 blieben von 120 px Höhe nach dem
              // Beschriftungsbalken nur rund 76 px Karte übrig.
              className="group relative mt-7 block aspect-[3/2] overflow-hidden rounded-xl border-2 border-border transition-colors duration-200 hover:border-primary sm:aspect-[16/7]"
            >
              <Image
                src="/images/karte-liestal.webp"
                alt={`Kartenausschnitt: ${site.name} an der ${address.street} in ${address.city}, direkt beim Bahnhof`}
                fill
                sizes="(min-width: 1024px) 640px, 92vw"
                className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
              />

              {/* Aufruf unten aufgesetzt: Die Karte bleibt sichtbar, der
                  Hinweis liegt nur auf einem abgedunkelten Streifen. */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-foreground px-4 py-3">
                {/* Auf dem Handy nur die Strasse — die volle Adresse bricht dort
                    auf zwei Zeilen um und macht den Balken unnötig hoch. Sie
                    steht ohnehin direkt darüber in der Karte. */}
                <span className="inline-flex min-w-0 items-center gap-2 text-sm font-bold text-background">
                  <Icon name="pin" size={18} />
                  <span className="truncate">
                    {address.street}
                    <span className="hidden sm:inline">
                      , {address.zip} {address.city}
                    </span>
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-background">
                  <span className="hidden sm:inline">In Google Maps öffnen</span>
                  <span className="sm:hidden">Karte</span>
                  <Icon name="external" size={16} />
                </span>
              </div>
            </a>

            {/* Die ODbL-Lizenz von OpenStreetMap verlangt diese Nennung. */}
            <p className="mt-2 text-xs text-muted-foreground">
              Kartendaten ©{" "}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors duration-200 hover:text-primary-text"
              >
                OpenStreetMap
              </a>
              -Mitwirkende
            </p>

            <dl className="mt-7 grid gap-x-6 gap-y-4 border-t-2 border-border pt-6 sm:grid-cols-2">
              {content.infos.map((info) => (
                <div key={info.label}>
                  <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-accent-text">
                    {info.label}
                  </dt>
                  <dd className="mt-1 font-medium">{info.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
