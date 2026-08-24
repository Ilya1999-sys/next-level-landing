import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  tone?: "page" | "ink" | "accent";
  children: ReactNode;
};

export function Section({ id, eyebrow, title, body, tone = "page", children }: SectionProps) {
  return (
    <section id={id} className={`section section--${tone}`} data-block={id}>
      <div className="shell">
        {(eyebrow || title || body) && (
          <header className="section__intro">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="section__title">{title}</h2> : null}
            {body ? <p className="section__body">{body}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function Button({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "ghost" | "on-dark" }) {
  return (
    <a className={`btn btn--${variant}`} href={href}>
      {children}
    </a>
  );
}

export function MediaSlot({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <figure className="media-slot">
      <div className="media-slot__frame">{children}</div>
      <figcaption className="media-slot__label">{label}</figcaption>
    </figure>
  );
}
