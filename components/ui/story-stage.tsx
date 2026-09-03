"use client";

import { useEffect, useRef, type ReactNode } from "react";

const GOAL_SELECTOR = ".story-caption";
const CRUISE = 88;
const TOUCH = 1;
const FIELD_RADIUS = 80;

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
  ball.vx += nx * 14;
  ball.vy += ny * 14;
  setCruise(ball);
}

function clampToField(ball: Ball, width: number, height: number) {
  const r = ball.r;
  ball.x = Math.min(width - r, Math.max(r, ball.x));
  ball.y = Math.min(height - r, Math.max(r, ball.y));

  const corner = FIELD_RADIUS;
  const corners: Array<[number, number, boolean, boolean]> = [
    [corner, corner, true, true],
    [width - corner, corner, false, true],
    [corner, height - corner, true, false],
    [width - corner, height - corner, false, false],
  ];

  for (const [cx, cy, left, top] of corners) {
    const inX = left ? ball.x < cx : ball.x > cx;
    const inY = top ? ball.y < cy : ball.y > cy;
    if (!inX || !inY) continue;

    const dx = ball.x - cx;
    const dy = ball.y - cy;
    const dist = Math.hypot(dx, dy) || 0.001;
    const maxDist = corner - r;

    if (maxDist <= 0) {
      if (left) ball.x = Math.max(ball.x, cx);
      else ball.x = Math.min(ball.x, cx);
      if (top) ball.y = Math.max(ball.y, cy);
      else ball.y = Math.min(ball.y, cy);
      continue;
    }

    if (dist > maxDist) {
      const scale = maxDist / dist;
      ball.x = cx + dx * scale;
      ball.y = cy + dy * scale;
      bounceNormal(ball, dx / dist, dy / dist);
    }
  }

  ball.x = Math.min(width - r, Math.max(r, ball.x));
  ball.y = Math.min(height - r, Math.max(r, ball.y));
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

    const circleEls = Array.from(stage.querySelectorAll<HTMLElement>(".story-circle"));
    if (circleEls.length < 2) return;

    const triggerOffset = () => (window.innerWidth < 768 ? 150 : 300);
    let balls: Ball[] = [];
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
      const measured = circleEls.map((el) => el.getBoundingClientRect());
      const r = Math.max(
        36,
        ...measured.map((box) => Math.min(box.width || 172, box.height || 172) / 2),
      );

      balls = circleEls.map((el, index) => {
        const box = measured[index];
        let x = box.left - stageBox.left + (box.width || r * 2) / 2;
        let y = box.top - stageBox.top + (box.height || r * 2) / 2;
        if (!box.width || !box.height) {
          x = index === 0 ? r + 24 : stageBox.width - r - 24;
          y = index === 0 ? r + 160 : stageBox.height / 2;
        }
        const item: Ball = {
          el,
          x,
          y,
          vx: index === 0 ? CRUISE : -CRUISE,
          vy: index === 0 ? CRUISE * 0.7 : -CRUISE * 0.58,
          r,
        };
        setCruise(item);
        clampToField(item, stageBox.width, stageBox.height);
        el.classList.add("story-circle--free");
        el.style.width = `${r * 2}px`;
        el.style.height = `${r * 2}px`;
        apply(item);
        return item;
      });
    };

    const step = (time: number) => {
      const dt = Math.min(32, time - last) / 1000;
      last = time;
      const stageBox = stage.getBoundingClientRect();
      const width = stageBox.width;
      const height = stageBox.height;
      const goals = measureGoals();

      for (const ball of balls) {
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;

        if (ball.x <= ball.r) {
          ball.x = ball.r;
          bounceNormal(ball, 1, 0);
        } else if (ball.x >= width - ball.r) {
          ball.x = width - ball.r;
          bounceNormal(ball, -1, 0);
        }

        if (ball.y <= ball.r) {
          ball.y = ball.r;
          bounceNormal(ball, 0, 1);
        } else if (ball.y >= height - ball.r) {
          ball.y = height - ball.r;
          bounceNormal(ball, 0, -1);
        }

        for (const goal of goals) {
          resolveCircleAabb(ball, goal.left, goal.top, goal.right, goal.bottom);
        }

        setCruise(ball);
        clampToField(ball, width, height);
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
          bounceNormal(a, -nx, -ny);
          bounceNormal(b, nx, ny);
          clampToField(a, width, height);
          clampToField(b, width, height);
          apply(a);
          apply(b);
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
        clampToField(ball, stageBox.width, stageBox.height);
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
