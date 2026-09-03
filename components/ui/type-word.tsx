"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TypeWord({ text }: { text: string }) {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState("");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      setShown(text);
      return;
    }

    let started = false;
    let timer = 0;
    const triggerOffset = () => (window.innerWidth < 768 ? 180 : 400);

    const start = () => {
      if (started) return;
      started = true;
      let index = 0;
      timer = window.setInterval(() => {
        index += 1;
        setShown(text.slice(0, index));
        if (index >= text.length) window.clearInterval(timer);
      }, Math.max(70, Math.round(1800 / text.length)));
    };

    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      if (rect.top <= window.innerHeight - triggerOffset() && rect.bottom > 0) start();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(timer);
    };
  }, [text]);

  return (
    <p ref={rootRef} className="display-word display-word--center type-word">
      <span className="type-word__ghost" aria-hidden="true">
        {text}
      </span>
      <span className="type-word__live">{shown}</span>
    </p>
  );
}
