"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: string;
}

export function StatCounter({ value }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const elementRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    // Parse value like "10000+" -> targetNum: 10000, suffix: "+"
    const match = value.match(/^(\D*)(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const targetNum = parseInt(match[2], 10);
    const suffix = match[3] || "";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animatedRef.current) return;
        animatedRef.current = true;
        observer.disconnect();

        const duration = 1800; // ms
        const startTime = performance.now();

        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          // cubic ease out curve for smooth counter slowdown at the end
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(targetNum * eased);

          setDisplayValue(`${prefix}${current}${suffix}`);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplayValue(value);
          }
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [value]);

  return <b ref={elementRef}>{displayValue}</b>;
}
