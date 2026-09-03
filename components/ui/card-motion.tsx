"use client";

import { useEffect } from "react";

const SELECTOR = [
  ".fact-card",
  ".year-card",
  ".player-note",
  ".player-stat",
  ".view-mode",
  ".smart-facts",
  ".hud",
].join(", ");

export function CardMotion() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    cards.forEach((card, index) => {
      card.classList.add("card-motion");
      card.style.setProperty("--card-delay", `${(index % 6) * 70}ms`);
    });

    const reveal = (card: Element) => card.classList.add("card-motion--in");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );

    cards.forEach((card) => io.observe(card));
    const fallback = window.setTimeout(() => cards.forEach(reveal), 1600);

    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return null;
}
