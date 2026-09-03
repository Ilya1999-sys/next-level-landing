"use client";

import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ExperienceIt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const triggerOffset = () => (window.innerWidth < 768 ? 180 : 400);
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      node.classList.add("experience__it--play");
      window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top <= window.innerHeight - triggerOffset() && rect.bottom > 0) start();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
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
