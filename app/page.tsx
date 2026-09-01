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

export default function HomePage() {
  return (
    <main>
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
