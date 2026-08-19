"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { telHref } from "@/lib/format";
import type { SiteConfig } from "@/lib/types";

/**
 * Feste Aktionsleiste am unteren Rand für Mobilgeräte.
 *
 * Erscheint erst, wenn der Hero-Bereich verlassen wurde — davor stehen die
 * Buttons ohnehin gross auf dem Bildschirm. Der Abstand am Seitenende
 * (padding-bottom am Body) verhindert, dass die Leiste Inhalte verdeckt.
 */
export function MobileCallBar({ site }: { site: SiteConfig }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-40% 0px 0px 0px", threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="mobile-call-bar"
      className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-border bg-background/95 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      // Ausserhalb des Sichtfelds weder vorlesbar noch per Tab erreichbar.
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="container-page flex items-center gap-3 py-3">
        <a href="#speisekarte" className="btn btn-quiet flex-1">
          Speisekarte
        </a>
        <a href={telHref(site.contact.phoneHref)} className="btn btn-primary flex-1">
          <Icon name="phone" size={20} />
          Anrufen
        </a>
      </div>
    </div>
  );
}
