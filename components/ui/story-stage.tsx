"use client";

import { useEffect, useRef, type ReactNode } from "react";

const OBSTACLE_SELECTOR = [
  ".story-caption",
  ".story-match-card",
  ".hud",
  ".view-mode",
  ".smart-facts",
].join(", ");

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Ball = {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  boost: number;
};

function resolveCircleAabb(
  ball: Ball,
  left: number,
  top: number,
  right: number,
  bottom: number,
) {
  const closestX = Math.max(left, Math.min(ball.x, right));
  const closestY = Math.max(top, Math.min(ball.y, bottom));
  let nx = ball.x - closestX;
  let ny = ball.y - closestY;
  const dist = Math.hypot(nx, ny);

  if (dist === 0) {
    const dl = ball.x - left;
    const dr = right - ball.x;
    const dt = ball.y - top;
    const db = bottom - ball.y;
    const min = Math.min(dl, dr, dt, db);
    if (min === dl) {
      ball.x = left - ball.r;
      ball.vx = -Math.abs(ball.vx);
    } else if (min === dr) {
      ball.x = right + ball.r;
      ball.vx = Math.abs(ball.vx);
    } else if (min === dt) {
      ball.y = top - ball.r;
      ball.vy = -Math.abs(ball.vy);
    } else {
      ball.y = bottom + ball.r;
      ball.vy = Math.abs(ball.vy);
    }
    ball.boost = 1;
    return;
  }

  if (dist >= ball.r) return;

  nx /= dist;
  ny /= dist;
  const overlap = ball.r - dist;
  ball.x += nx * overlap;
  ball.y += ny * overlap;
  const vn = ball.vx * nx + ball.vy * ny;
  if (vn < 0) {
    ball.vx -= 2 * vn * nx;
    ball.vy -= 2 * vn * ny;
    ball.boost = 1;
  }
}

export function StoryStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage || prefersReducedMotion()) return;

    const circleEls = Array.from(stage.querySelectorAll<HTMLElement>(".story-circle"));
    if (circleEls.length < 2) return;

    const triggerOffset = () => (window.innerWidth < 768 ? 180 : 400);
    let balls: Ball[] = [];
    let running = false;
    let frame = 0;
    let last = 0;
    let started = false;

    const measureObstacles = () => {
      const stageBox = stage.getBoundingClientRect();
      return Array.from(stage.querySelectorAll<HTMLElement>(OBSTACLE_SELECTOR))
        .filter((el) => getComputedStyle(el).display !== "none")
        .map((el) => {
          const box = el.getBoundingClientRect();
          return {
            left: box.left - stageBox.left,
            top: box.top - stageBox.top,
            right: box.right - stageBox.left,
            bottom: box.bottom - stageBox.top,
          };
        });
    };

    const apply = (ball: Ball) => {
      ball.el.style.transform = `translate3d(${ball.x - ball.r}px, ${ball.y - ball.r}px, 0)`;
    };

    const place = () => {
      const stageBox = stage.getBoundingClientRect();
      stage.style.minHeight = `${stageBox.height}px`;
      balls = circleEls.map((el, index) => {
        const box = el.getBoundingClientRect();
        const r = Math.min(box.width, box.height) / 2;
        const x = box.left - stageBox.left + r;
        const y = box.top - stageBox.top + r;
        el.classList.add("story-circle--free");
        el.style.width = `${r * 2}px`;
        el.style.height = `${r * 2}px`;
        const ball = {
          el,
          x,
          y,
          vx: index === 0 ? 92 : -78,
          vy: index === 0 ? 64 : -88,
          r,
          boost: 0,
        };
        apply(ball);
        return ball;
      });
    };

    const step = (time: number) => {
      const dt = Math.min(32, time - last) / 1000;
      last = time;
      const stageBox = stage.getBoundingClientRect();
      const width = stageBox.width;
      const height = stageBox.height;
      const obstacles = measureObstacles();
      const cruise = 118;

      for (const ball of balls) {
        const speedMul = 1 + ball.boost * 1.35;
        ball.x += ball.vx * speedMul * dt;
        ball.y += ball.vy * speedMul * dt;
        ball.boost = Math.max(0, ball.boost - dt / 0.55);

        if (ball.x < ball.r) {
          ball.x = ball.r;
          ball.vx = Math.abs(ball.vx);
          ball.boost = 1;
        } else if (ball.x > width - ball.r) {
          ball.x = width - ball.r;
          ball.vx = -Math.abs(ball.vx);
          ball.boost = 1;
        }

        if (ball.y < ball.r) {
          ball.y = ball.r;
          ball.vy = Math.abs(ball.vy);
          ball.boost = 1;
        } else if (ball.y > height - ball.r) {
          ball.y = height - ball.r;
          ball.vy = -Math.abs(ball.vy);
          ball.boost = 1;
        }

        for (const obstacle of obstacles) {
          resolveCircleAabb(ball, obstacle.left, obstacle.top, obstacle.right, obstacle.bottom);
        }

        const current = Math.hypot(ball.vx, ball.vy) || 1;
        const target = cruise;
        const mix = 1 - Math.exp(-dt / 0.42);
        const next = current + (target - current) * mix;
        ball.vx = (ball.vx / current) * next;
        ball.vy = (ball.vy / current) * next;
        apply(ball);
      }

      if (balls.length === 2) {
        const [a, b] = balls;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.001;
        const min = a.r + b.r;
        if (dist < min) {
          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = (min - dist) / 2;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;
          const va = a.vx * nx + a.vy * ny;
          const vb = b.vx * nx + b.vy * ny;
          a.vx += (vb - va) * nx;
          a.vy += (vb - va) * ny;
          b.vx += (va - vb) * nx;
          b.vy += (va - vb) * ny;
          a.boost = 1;
          b.boost = 1;
        }
      }

      frame = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (started) return;
      started = true;
      place();
      running = true;
      last = performance.now();
      frame = window.requestAnimationFrame(step);
    };

    const onScroll = () => {
      const rect = stage.getBoundingClientRect();
      if (rect.top <= window.innerHeight - triggerOffset() && rect.bottom > 0) {
        start();
        window.removeEventListener("scroll", onScroll);
      }
    };

    const onResize = () => {
      if (!running) return;
      const stageBox = stage.getBoundingClientRect();
      for (const ball of balls) {
        ball.x = Math.min(stageBox.width - ball.r, Math.max(ball.r, ball.x));
        ball.y = Math.min(stageBox.height - ball.r, Math.max(ball.r, ball.y));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="story-stage" ref={ref}>
      {children}
    </div>
  );
}
