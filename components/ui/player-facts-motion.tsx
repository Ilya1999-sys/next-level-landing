"use client";

import { useEffect } from "react";

const CARD = ".player-note, .player-stat";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PlayerFactsMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".player-facts");
    if (!root || prefersReducedMotion()) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(CARD));
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
      card.style.setProperty("--i", String(index));
    });

    const topCard =
      root.querySelector<HTMLElement>(".player-stat--goals") || cards[0];

    const vh = window.innerHeight;
    const offsetPx = Math.min(280, Math.max(120, Math.round(vh * 0.25)));

    const reveal = () => root.classList.add("player-facts--in");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        io.disconnect();
      },
      {
        threshold: 0,
        rootMargin: `0px 0px -${offsetPx}px 0px`,
      }
    );

    io.observe(topCard);

    return () => io.disconnect();
  }, []);

  return null;
}
