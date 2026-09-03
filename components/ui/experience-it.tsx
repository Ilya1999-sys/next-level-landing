"use client";

import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function reachedPageEnd() {
  const doc = document.documentElement;
  return window.innerHeight + window.scrollY >= doc.scrollHeight - 72;
}

export function ExperienceIt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      node.classList.add("experience__it--play");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const onScroll = () => {
      if (reachedPageEnd()) start();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="experience__it" ref={ref}>
      <i className="blob blob--enter-left" />
      <i className="blob blob--accent blob--target-left" />
      <p className="display-word">it.</p>
      <i className="blob blob--target-right" />
      <i className="blob blob--accent blob--enter-right" />
    </div>
  );
}
