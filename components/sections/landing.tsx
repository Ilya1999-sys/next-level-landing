import {
  ArrowLink,
  Bars,
  CircleStat,
  Dots,
  FactCard,
  YearCard,
} from "@/components/ui/cards";
import { PlayerFactsMotion } from "@/components/ui/player-facts-motion";
import { concept, matchView, modes, playerFacts, site, story } from "@/lib/content";

const DOT_PATTERN: Array<"accent" | "muted"> = [
  "accent",
  "accent",
  "muted",
  "accent",
  "muted",
  "accent",
  "accent",
  "accent",
  "muted",
  "muted",
  "muted",
  "accent",
  "muted",
  "accent",
  "accent",
  "accent",
  "accent",
  "accent",
  "accent",
  "accent",
  "accent",
  "accent",
  "accent",
  "muted",
];

const BAR_PAIRS: Array<[number, number]> = [
  [144, 60],
  [120, 24],
  [24, 24],
  [48, 4],
];

const MATCH_REVIEW_MINUTES = ["120", "105", "90", "75", "60", "45", "30", "15", "1"];
const MATCH_REVIEW_FRANCE = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const MATCH_REVIEW_PORTUGAL = [0, 1, 4, 5, 6, 7, 8];

function ModeStack() {
  return (
    <>
      <YearCard year="/2009" title="Path to the final: “Barcelona”.">
        <Bars pairs={BAR_PAIRS} />
      </YearCard>
      <YearCard year="/2006" title="The incredible Zidane at the World Cup and the tragedy in the final.">
        <div className="circle-row">
          <CircleStat value="3" label="Zidane goals" accent />
          <CircleStat value="0" label="France defeats" />
        </div>
      </YearCard>
      <FactCard label="Favorite player fact" value="5" text="Killian Mbappe scored goals in one match" />
    </>
  );
}

