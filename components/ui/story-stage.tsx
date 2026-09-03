"use client";

import { useEffect, useRef, type ReactNode } from "react";

const GOAL_SELECTOR = ".story-caption";
const CRUISE = 34;
const TOUCH = 1;

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
};

function setCruise(ball: Ball) {
  const speed = Math.hypot(ball.vx, ball.vy) || 1;
  ball.vx = (ball.vx / speed) * CRUISE;
  ball.vy = (ball.vy / speed) * CRUISE;
}

function bounceNormal(ball: Ball, nx: number, ny: number) {
  const vn = ball.vx * nx + ball.vy * ny;
  if (vn >= 0) return;
  ball.vx -= vn * nx;
  ball.vy -= vn * ny;
  ball.vx += nx * 10;
  ball.vy += ny * 10;
  setCruise(ball);
}

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
  const limit = Math.max(1, ball.r - TOUCH);

  if (dist === 0) {
    const dl = Math.abs(ball.x - left);
    const dr = Math.abs(right - ball.x);
    const dt = Math.abs(ball.y - top);
    const db = Math.abs(bottom - ball.y);
    const min = Math.min(dl, dr, dt, db);
    if (min === dl) {
      ball.x = left - limit;
      bounceNormal(ball, -1, 0);
    } else if (min === dr) {
      ball.x = right + limit;
      bounceNormal(ball, 1, 0);
    } else if (min === dt) {
      ball.y = top - limit;
      bounceNormal(ball, 0, -1);
    } else {
      ball.y = bottom + limit;
      bounceNormal(ball, 0, 1);
    }
    return;
  }

  if (dist >= limit) return;

  nx /= dist;
  ny /= dist;
  ball.x += nx * (limit - dist);
  ball.y += ny * (limit - dist);
  bounceNormal(ball, nx, ny);
}

export function StoryStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage || prefersReducedMotion()) return;

    const ballEl = stage.querySelector<HTMLElement>(".story-circle--left");
    if (!ballEl) return;

    const triggerOffset = () => (window.innerWidth < 768 ? 150 : 300);
    let ball: Ball | null = null;
    let running = false;
    let frame = 0;
    let last = 0;
    let started = false;

    const measureGoals = () => {
      const stageBox = stage.getBoundingClientRect();
      return Array.from(stage.querySelectorAll<HTMLElement>(GOAL_SELECTOR))
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

    const apply = (item: Ball) => {
      item.el.style.transform = `translate3d(${item.x - item.r}px, ${item.y - item.r}px, 0)`;
    };

    const place = () => {
      const stageBox = stage.getBoundingClientRect();
      stage.style.minHeight = `${stageBox.height}px`;
      const box = ballEl.getBoundingClientRect();
      const r = Math.max(24, Math.min(box.width || 172, box.height || 172) / 2);
      let x = box.left - stageBox.left + (box.width || r * 2) / 2;
      let y = box.top - stageBox.top + (box.height || r * 2) / 2;
      if (!box.width || !box.height) {
        x = r + 24;
        y = r + 160;
      }
      ball = {
        el: ballEl,
        x,
        y,
        vx: CRUISE,
        vy: CRUISE * 0.62,
        r,
      };
      setCruise(ball);
      ballEl.classList.add("story-circle--free");
      ballEl.style.width = `${r * 2}px`;
      ballEl.style.height = `${r * 2}px`;
      apply(ball);
    };

    const step = (time: number) => {
      if (!ball) return;
      const dt = Math.min(32, time - last) / 1000;
      last = time;
      const stageBox = stage.getBoundingClientRect();
      const width = stageBox.width;
      const height = stageBox.height;
      const goals = measureGoals();

      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      if (ball.x < ball.r) {
        ball.x = ball.r;
        bounceNormal(ball, 1, 0);
      } else if (ball.x > width - ball.r) {
        ball.x = width - ball.r;
        bounceNormal(ball, -1, 0);
      }

      if (ball.y < ball.r) {
        ball.y = ball.r;
        bounceNormal(ball, 0, 1);
      } else if (ball.y > height - ball.r) {
        ball.y = height - ball.r;
        bounceNormal(ball, 0, -1);
      }

      for (const goal of goals) {
        resolveCircleAabb(ball, goal.left, goal.top, goal.right, goal.bottom);
      }

      setCruise(ball);
      apply(ball);
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
      if (!running || !ball) return;
      const stageBox = stage.getBoundingClientRect();
      ball.x = Math.min(stageBox.width - ball.r, Math.max(ball.r, ball.x));
      ball.y = Math.min(stageBox.height - ball.r, Math.max(ball.r, ball.y));
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
