"use client";

import { useEffect } from "react";

const CARD_SELECTOR = [
  ".mode-col",
  ".fact-card",
  ".year-card",
  ".player-note",
  ".player-stat",
  ".view-mode",
  ".smart-facts",
].join(", ");

const TILTS = [-5, -4, -3, 3, 4, 5] as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sectionOf(card: HTMLElement) {
  return card.closest("section") ?? card.parentElement ?? document.body;
}

function isInnerModeCard(card: HTMLElement) {
  return Boolean(card.closest(".mode-col")) && !card.classList.contains("mode-col");
}

function pickSlideCards(cards: HTMLElement[]) {
  const bySection = new Map<Element, HTMLElement[]>();

  for (const card of cards) {
    if (card.classList.contains("player-stat")) continue;
    if (card.classList.contains("mode-col--nostalgia")) continue;
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

export function CardMotion() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR)).filter(
      (card) => !isInnerModeCard(card),
    );
    const slideCards = pickSlideCards(cards);

    cards.forEach((card, index) => {
      card.classList.add("card-motion", "card-motion--tilt");
      const chaotic = (card.textContent?.length ?? 0) * 13 + index * 7;
      card.style.setProperty("--card-tilt", `${TILTS[chaotic % TILTS.length]}deg`);

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

    const triggerOffset = () => (window.innerWidth < 768 ? 180 : 400);

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
    };
  }, []);

  return null;
}
