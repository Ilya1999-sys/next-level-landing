"use client";

import React, { useEffect, useRef } from "react";

interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  disabled?: boolean;
}

export function ParallaxContainer({
  children,
  className = "",
  intensity = 20,
  disabled = false,
}: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (
      disabled ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.style.setProperty("--px", "0px");
      el.style.setProperty("--py", "0px");
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      targetX = relativeX * intensity;
      targetY = relativeY * intensity;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      el.style.setProperty("--px", `${currentX.toFixed(2)}px`);
      el.style.setProperty("--py", `${currentY.toFixed(2)}px`);

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, disabled]);

  return (
    <div ref={containerRef} className={`parallax-container ${className}`.trim()}>
      {children}
    </div>
  );
}
