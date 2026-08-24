export function FeedMock() {
  return (
    <div className="mock mock--feed" aria-hidden="true">
      <div className="mock__bar">
        <span>Home</span>
        <span className="mock__pills">
          <i />
          <i />
          <i className="is-on" />
        </span>
      </div>
      <div className="mock__grid">
        <article className="mock-card">
          <span>/2009</span>
          <strong>Path to the final: Barcelona.</strong>
        </article>
        <article className="mock-card mock-card--accent">
          <span>/2016</span>
          <strong>Portugal’s first major title.</strong>
        </article>
        <article className="mock-fact">
          <span>Nostalgia fact</span>
          <b>15</b>
          <p>Champions League cups, Real Madrid</p>
        </article>
      </div>
    </div>
  );
}

export function HudMock() {
  return (
    <div className="mock mock--hud" aria-hidden="true">
      <div className="mock-pitch" />
      <div className="mock-hud-panel">
        <span className="live-dot">LIVE · Saint-Denis</span>
        <p>Portugal 1 — 0 France</p>
        <small>Eder from extra time</small>
      </div>
    </div>
  );
}

export function ForumMock() {
  return (
    <div className="mock mock--forum" aria-hidden="true">
      <div className="mock__bar">
        <span className="live-dot">Live</span>
        <span>Barcelona</span>
      </div>
      <div className="mock-chips">
        <span>The Benzema Extravaganza in 2021</span>
        <span>How Germany went in 2014</span>
      </div>
      <p className="type-t2">324 fans discussions</p>
    </div>
  );
}