export function HeroSection() {
  return (
    <section id="top" className="section section--cover">
      <div className="shell hero-collage">
        <div className="hero-block">
          <div className="hero-row hero-row--lead">
            <YearCard className="year-card--zidane" year="/2006" title="The incredible Zidane">
              <div className="circle-row">
                <CircleStat value="3" label="Zidane goals" accent />
                <CircleStat value="0" label="France defeats" />
              </div>
            </YearCard>
            <div className="hero-stack">
              <p className="display-word">Football</p>
              <div className="hero-row hero-row--tight">
                <p className="display-word">is</p>
                <FactCard label="Favorite player fact" value="5" text="Killian Mbappe scored goals in one match" />
              </div>
            </div>
          </div>
          <div className="hero-row hero-row--icons">
            <p className="display-word">more</p>
            <div className="icon-pills">
              <span className="icon-pill">
                <img src="/figma/landing/icon-games.svg" alt="" width={56} height={56} />
              </span>
              <span className="icon-pill icon-pill--ink">
                <img src="/figma/landing/icon-screen.svg" alt="" width={56} height={56} />
              </span>
              <span className="icon-pill">
                <img src="/figma/landing/icon-stats.svg" alt="" width={56} height={56} />
              </span>
              <span className="icon-pill">
                <img src="/figma/landing/icon-club.svg" alt="" width={56} height={56} />
              </span>
            </div>
            <p className="display-word">than</p>
          </div>
          <div className="hero-row">
            <p className="display-word">a</p>
            <i className="blob blob--accent" />
            <i className="blob blob--light" />
            <p className="display-word">match</p>
            <FactCard label="Nostalgia fact" value="18" text="years ago, you watched your first match" tag="EURO—2008" />
          </div>
        </div>

        <div className="hero-block hero-block--verbs">
          <div className="hero-verbs">
            <p className="display-word">Choose</p>
            <p className="display-word">control</p>
            <p className="display-word">discover</p>
            <p className="display-word">Change</p>
          </div>
          <article className="year-card year-card--accent">
            <header className="year-card__top">
              <div>
                <p className="fact-card__label">Match review</p>
                <p className="year-card__title">1-0 France</p>
              </div>
              <ArrowLink />
            </header>
            <div className="match-review-graph" aria-hidden="true">
              <div className="match-review-graph__axis">
                {MATCH_REVIEW_MINUTES.map((minute) => (
                  <span key={minute}>{minute}</span>
                ))}
              </div>
              <div className="match-review-graph__cols">
                <div className="match-review-graph__col">
                  {MATCH_REVIEW_FRANCE.map((index) => (
                    <i key={`fr-${index}`} className="dot dot--soft" style={{ ["--row" as string]: index + 1 }} />
                  ))}
                  <small>France</small>
                </div>
                <div className="match-review-graph__col">
                  {MATCH_REVIEW_PORTUGAL.map((index) => (
                    <i
                      key={`pt-${index}`}
                      className={`dot dot--soft${index === 0 ? " dot--lg dot--white" : ""}`}
                      style={{ ["--row" as string]: index + 1 }}
                    />
                  ))}
                  <small>Portugal</small>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="hero-block hero-block--story">
          <YearCard className="year-card--accent year-card--chart" year="/2016" title="Portugal’s first victory in a major tournament.">
            <div className="victory-graph" aria-hidden="true">
              <div className="victory-graph__axis-y">
                {["13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"].map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
              <div className="victory-graph__plot">
                <svg viewBox="0 0 340 340" preserveAspectRatio="none">
                  <polyline points="20,300 70,250 120,250 170,210 220,170 270,60 320,60" className="victory-line victory-line--faded" />
                  <polyline points="20,320 70,320 120,250 170,230 220,210 270,170 320,150" className="victory-line victory-line--main" />
                  {[["20", "320"], ["70", "320"], ["120", "250"], ["170", "230"], ["220", "210"], ["270", "170"], ["320", "150"]].map(([x, y]) => (
                    <circle key={`pt-main-${x}`} cx={x} cy={y} r="5" className="victory-dot victory-dot--main" />
                  ))}
                  {[["20", "300"], ["70", "250"], ["120", "250"], ["170", "210"], ["220", "170"], ["270", "60"], ["320", "60"]].map(([x, y]) => (
                    <circle key={`pt-fade-${x}`} cx={x} cy={y} r="5" className="victory-dot victory-dot--faded" />
                  ))}
                </svg>
                <div className="victory-graph__axis-x">
                  {["1", "2", "3", "4", "5", "6", "7"].map((value) => (
                    <span key={value}>{value}</span>
                  ))}
                </div>
              </div>
              <div className="victory-graph__legend">
                <p>
                  <i className="dot dot--white" />
                  Portugal goals
                </p>
                <p>
                  <i className="dot dot--soft" />
                  France goals
                </p>
              </div>
            </div>
          </YearCard>
          <div className="hero-verbs hero-verbs--left">
            <div className="hero-row hero-row--tight hero-row--kicker">
              <p className="display-kicker">the</p>
              <p className="display-word">story</p>
            </div>
            <p className="display-word">behind</p>
            <p className="display-word">every</p>
            <p className="display-word">moment</p>
          </div>
          <div className="hero-stack">
            <article className="year-card year-card--xl-only">
              <header className="year-card__top">
                <div>
                  <p className="fact-card__label">Match review</p>
                  <p className="year-card__title">2-1 Croatia</p>
                </div>
                <ArrowLink />
              </header>
              <ul className="stat-rows">
                <li>
                  <span>Passes</span>
                  <b>676</b>
                  <b>460</b>
                </li>
                <li>
                  <span>Distance</span>
                  <b>142km</b>
                  <b>148km</b>
                </li>
                <li>
                  <span>Possession</span>
                  <b>59%</b>
                  <b>41%</b>
                </li>
              </ul>
            </article>
            <article className="year-card">
              <header className="year-card__top">
                <div>
                  <p className="fact-card__label">Match review</p>
                  <p className="year-card__title">3-3 Hungary</p>
                </div>
                <ArrowLink />
              </header>
              <div className="circle-row">
                <CircleStat value="19" label="shots on goal" accent />
                <CircleStat value="90%" label="pass accuracy" />
                <CircleStat value="9" label="corners" />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConceptSection() {
  return (
    <section className="section" data-block="concept">
      <div className="shell">
        <header className="concept-head">
          <h2 className="section-title">{concept.title}</h2>
          <p className="section-body">{concept.body}</p>
        </header>
        <div className="concept-grid">
          <FactCard tall label="Wins fact" value="1" text="regular-time victory over Wales in the entire tournament">
            <Bars pairs={[[24, 24], [72, 72], [24, 24]]} />
          </FactCard>
          <div className="concept-stack">
            <FactCard label="Final fact" value="109" text="Eder’s extra-time goal beat host nation France in the final." />
            <FactCard
              label="Ronaldo fact"
              value="25"
              text="Cristiano Ronaldo played for a few minutes in the final of the tournament and then watched the match from the sidelines"
            />
          </div>
          <FactCard tall label="Goals scored and missed" value="9—5" text="The total difference between goals scored and conceded by the Portuguese national team">
            <Dots items={DOT_PATTERN} />
          </FactCard>
          <YearCard year="Match review" title="2:0 Wales">
            <div className="circle-row">
              <CircleStat value="17" label="shots on goal" accent />
              <CircleStat value="46%" label="ball possession" />
            </div>
          </YearCard>
        </div>
      </div>
    </section>
  );
}

export function ModesSection() {
  return (
    <section id={modes.id} className="section">
      <div className="shell">
        <h2 className="section-title section-title--center section-title--display">{modes.title}</h2>
        <div className="mode-grid">
          {modes.items.map((item) => (
            <div key={item.name} className={`mode-col-wrap mode-col-wrap--${item.theme}`}>
              <i className="mode-col__blob" aria-hidden="true" />
              <article className={`mode-col mode-col--${item.theme}`} style={{ ["--mode-accent" as string]: item.accent }}>
                <h3>{item.name}</h3>
                <div className="mode-col__cards">
                  <ModeStack />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id={story.id} className="section">
      <div className="shell">
        <div className="story-stage">
          <p className="story-caption story-caption--top">{story.title}</p>
          <div className="story-circle story-circle--left">
            <CircleStat value="31" label="goals scored" accent />
          </div>
          <article className="year-card story-match-card">
            <header className="year-card__top">
              <div>
                <p className="fact-card__label">Match review</p>
                <p className="year-card__title">2:0 Wales</p>
              </div>
              <ArrowLink />
            </header>
            <div className="circle-row">
              <CircleStat value="17" label="shots on goal" accent />
              <CircleStat value="46%" label="ball possession" />
            </div>
          </article>
          <div className="hud">
            <span className="icon-btn">
              <img src="/figma/landing/icon-arrow.svg" alt="" width={32} height={32} />
            </span>
            <div className="hud__score">
              <img className="crest" src="/figma/landing/crest-portugal.png" alt="" width={72} height={72} />
              <p>Por</p>
              <div>
                <b>0 — 0</b>
                <span>18:45</span>
              </div>
              <p>Fra</p>
              <img className="crest" src="/figma/landing/crest-france.png" alt="" width={72} height={72} />
            </div>
            <span className="icon-btn icon-btn--ghost">
              <img src="/figma/landing/icon-arrow.svg" alt="" width={32} height={32} />
            </span>
          </div>
          <div className="story-circle story-circle--right">
            <CircleStat value="77" label="goals scored" accent />
          </div>
          <article className="smart-facts">
            <p>smart facts</p>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index}>
                <p className="fact-card__tag">
                  <i className="status-dot" />
                  EURO—2008
                </p>
                <b>France: the home favorite</b>
                <span>Five wins, 13 goals and a 10-match winning streak against Portugal.</span>
              </div>
            ))}
          </article>
          <article className="view-mode">
            <p>View mode</p>
            <span className="is-on">Player</span>
            <span>Referee</span>
            <span>Behind goal</span>
            <span>Drone</span>
            <small>mode</small>
          </article>
          <p className="story-caption story-caption--bottom">{story.footer}</p>
        </div>
      </div>
    </section>
  );
}

export function MomentsSection() {
  return (
    <section className="section">
      <div className="shell">
        <div className="moments-type">
          <div className="moments-row">
            <i className="pill" />
            <p className="display-word">Watch</p>
            <i className="pill pill--accent" />
          </div>
          <div className="moments-row moments-row--end">
            <span className="icon-pill icon-pill--wide">
              <img src="/figma/landing/icon-games.svg" alt="" width={40} height={40} />
              <b>2</b>
            </span>
            <p className="display-kicker">the</p>
            <p className="display-word">match</p>
          </div>
          <p className="display-word display-word--center">Understand</p>
          <div className="moments-row">
            <i className="pill pill--accent" />
            <p className="display-kicker">the</p>
            <p className="display-word">moment</p>
            <p className="moments-chip">How Germany went to the championship in 2014</p>
          </div>
        </div>
        <div className="moments-grid">
          <FactCard tall label="Nostalgia fact" value="15" text="Champions League Cups won by Real Madrid">
            <Dots items={DOT_PATTERN} />
          </FactCard>
          <div className="concept-stack">
            <FactCard
              label="Nostalgia fact"
              value="18"
              text="years ago, you watched your first Switzerland — Turkey match"
              tag="EURO—2008"
            />
            <FactCard label="Favorite player fact" value="976" text="Cristiano Ronaldo has scored the most goals in his career so far" />
          </div>
          <article className="year-card year-card--wide">
            <header className="year-card__top">
              <div>
                <p className="fact-card__tag">
                  <i className="status-dot" />
                  Live
                </p>
                <p className="year-card__title">Barcelona</p>
              </div>
              <ArrowLink />
            </header>
            <div className="chip-row">
              <p className="moments-chip">The Benzema Extravaganza in 2021</p>
              <p className="moments-chip">How Germany went to the championship in 2014</p>
              <p className="fact-card__tag">324 fans discussions</p>
            </div>
          </article>
          <YearCard className="year-card--wide" year="/2008" title="Russia, incredible comebacks and golden Spain">
            <div className="circle-row">
              <CircleStat value="77" label="goals scored" accent />
              <CircleStat value="31" label="matches played" />
              <CircleStat value="12" label="Spain scored" />
            </div>
          </YearCard>
        </div>
      </div>
    </section>
  );
}

export function MatchViewSection() {
  return (
    <section id={matchView.id} className="section">
      <div className="shell">
        <h2 className="section-title section-title--center">{matchView.title}</h2>
        <div className="camera-grid">
          {matchView.cameras.map((camera) => (
            <figure key={camera.label}>
              <img src={camera.src} alt="" />
              <figcaption>{camera.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlayerFactsSection() {
  return (
    <section id={playerFacts.id} className="section section--player">
      <PlayerFactsMotion />
      <div className="player-facts player-facts--motion">
        <h2 className="section-title section-title--center section-title--display">{playerFacts.title}</h2>
        <img className="player-facts__photo" src="/figma/landing/ronaldo.png" alt="Cristiano Ronaldo" />
        <article className="player-note player-note--career">
          <p className="fact-card__tag">
            <i className="status-dot" />
            {playerFacts.career.label}
          </p>
          <h3>{playerFacts.career.title}</h3>
          <p>{playerFacts.career.body}</p>
        </article>
        <article className="player-note player-note--life">
          <p className="fact-card__tag">
            <i className="status-dot" />
            {playerFacts.life.label}
          </p>
          <h3>{playerFacts.life.title}</h3>
          <p>{playerFacts.life.body}</p>
        </article>
        {playerFacts.stats.map((stat) => (
          <article key={stat.label} className={`player-stat player-stat--${stat.label}`}>
            <b>{stat.value}</b>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section className="section section--experience">
      <div className="shell experience">
        <div className="experience__row experience__row--choose">
          <div className="hero-verbs hero-verbs--end">
            <p className="display-word">Choose</p>
            <p className="display-word">how</p>
          </div>
          <FactCard
            label="Goals scored and missed"
            value="9—5"
            text="The total difference between goals scored and conceded by the Portuguese national team"
          >
            <Dots items={DOT_PATTERN} />
          </FactCard>
        </div>
        <div className="experience__row experience__row--you">
          <FactCard label="Wins fact" value="1" text="regular-time victory over Wales in the entire tournament">
            <Bars pairs={[[24, 24], [72, 72], [24, 24]]} />
          </FactCard>
          <div className="hero-verbs">
            <p className="display-word">you</p>
            <p className="display-word">experience</p>
          </div>
        </div>
        <div className="experience__it">
          <i className="blob" />
          <i className="blob blob--accent" />
          <p className="display-word">it.</p>
          <i className="blob" />
          <i className="blob blob--accent" />
        </div>
        <p className="sr-only">
          Open the prototype at {site.productUrl}
        </p>
      </div>
    </section>
  );
}
