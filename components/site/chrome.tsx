"use client";

import { useEffect, useId, useState } from "react";
import { footer, nav, site } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 767) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="site-header">
      <div className="shell site-header__row">
        <a className="brand" href="#top" aria-label={site.name}>
          <img src="/figma/landing/logo-a.svg" alt="" width={46} height={60} />
        </a>
        <nav className="site-nav" aria-label="Page">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--primary site-header__cta" href={site.productUrl} target="_blank" rel="noreferrer">
          See project
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <img src="/figma/landing/icon-burger.svg" alt="" width={40} height={40} />
        </button>
      </div>
      {open ? (
        <nav id={menuId} className="site-nav-mobile" aria-label="Page">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <p>{footer.project}</p>
        <p>{footer.author}</p>
        <p>{footer.role}</p>
        <a className="btn btn--primary" href={site.telegramUrl} target="_blank" rel="noreferrer">
          {footer.telegram}
        </a>
      </div>
    </footer>
  );
}
