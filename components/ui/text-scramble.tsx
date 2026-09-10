"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const DIGITS = "0123456789";

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleSpeed?: number; // ms per tick (default 35ms)
  duration?: number; // total duration in ms (default 1200ms)
  characterSet?: string;
  as?: React.ElementType;
  triggerOnHover?: boolean;
}

export function TextScramble({
  text,
  className = "",
  scrambleSpeed = 35,
  duration = 1200,
  characterSet = DIGITS,
  as: Component = "span",
  triggerOnHover = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLElement | null>(null);
  const isAnimatingRef = useRef(false);
  const hasRevealedRef = useRef(false);

  const startScramble = useCallback(() => {
    if (isAnimatingRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    isAnimatingRef.current = true;
    const startTime = performance.now();
    const length = text.length;

    const intervalId = setInterval(() => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Calculate how many characters are locked in from left to right
      const revealCount = Math.floor(progress * length);

      let scrambled = "";
      for (let i = 0; i < length; i++) {
        const char = text[i];

        // Keep spaces, punctuation, or already revealed characters intact
        if (char === " " || char === "\n" || char === "—" || char === ":" || char === "“" || char === "”") {
          scrambled += char;
        } else if (i < revealCount) {
          scrambled += char;
        } else {
          // Random digit for unrevealed characters
          const randomChar = characterSet[Math.floor(Math.random() * characterSet.length)];
          scrambled += randomChar;
        }
      }

      setDisplayText(scrambled);

      if (progress >= 1) {
        clearInterval(intervalId);
        setDisplayText(text);
        isAnimatingRef.current = false;
        hasRevealedRef.current = true;
      }
    }, scrambleSpeed);

    return () => clearInterval(intervalId);
  }, [text, duration, scrambleSpeed, characterSet]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealedRef.current) {
          startScramble();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [startScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isAnimatingRef.current) {
      startScramble();
    }
  };

  return (
    <Component
      ref={elementRef}
      className={`text-scramble ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {displayText}
    </Component>
  );
}
