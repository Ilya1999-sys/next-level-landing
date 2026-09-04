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
    cards.forEach((card, index) => {
      card.style.setProperty("--i", String(index));
      card.style.setProperty("--x", `${(Math.random() - 0.5) * 10}%`);
      card.style.setProperty("--y", `${(Math.random() - 0.5) * 10}%`);
      card.style.setProperty("--rot", `${(Math.random() - 0.5) * 15}deg`);
      card.style.setProperty("--from-rot", `${(Math.random() - 0.5) * 15}deg`);
    });

    const reveal = () => root.classList.add("player-facts--in");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        io.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(root);

    return () => io.disconnect();
  }, []);

  return null;
}
