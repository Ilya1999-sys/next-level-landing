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
      <ConceptSection />
      <ModesSection />
      <StorySection />
      <MomentsSection />
      <MatchViewSection />
      <PlayerFactsSection />
      <ExperienceSection />
    </main>
  );
}
