"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function inView(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const offset = window.innerWidth < 768 ? 150 : 300;
  return rect.top <= window.innerHeight - offset && rect.bottom > 0;
}

export function TypeSequence({
  lines,
  as: Tag = "div",
  className = "",
  lineClassName = "",
  charMs = 100,
  pauseMs = 240,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  charMs?: number;
  pauseMs?: number;
}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const total = lines.reduce((sum, line) => sum + line.length, 0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      setShown(total);
      return;
    }

    let started = false;
    let timer = 0;
    const ends: number[] = [];
    let acc = 0;
    for (const line of lines) {
      acc += line.length;
      ends.push(acc);
    }

    const start = () => {
      if (started) return;
      started = true;
      let index = 0;
      const tick = () => {
        index += 1;
        setShown(index);
        if (index >= total) return;
        const atWordEnd = ends.includes(index) && index < total;
        timer = window.setTimeout(tick, atWordEnd ? pauseMs : charMs);
      };
      timer = window.setTimeout(tick, 80);
    };

    const onScroll = () => {
      if (inView(root)) start();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [charMs, pauseMs, total, lines]);

  let cursor = 0;

  return (
    <Tag ref={rootRef} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, lineIndex) => {
        const start = cursor;
        cursor += line.length;
        return (
          <span key={`${line}-${lineIndex}`} className={lineClassName}>
            {line.split("").map((char, charIndex) => (
              <span
                key={`${char}-${charIndex}`}
                className={`type-ch${start + charIndex < shown ? " type-ch--in" : ""}`}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

export function TypeWord({
  text,
  as,
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  return <TypeSequence lines={[text]} as={as} className={className} charMs={107} pauseMs={187} />;
}
