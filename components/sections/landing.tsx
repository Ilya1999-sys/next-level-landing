import { Button, MediaSlot, Section } from "@/components/ui/primitives";
import { FeedMock, ForumMock, HudMock } from "@/components/mocks/product-mocks";
import { cta, features, hero, how, live, matchCase, moods, product, stats } from "@/lib/content";

export function HeroSection() {
  return (
    <section id="top" className="section section--hero" data-block="hero">
      <div className="shell hero">
        <div className="hero__copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="display">
            {hero.title[0]}
            <br />
            {hero.title[1]}
          </h1>
          <p className="hero__body">{hero.body}</p>
          <div className="hero__actions">
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </Button>
          </div>
        </div>
        <MediaSlot label="Slot · Home feed">
          <FeedMock />
        </MediaSlot>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="stats-band" data-block="stats">
      <div className="shell stats-band__row">
        {stats.map((item) => (
          <article key={item.label} className="stat">
            <p className="stat__value">{item.value}</p>
            <p className="stat__label">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductSection() {
  return (
    <Section id="product" eyebrow={product.eyebrow} title={product.title} body={product.body}>
      <div className="split">
        <MediaSlot label="Slot · Editorial cards">
          <FeedMock />
        </MediaSlot>
        <ol className="feature-list">
          {features.items.slice(0, 3).map((item, index) => (
            <li key={item.id}>
              <span>0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function MoodsSection() {
  return (
    <Section id="moods" eyebrow={moods.eyebrow} title={moods.title}>
      <div className="mood-grid">
        {moods.items.map((mood) => (
          <article key={mood.id} className={`mood-card ${mood.id === "nostalgia" ? "is-current" : ""}`}>
            <i className="mood-card__swatch" style={{ background: mood.accent }} />
            <h3>{mood.name}</h3>
            <p>{mood.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function ArchiveSection() {
  return (
    <Section id="archive" eyebrow={features.eyebrow} title={features.title}>
      <div className="bento">
        {features.items.map((item) => (
          <article key={item.id} className={`bento__cell bento__cell--${item.id}`}>
            <p className="eyebrow">{item.slot}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function HowSection() {
  return (
    <Section id="how" eyebrow={how.eyebrow} title={how.title}>
      <ol className="steps">
        {how.steps.map((step) => (
          <li key={step.n} className="steps__item">
            <span>{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function MatchSection() {
  return (
    <section id="match" className="section section--ink" data-block="match">
      <div className="shell split split--ink">
        <div>
          <p className="eyebrow eyebrow--on-dark">{matchCase.eyebrow}</p>
          <p className="kicker">{matchCase.kicker}</p>
          <h2 className="section__title section__title--on-dark">{matchCase.title}</h2>
          <p className="section__body section__body--on-dark">{matchCase.body}</p>
          <ul className="case-facts">
            {matchCase.facts.map((fact) => (
              <li key={fact.label}>
                <b>{fact.value}</b>
                <span>{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <MediaSlot label="Slot · Match HUD">
          <HudMock />
        </MediaSlot>
      </div>
    </section>
  );
}

export function LiveSection() {
  return (
    <Section id="room" eyebrow={live.eyebrow} title={live.title}>
      <div className="split">
        <MediaSlot label="Slot · Live discussion">
          <ForumMock />
        </MediaSlot>
        <div className="chip-stack">
          {live.chips.map((chip) => (
            <span key={chip} className="chip">
              {chip}
            </span>
          ))}
          <p className="live-dot">{live.fans}</p>
        </div>
      </div>
    </Section>
  );
}

export function CtaSection() {
  return (
    <section className="section section--accent" data-block="cta">
      <div className="shell cta">
        <h2 className="section__title section__title--on-dark">{cta.title}</h2>
        <p className="section__body section__body--on-dark">{cta.body}</p>
        <Button href={cta.action.href} variant="on-dark">
          {cta.action.label}
        </Button>
      </div>
    </section>
  );
}
