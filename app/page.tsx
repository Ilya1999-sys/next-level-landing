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
import { CardMotion } from "@/components/ui/card-motion";

export default function HomePage() {
  return (
    <main>
      <CardMotion />
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
