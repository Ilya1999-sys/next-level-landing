export const site = {
  name: "Next Level",
  productUrl: "https://next-level-git-cursor-home-player-figma-layout-next-level-1999.vercel.app/",
  telegramUrl: "https://t.me/ilya_uxui_design",
};

export const nav = [
  { href: "#modes", label: "Modes" },
  { href: "#story", label: "Story" },
  { href: "#match-view", label: "Match view" },
  { href: "#player-facts", label: "Player facts" },
] as const;

export const concept = {
  title: "Not every match is watched for the same reason.",
  body: "People do not always open football for the score. They come for tension, memory, or context. Next Level starts from this feeling and builds a different path into the game.",
};

export const modes = {
  id: "modes",
  title: "Three viewing modes",
  items: [
    {
      name: "Legends",
      theme: "legends" as const,
      accent: "#ff9e01",
    },
    {
      name: "Nostalgia",
      theme: "nostalgia" as const,
      accent: "#012fff",
    },
    {
      name: "Drama",
      theme: "drama" as const,
      accent: "#ff0901",
    },
  ],
};

export const story = {
  id: "story",
  title: "Every match belongs to a bigger story.",
  footer: "Discover moments, Explore context, Watch differently",
};

export const matchView = {
  id: "match-view",
  title: "Not every match is watched for the same reason.",
  cameras: [
    { src: "/figma/landing/camera-referee.png", label: "Referee" },
    { src: "/figma/landing/camera-player.png", label: "Player" },
    { src: "/figma/landing/camera-behind-goal.png", label: "Behind goal" },
    { src: "/figma/landing/camera-drone.png", label: "Drone" },
  ],
};

export const playerFacts = {
  id: "player-facts",
  title: "Every player tells a different story.",
  career: {
    label: "Career fact",
    title: "The move that changed everything",
    body: "After impressing against Manchester United in a 2003 friendly, Ronaldo signed for the English club at 18. He later became one of the defining players of the Sir Alex Ferguson era.",
  },
  life: {
    label: "life fact",
    title: "From Madeira to the world stage",
    body: "Cristiano Ronaldo was born in Funchal, on the Portuguese island of Madeira, on 5 February 1985.",
  },
  stats: [
    { value: "10000+", label: "goals" },
    { value: "200+", label: "events" },
    { value: "1500+", label: "matches" },
    { value: "400+", label: "facts" },
  ],
};

export const footer = {
  project: "Next Level — concept case",
  author: "Ilya Polikarpov",
  role: "Product design / UX / UI",
  telegram: "@ilya_uxui_design",
};
