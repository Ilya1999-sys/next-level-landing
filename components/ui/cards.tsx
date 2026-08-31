import type { ReactNode } from "react";
import { site } from "@/lib/content";

type DotKind = "accent" | "muted";

export function ArrowLink({ className = "" }: { className?: string }) {
  return (
    <a className={`icon-btn ${className}`.trim()} href={site.productUrl} target="_blank" rel="noreferrer">
      <img src="/figma/landing/icon-arrow.svg" alt="" width={32} height={32} />
      <span className="sr-only">See project</span>
    </a>
  );
}

export function CircleStat({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className={`circle-stat${accent ? " circle-stat--accent" : ""}`}>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

export function Dots({ items }: { items: DotKind[] }) {
  return (
    <div className="dot-grid" aria-hidden="true">
      {items.map((kind, index) => (
        <i key={`${kind}-${index}`} className={`dot dot--${kind}`} />
      ))}
    </div>
  );
}

export function Bars({
  pairs,
}: {
  pairs: Array<[number, number]>;
}) {
  return (
    <div className="bar-chart" aria-hidden="true">
      {pairs.map((pair, index) => (
        <span key={index} className="bar-chart__pair">
          <i className="bar bar--accent" style={{ height: `${pair[0]}px` }} />
          <i className="bar bar--muted" style={{ height: `${Math.max(pair[1], 4)}px` }} />
        </span>
      ))}
    </div>
  );
}

export function FactCard({
  label,
  value,
  text,
  tag,
  children,
  tall = false,
}: {
  label: string;
  value: string;
  text: string;
  tag?: string;
  children?: ReactNode;
  tall?: boolean;
}) {
  return (
    <article className={`fact-card${tall ? " fact-card--tall" : ""}`}>
      <header className="fact-card__top">
        <p className="fact-card__label">{label}</p>
        {tag ? (
          <p className="fact-card__tag">
            <i className="status-dot" />
            {tag}
          </p>
        ) : null}
      </header>
      <p className="fact-card__stat">
        <b>{value}</b>
        <span>{text}</span>
      </p>
      {children}
    </article>
  );
}

export function YearCard({
  year,
  title,
  children,
}: {
  year: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <article className="year-card">
      <header className="year-card__top">
        <div>
          <p className="fact-card__label">{year}</p>
          <p className="year-card__title">{title}</p>
        </div>
        <ArrowLink />
      </header>
      {children}
    </article>
  );
}
