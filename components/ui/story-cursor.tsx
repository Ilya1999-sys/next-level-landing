"use client";

import { useEffect, useRef } from "react";

export function StoryCursor() {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(".story-container");
    const follower = followerRef.current;
    if (!container || !follower) return;

    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let currentScale = 0;
    let targetScale = 0;
    let isInside = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (!isInside) {
        isInside = true;
        targetScale = 1;
      }
    };

    const onMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      currentX = mouseX;
      currentY = mouseY;
      isInside = true;
      targetScale = 1;
    };

    const onMouseLeave = () => {
      isInside = false;
      targetScale = 0;
    };

    const loop = () => {
      // Interpolate position and scale
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      currentScale += (targetScale - currentScale) * 0.15;

      if (currentScale < 0.001) {
        currentScale = 0;
      }

      if (follower) {
        follower.style.transform = `translate3d(${currentX - 40}px, ${currentY - 40}px, 0) scale(${currentScale})`;
        follower.style.opacity = currentScale.toFixed(3);
      }

      rafId = requestAnimationFrame(loop);
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={followerRef} className="story-cursor" aria-hidden="true" />;
}
