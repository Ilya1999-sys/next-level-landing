"use client";

import { useEffect } from "react";

const CARD_SELECTOR = [
  ".fact-card",
  ".year-card",
  ".player-note",
  ".player-stat",
  ".view-mode",
  ".smart-facts",
].join(", ");

const TILTS = [-5, -10, 5, 10] as const;
const MODE_CARD_SELECTOR = ".mode-col .fact-card, .mode-col .year-card";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sectionOf(card: HTMLElement) {
  return card.closest("section") ?? card.parentElement ?? document.body;
}

function pickSlideCards(cards: HTMLElement[]) {
  const bySection = new Map<Element, HTMLElement[]>();

  for (const card of cards) {
    if (card.classList.contains("player-stat")) continue;
    const section = sectionOf(card);
    const list = bySection.get(section) ?? [];
    list.push(card);
    bySection.set(section, list);
  }

  const picked = new Set<HTMLElement>();

  for (const group of bySection.values()) {
    if (group.length === 0) continue;
    group.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
    picked.add(group[0]);
    if (group.length > 1) picked.add(group[group.length - 1]);
  }

  return picked;
}

function slideSide(card: HTMLElement) {
  const section = sectionOf(card);
  const sectionBox = section.getBoundingClientRect();
  const cardBox = card.getBoundingClientRect();
  const cardMid = cardBox.left + cardBox.width / 2;
  const sectionMid = sectionBox.left + sectionBox.width / 2;
  return cardMid <= sectionMid ? "left" : "right";
}

function attachGsapTilt(card: HTMLElement) {
  const reset = () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  };

  const onMove = (event: MouseEvent) => {
    const box = card.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width;
    const py = (event.clientY - box.top) / box.height;
    card.style.setProperty("--rx", `${((0.5 - py) * 14).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${((px - 0.5) * 18).toFixed(2)}deg`);
    card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  reset();
  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", reset);

  return () => {
    card.removeEventListener("mousemove", onMove);
    card.removeEventListener("mouseleave", reset);
  };
}

export function CardMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR));
    const slideCards = pickSlideCards(cards);
    const cleanups: Array<() => void> = [];

    cards.forEach((card, index) => {
      card.classList.add("card-motion");
      const chaotic = (card.textContent?.length ?? 0) * 13 + index * 7;
      card.style.setProperty("--card-tilt", `${TILTS[chaotic % TILTS.length]}deg`);

      if (card.matches(MODE_CARD_SELECTOR)) {
        card.classList.add("card-motion--gsap");
        cleanups.push(attachGsapTilt(card));
      } else {
        card.classList.add("card-motion--tilt");
      }

      if (card.classList.contains("player-stat")) {
        card.classList.add("card-motion--fade");
      } else if (slideCards.has(card)) {
        card.classList.add(`card-motion--slide-${slideSide(card)}`);
      } else {
        card.classList.add("card-motion--in");
      }
    });

    const reveal = (card: Element) => card.classList.add("card-motion--in");
    const pending = cards.filter(
      (card) => card.classList.contains("card-motion--fade") || card.className.includes("card-motion--slide-"),
    );

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    pending.forEach((card) => io.observe(card));
    const fallback = window.setTimeout(() => pending.forEach(reveal), 2200);

    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
