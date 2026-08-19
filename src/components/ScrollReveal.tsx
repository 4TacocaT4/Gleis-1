"use client";

import { useEffect } from "react";

/**
 * Blendet alle Elemente mit `data-reveal` beim Scrollen ein.
 *
 * Bewusst ein einziger IntersectionObserver für die ganze Seite statt einer
 * Animationsbibliothek: kein zusätzliches JavaScript-Bundle, keine
 * Scroll-Listener und damit auch auf schwachen Geräten flüssig. Die Animation
 * selbst läuft rein über CSS (opacity/transform).
 */
export function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.setAttribute("data-reveal", "visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    elements.forEach((element) => {
      // Bereits sichtbare Inhalte (oberhalb des Folds) sofort zeigen.
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
        element.setAttribute("data-reveal", "visible");
        return;
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
