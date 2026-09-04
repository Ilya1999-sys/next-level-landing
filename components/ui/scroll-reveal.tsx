"use client";

import { useEffect } from "react";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Set stagger index (--i) for children of groups/grids
    const groups = Array.from(document.querySelectorAll<HTMLElement>(".reveal-group, .mode-grid, .camera-grid, .concept-grid, .story-grid"));
    groups.forEach((group) => {
      const children = Array.from(group.querySelectorAll<HTMLElement>(".reveal-card, .mode-col-wrap, figure"));
      children.forEach((child, index) => {
        child.style.setProperty("--i", String(index));
      });
    });

    const selector = ".reveal-card, .reveal-title, .reveal-text, .reveal-group";
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
