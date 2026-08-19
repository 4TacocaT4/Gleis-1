"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { OpenStatus } from "./OpenStatus";
import { telHref } from "@/lib/format";
import type { OpeningHours, SiteConfig } from "@/lib/types";

const NAV = [
  { label: "Speisekarte", href: "#speisekarte" },
  { label: "Warum Gleis 1", href: "#highlights" },
  { label: "Bewertungen", href: "#bewertungen" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Besuch", href: "#besuch" },
];

interface HeaderProps {
  site: SiteConfig;
  hours: OpeningHours;
}

export function Header({ site, hours }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Statt eines Scroll-Listeners beobachtet ein unsichtbarer Marker den
  // Seitenanfang. Das erspart Arbeit bei jedem einzelnen Scroll-Frame.
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Bei offenem Menü: Seite fixieren, Rest der Seite stilllegen, Escape schliesst.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Ohne das bleibt der Inhalt hinter dem Menü per Tab erreichbar: Der Fokus
    // wandert dann in unsichtbare Elemente. `inert` nimmt sie gleichzeitig aus
    // dem Screenreader-Baum.
    const backdrop = [
      document.getElementById("hauptinhalt"),
      document.querySelector("footer"),
      document.getElementById("mobile-call-bar"),
    ].filter((node): node is HTMLElement => node instanceof HTMLElement);

    backdrop.forEach((node) => node.setAttribute("inert", ""));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      backdrop.forEach((node) => node.removeAttribute("inert"));
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute top-0 h-1 w-full" />

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || menuOpen
            ? "border-border bg-background/95 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
        style={{ height: "var(--header-height)" }}
      >
        <div className="container-page flex h-full items-center justify-between gap-4">
          <a
            href="#top"
            className="flex min-h-11 items-center rounded-lg"
            aria-label={`${site.name} — zum Seitenanfang`}
          >
            <Logo />
          </a>

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-full px-3.5 font-semibold text-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <OpenStatus hours={hours} compact className="hidden sm:inline-flex" />

            <a
              href={telHref(site.contact.phoneHref)}
              className="btn btn-primary hidden !min-h-11 !px-5 !text-[0.9375rem] sm:inline-flex"
            >
              <Icon name="phone" size={18} />
              Anrufen
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border-2 border-border bg-card text-foreground transition-colors duration-200 hover:border-primary hover:text-primary lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
            >
              <Icon name={menuOpen ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobiles Menü */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-background lg:hidden"
      >
        <div
          className="container-page flex h-full flex-col justify-between overflow-y-auto pb-10"
          style={{ paddingTop: "calc(var(--header-height) + 1.5rem)" }}
        >
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col">
              {NAV.map((item, index) => (
                <li key={item.href} className="border-b border-border">
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-5 font-display text-2xl font-bold text-foreground"
                  >
                    {item.label}
                    <span className="tnum text-sm font-bold tracking-[0.1em] text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <OpenStatus hours={hours} className="self-start" />
            <a
              href={telHref(site.contact.phoneHref)}
              className="btn btn-primary w-full"
              onClick={() => setMenuOpen(false)}
            >
              <Icon name="phone" size={20} />
              <span className="tnum">{site.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
