import Image from "next/image";
import { nav, site } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__row">
        <a className="brand" href="#top" aria-label={site.name}>
          <Image src="/figma/logo.svg" alt="" width={72} height={36} />
          <span>{site.name}</span>
        </a>
        <nav className="site-nav" aria-label="Page">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--primary site-header__cta" href="#archive">
          Open archive
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__row">
        <p className="type-t2">Next Level · Football archive</p>
        <p className="type-t2">Structure first. Tokens live in /tokens.</p>
      </div>
    </footer>
  );
}
