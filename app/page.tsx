import { Suspense } from "react";
import {
  ConceptSection,
  ExperienceSection,
  HeroSection,
  MatchViewSection,
  ModesSection,
  MomentsSection,
  PlayerFactsSection,
  StorySection,
} from "@/components/sections/landing";
import { GridDebug } from "@/components/ui/grid-debug";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function HomePage() {
  return (
    <main>
      <Suspense>
        <GridDebug />
      </Suspense>
      <ScrollReveal />
      <HeroSection />
      <div className="band band--white">
        <ConceptSection />
        <ModesSection />
        <StorySection />
      </div>
      <MomentsSection />
      <MatchViewSection />
      <PlayerFactsSection />
      <ExperienceSection />
    </main>
  );
}
