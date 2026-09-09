"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { matchView } from "@/lib/content";

export function MatchViewHorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Calculate how far the track needs to translate horizontally
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 80);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=60",
          end: () => `+=${Math.max(window.innerHeight * 1.5, track.scrollWidth)}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Translate track horizontally
      tl.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      // Parallax on image contents
      imagesRef.current.filter(Boolean).forEach((img) => {
        tl.to(
          img,
          {
            xPercent: 12,
            ease: "none",
          },
          0
        );
      });

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id={matchView.id} ref={sectionRef} className="section match-view-horizontal-section">
      <div className="shell match-view-shell">
        <h2 className="section-title section-title--center reveal-title">
          <span>{matchView.title}</span>
        </h2>
        <div className="match-view-track-wrapper">
          <div ref={trackRef} className="match-view-track">
            {matchView.cameras.map((camera, index) => (
              <figure key={camera.label} className="match-camera-card reveal-card">
                <div className="match-camera-card__img-wrap">
                  <img
                    ref={(el) => {
                      imagesRef.current[index] = el;
                    }}
                    src={camera.src}
                    alt={camera.label}
                  />
                </div>
                <figcaption>{camera.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
