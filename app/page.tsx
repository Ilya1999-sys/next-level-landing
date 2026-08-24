import {
  ArchiveSection,
  CtaSection,
  HeroSection,
  HowSection,
  LiveSection,
  MatchSection,
  MoodsSection,
  ProductSection,
  StatsSection,
} from "@/components/sections/landing";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ProductSection />
      <MoodsSection />
      <ArchiveSection />
      <HowSection />
      <MatchSection />
      <LiveSection />
      <CtaSection />
    </main>
  );
}
