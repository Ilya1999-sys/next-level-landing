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
        card.style.setProperty("--card-enter", "2000ms");
      } else if (slideCards.has(card)) {
        card.classList.add(`card-motion--slide-${slideSide(card)}`);
        card.style.setProperty("--card-enter", `${1500 + (chaotic % 6) * 100}ms`);
      } else {
        card.classList.add("card-motion--in");
      }
    });

    const pending = new Set(
      cards.filter(
        (card) =>
          card.classList.contains("card-motion--fade") ||
          card.classList.contains("card-motion--slide-left") ||
          card.classList.contains("card-motion--slide-right"),
      ),
    );

    const triggerOffset = () => (window.innerWidth < 768 ? 80 : 200);

    const crossedLine = (card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const line = window.innerHeight - triggerOffset();
      return rect.top <= line && rect.bottom > 0;
    };

    const reveal = (card: HTMLElement) => {
      card.classList.add("card-motion--in");
      pending.delete(card);
      const settle = (event: TransitionEvent) => {
        if (event.target !== card) return;
        if (event.propertyName !== "transform" && event.propertyName !== "opacity") return;
        card.classList.add("card-motion--settled");
        card.removeEventListener("transitionend", settle);
      };
      card.addEventListener("transitionend", settle);
    };

    let frame = 0;
    const tick = () => {
      frame = 0;
      for (const card of [...pending]) {
        if (crossedLine(card)) reveal(card);
      }
      if (pending.size === 0) teardown();
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(tick);
    };

    const teardown = () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frame) window.cancelAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    if (window.scrollY > 0) onScrollOrResize();

    return () => {
      teardown();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
