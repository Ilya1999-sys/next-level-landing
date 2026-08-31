export function HeroVideoMock() {
  return (
    <div className="mock mock--hero-video" aria-hidden="true">
      <div className="mock-hero__overlay">
        <p className="mock-hero__score">POR 1 — 0 FRA</p>
        <p className="mock-hero__event">109&apos; · Eder from extra time</p>
      </div>
    </div>
  );
}

export function FeedMock() {
  return (
    <div className="mock mock--feed" aria-hidden="true">
      <div className="mock__bar">
        <span>Home · 323:3871</span>
        <span className="mock__pills">
          <i />
          <i />
          <i className="is-on" />
        </span>
      </div>
      <div className="mock__grid">
        <article className="mock-card">
          <span>/2009</span>
          <strong>Path to the final: Barcelona</strong>
        </article>
        <article className="mock-card mock-card--accent">
          <span>/2016</span>
          <strong>Portugal&apos;s first victory in a major tournament</strong>
        </article>
        <article className="mock-fact">
          <span>Nostalgia fact</span>
          <b>15</b>
          <p>Champions League cups won by Real Madrid</p>
        </article>
      </div>
    </div>
  );
}

export function RouteFlowMock() {
  return (
    <div className="mock mock--route" aria-hidden="true">
      <article className="flow-node">
        <span>Home</span>
        <strong>Discover moments</strong>
        <small>323:3871</small>
      </article>
      <span className="flow-arrow">→</span>
      <article className="flow-node">
        <span>Tournament</span>
        <strong>Explore context</strong>
        <small>323:3890</small>
      </article>
      <span className="flow-arrow">→</span>
      <article className="flow-node">
        <span>Match</span>
        <strong>Watch differently</strong>
        <small>323:3918 / 323:3928</small>
      </article>
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
        <small>Smart facts · Timeline · Ratings</small>
      </div>
    </div>
  );
}

export function CameraMock() {
  return (
    <div className="mock mock--cameras" aria-hidden="true">
      <div className="camera-grid">
        <article><span>Player</span></article>
        <article><span>Referee</span></article>
        <article><span>Behind goal</span></article>
        <article><span>Drone</span></article>
      </div>
    </div>
  );
}

export function PlayerCardMock() {
  return (
    <div className="mock mock--player" aria-hidden="true">
      <article className="player-side">
        <span>CRISTIANO RONALDO</span>
        <p>Nr7 / Forward</p>
      </article>
      <article className="player-stats">
        <div><b>10</b><span>Rating</span></div>
        <div><b>8</b><span>Actions</span></div>
        <div><b>78%</b><span>Condition</span></div>
      </article>
      <button className="rate-button" type="button">Rate the player</button>
    </div>
  );
}

export function SystemMosaicMock() {
  return (
    <div className="mock mock--mosaic" aria-hidden="true">
      <article>Home</article>
      <article>Mode</article>
      <article>Tournament</article>
      <article>Match</article>
    </div>
  );
}
