"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { modes } from "@/lib/content";
import { CircleStat, FactCard, YearCard } from "@/components/ui/cards";
import { TextScramble } from "@/components/ui/text-scramble";

const BAR_PAIRS: [number, number][] = [
  [12, 12],
  [48, 12],
  [24, 72],
  [96, 24],
  [24, 12],
  [12, 48],
  [12, 12],
  [48, 4],
];

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

function Bars({ pairs }: { pairs: [number, number][] }) {
  return (
    <div className="bars" aria-hidden="true">
      {pairs.map(([h1, h2], i) => (
        <div key={i} className="bar-group">
          <i className="bar bar--gold" style={{ height: `${h1}%` }} />
          <i className="bar bar--dark" style={{ height: `${h2}%` }} />
        </div>
      ))}
    </div>
  );
}

export function ModesStackingScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 2) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Set initial state for cards
      cards.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, {
            yPercent: 100,
            scale: 1,
            filter: "brightness(1)",
          });
        } else {
          gsap.set(card, {
            yPercent: 0,
            scale: 1,
            filter: "brightness(1)",
          });
        }
      });

      // Pin and start stacking when the bottom of Card 0 is 130px above the bottom of the viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cards[0],
          start: "bottom bottom-=130px",
          end: "+=160%",
          pin: section,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Card 1 -> Card 2
      tl.to(
        cards[0],
        {
          scale: 0.94,
          filter: "brightness(0.78)",
          ease: "power2.inOut",
          duration: 1,
        },
        0
      ).to(
        cards[1],
        {
          yPercent: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

      // Card 2 -> Card 3
      if (cards[2]) {
        tl.to(
          cards[0],
          {
            scale: 0.88,
            filter: "brightness(0.58)",
            ease: "power2.inOut",
            duration: 1,
          },
          1
        )
          .to(
            cards[1],
            {
              scale: 0.94,
              filter: "brightness(0.78)",
              ease: "power2.inOut",
              duration: 1,
            },
            1
          )
          .to(
            cards[2],
            {
              yPercent: 0,
              ease: "power2.inOut",
              duration: 1,
            },
            1
          );
      }

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id={modes.id} ref={sectionRef} className="section modes-stacking-section">
      <div ref={stickyRef} className="modes-stacking-sticky">
        <div className="shell">
          <h2 className="section-title section-title--center section-title--display reveal-title">
            <span><TextScramble text={modes.title} /></span>
          </h2>
          <div className="modes-stacking-viewport">
            {modes.items.map((item, index) => (
              <div
                key={item.name}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`mode-col-wrap mode-col-wrap--${item.theme} modes-stack-card`}
                style={{ zIndex: index + 1 }}
              >
                <i className="mode-col__blob" aria-hidden="true" />
                <article
                  className={`mode-col mode-col--${item.theme}`}
                  style={{ ["--mode-accent" as string]: item.accent }}
                >
                  <h3>{item.name}</h3>
                  <div className="mode-col__cards">
                    <ModeStack />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
