export const site = {
  name: "Next Level",
  tagline: "Your mood, your match",
  productUrl: "#archive",
};

export const nav = [
  { href: "#product", label: "Product" },
  { href: "#moods", label: "Moods" },
  { href: "#archive", label: "Archive" },
  { href: "#match", label: "Match night" },
];

export const hero = {
  eyebrow: "Football archive",
  title: ["Your mood,", "your match."],
  body: "Next Level is a football app for nights you still rewind. It does not chase the table. It rebuilds the matches that stayed with you — then lets fans argue the 109th minute.",
  primary: { href: "#archive", label: "Open the archive" },
  secondary: { href: "#how", label: "See the structure" },
};

export const stats = [
  { value: "3", label: "Moods. One archive." },
  { value: "109'", label: "The frame everyone reopens" },
  { value: "15", label: "Madrid cups in the museum" },
  { value: "324", label: "Fans still in the room" },
];

export const product = {
  eyebrow: "The idea",
  title: "A personal football memory, not a scoreboard.",
  body: "Home is an editorial feed. Cards hold Barcelona 2009, Zidane in 2006, Portugal 2016, Euro 2008. Facts sit next to them: Mbappe’s five in one night, the first Switzerland–Turkey you watched, Ronaldo’s 976. Hover a card and the still becomes the clip.",
};

export const moods = {
  eyebrow: "Temperature",
  title: "Same nights. Three ways to feel them.",
  items: [
    {
      id: "nostalgia",
      name: "Nostalgia",
      accent: "var(--bg-accent)",
      text: "Figma as drawn. Grey stipple, electric blue, lime live-dots. The default temperature of the archive.",
    },
    {
      id: "drama",
      name: "Drama",
      accent: "#ff0901",
      text: "Broadcast red, grain, scan. The same cards, hotter. Hover still crossfades into colour.",
    },
    {
      id: "legends",
      name: "Legends",
      accent: "#ff9e01",
      text: "Warm archive gold. Colour player files at rest. The museum lighting for galacticos and golden generations.",
    },
  ],
};

export const features = {
  eyebrow: "Inside the app",
  title: "Surfaces you already built.",
  items: [
    {
      id: "feed",
      title: "Mood feed",
      text: "Asymmetric cards, fact blocks, and a live discussion strip. Discovery by memory, not by fixture list.",
      slot: "Home / 323:3871",
    },
    {
      id: "hud",
      title: "Match HUD",
      text: "Score, smart facts, Rate, Health. Closed panels stay opaque. Open panels go glass. Cameras: player, referee, behind goal, drone.",
      slot: "Euro final overlay",
    },
    {
      id: "stats",
      title: "Player & club files",
      text: "Mbappe’s night, Madrid’s 15 cups, unlockable cards, fan predictions. Stats as archive, not a spreadsheet.",
      slot: "Stats / My club",
    },
    {
      id: "forum",
      title: "Live rooms",
      text: "Chips for the arguments that never closed. Eder from extra time. If Ronaldo stays on the pitch.",
      slot: "Forum / match discussion",
    },
    {
      id: "replay",
      title: "Hover replay",
      text: "Player stills hide. A muted looping clip fills the card. The arrow stays. Pause keeps minute 109 on the desk.",
      slot: "Card hover / Pause",
    },
    {
      id: "rewards",
      title: "Votes & bonuses",
      text: "Rate the XI, collect bonus points, unlock cards. The archive pays you back for coming back.",
      slot: "Profile rewards",
    },
  ],
};

export const how = {
  eyebrow: "How it plays",
  title: "Four moves from mood to minute.",
  steps: [
    {
      n: "01",
      title: "Pick a temperature",
      text: "Nostalgia, Drama, or Legends. Colour, grain, and card lineup change. Layout stays.",
    },
    {
      n: "02",
      title: "Open a night",
      text: "Portugal 2016, USA–Ghana 2010, a club path, a player file. Every card is a door into a match.",
    },
    {
      n: "03",
      title: "Read the facts, rate the pitch",
      text: "Smart facts, timelines, possession bars. Then Rate and Health on the HUD while the clip runs.",
    },
    {
      n: "04",
      title: "Stay in the room",
      text: "The forum keeps the argument live. Notifications bring you back ten minutes before a rewatch.",
    },
  ],
};

export const matchCase = {
  eyebrow: "Match night",
  kicker: "EURO—2016  ·  Saint-Denis",
  title: "Portugal 1–0 France.",
  body: "Ronaldo leaves the pitch injured. Eder scores in extra time. The striker from the Russian league writes the golden goal. Next Level treats that night as a stage: video under the HUD, timelines for both XIs, and a room that still argues minute 109.",
  facts: [
    { value: "109'", label: "Eder’s extra-time strike" },
    { value: "1", label: "Regular-time win in the whole run" },
    { value: "0–0", label: "Until the captain was gone" },
  ],
};

export const live = {
  eyebrow: "The room",
  title: "The match ends. The discussion does not.",
  place: "Barcelona",
  fans: "324 fans in discussion",
  chips: ["The Benzema Extravaganza in 2021", "How Germany went to the championship in 2014", "Eder from extra time"],
};

export const cta = {
  title: "Rewind the night that still sits with you.",
  body: "This page is the case for Next Level. The product already holds the feed, the HUD, the files, and the forum. The look follows Nostalgia — grey field, blue accent, lime mark.",
  action: { href: "#product", label: "Back to the product" },
};

export const footer = {
  note: "Next Level  ·  Football archive",
  rights: "Structure first. Style tokens live in /tokens.",
};
