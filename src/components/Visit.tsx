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

            {/* Karte: gestalteter Platzhalter, verlinkt auf Google Maps.
                Keine externen Skripte, dadurch kein Ladeverlust und keine
                Cookie-Zustimmung nötig. */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-7 block overflow-hidden rounded-xl border-2 border-border transition-colors duration-200 hover:border-primary"
              style={{ aspectRatio: "16 / 7" }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-muted"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(220,38,38,0.09) 2px, transparent 2px), linear-gradient(90deg, rgba(220,38,38,0.09) 2px, transparent 2px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-on-primary shadow-lg">
                  <Icon name="pin" size={24} />
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                  In Google Maps öffnen
                  <Icon name="external" size={16} />
                </span>
              </div>
            </a>

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
