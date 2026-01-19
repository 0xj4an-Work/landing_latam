import type { FaqItem } from "@/components/faq.types";

export const INFO = {
  name: "Latam Buildathon",
  tagline: "Build in public with LATAM’s fastest builders.",
  subtag:
    "A high-energy buildathon for founders, hackers, and designers across Latin America. Ship something real in days and launch faster.",
  applyUrl: "#apply",
  discordUrl: "http://chat.celo.org/",
  rulesUrl: "#rules",
} as const;

export const NAV_LINKS = [
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Timeline" },
  { href: "#rules", label: "Rules" },
  { href: "#submit", label: "Submit" },
  { href: "#resources", label: "Resources" },
  { href: "#prizes", label: "Prizes" },
  { href: "#faq", label: "FAQ" },
] as const;

export type ResourceLanguage = "spanish" | "english" | "portuguese";

export const RESOURCES: Record<
  ResourceLanguage,
  ReadonlyArray<{ title: string; links: ReadonlyArray<{ label: string; url: string }> }>
> = {
  spanish: [
    {
      title: "Celo MX Resources",
      links: [
        {
          label: "Construye tu colección de NFTs con Thirdweb en la red de Celo (Celo Academy)",
          url: "https://www.celo.mx/academy/construye-tu-coleccion-de-nfts-con-thirweb-en-la-red-de-celo-mhw37vrj",
        },
        {
          label: "Construye tu MiniApp en Farcaster (Celo Academy)",
          url: "https://www.celo.mx/academy/construye-tu-miniapp-en-farcaster",
        },
        {
          label: "Reputación On-Chain y Programas de Incentivos (Celo Academy)",
          url: "https://www.celo.mx/academy/reputacion-on-chain-y-programas-de-incentivos",
        },
        {
          label: "Instalación y Configuración de un MCP Server con ComposerKit en Celo (YouTube)",
          url: "https://www.youtube.com/watch?v=96GXwyv6uh4&list=PLacAHCHDWS0oHVH7Toqvgjzi87NVSBEVJ&index=2",
        },
      ],
    },
    {
      title: "Celo Colombia",
      links: [
        {
          label: "Build in Public Playlist (YouTube)",
          url: "https://youtu.be/LLVC6Gg-Czo",
        },
      ],
    },
    {
      title: "CeLatam",
      links: [
        {
          label: "De 0 al Mini App | Tutoriales de Vibecoding",
          url: "https://youtube.com/playlist?list=PLTHLb5LyByJsbq1eMoo-_4ySshi-QAG27",
        },
        {
          label: "Webinars",
          url: "https://youtube.com/playlist?list=PLTHLb5LyByJsBfXgRODRA2InM4-ZGPwKL",
        },
      ],
    },
  ],
  english: [
    {
      title: "Human.Tech",
      links: [
        {
          label: "Human.Tech Documentation",
          url: "https://docs.human.tech/",
        },
        {
          label: "WaaP Documentation - Embedded Wallet Login",
          url: "https://docs.waap.xyz",
        },
        {
          label: "Passport Documentation - Sybil Resistance & Compliance",
          url: "https://docs.passport.xyz",
        },
        {
          label: "Passport Embeds Guide (Recommended)",
          url: "https://docs.passport.xyz/building-with-passport/embed/introduction",
        },
      ],
    },
    {
      title: "v0 by Vercel",
      links: [
        {
          label: "v0 Documentation",
          url: "https://v0.dev/docs",
        },
        {
          label: "v0 Templates Directory",
          url: "https://v0.app/templates",
        },
        {
          label: "Getting Started with v0",
          url: "https://v0.dev",
        },
      ],
    },
  ],
  portuguese: [
    {
      title: "CeLatam",
      links: [
        {
          label: "Do 0 ao Mini App | Tutoriais de Vibecoding",
          url: "https://youtube.com/playlist?list=PLTHLb5LyByJswm1jw1YG13dn9piwrk5_t",
        },
      ],
    },
    {
      title: "Celo Builders PT",
      links: [
        {
          label: "Celo Builders PT - Recursos e Guias",
          url: "https://striped-track-8f3.notion.site/Celo-Builders-PT-2e11710eea9e81c69edcd7e2158c97be",
        },
      ],
    },
  ],
} as const;

export const TIMELINE = [
  {
    title: "Pre-registrations",
    range: "Dec 18, 2025 → Jan 19, 2026",
    note: "Get early access and prep your idea/team.",
  },
  {
    title: "Buildathon",
    range: "Jan 19 → Feb 27, 2026",
    note: "Registrations remain open until Feb 27.",
  },
  {
    title: "Winners announced",
    range: "Mar 6, 2026",
    note: "Top projects + special awards revealed.",
  },
] as const;

export const MAIN_TRACKS = [
  { 
    title: "Open Track", 
    description: "Anything goes, build what you're most excited about.", 
    available: true,
    prize: "8,000 CELO",
    prizeDetails: "Split among top projects"
  },
  { 
    title: "MiniApps (Farcaster/MiniPay)", 
    description: "Build and launch a cool MiniApp on Farcaster or MiniPay and get exposure from Celo Account in Farcaster in their MiniApp Mondays!", 
    available: true,
    prize: "Part of 8,000 CELO pool",
    prizeDetails: "Best MiniApp projects"
  },
] as const;

export const SPONSOR_BOUNTIES = [
  {
    title: "Human.Tech",
    description: "Integrate WaaP for wallet login experiences or Passport for Sybil resistance and compliance. WaaP enables embedded wallets or brings existing wallets to your app. Passport provides proof-of-personhood via embeds.",
    available: true,
    logoLight: "/human.tech_logo_black.svg",
    logoDark: "/human.tech_logo_white.svg",
    logoUrl: "https://human.tech",
    prize: "1,000 USDC",
    prizeDetails: "2x $250 (Passport) + 5x $100 (WaaP)",
    prizeBreakdown: [
      { place: "Best Passport Integration #1", amount: "$250 USDC", description: "Top Human Passport integration with embeds" },
      { place: "Best Passport Integration #2", amount: "$250 USDC", description: "Outstanding Passport integration" },
      { place: "Best WaaP Integration #1", amount: "$100 USDC", description: "Top WaaP wallet login flow" },
      { place: "Best WaaP Integration #2", amount: "$100 USDC", description: "Great WaaP wallet login flow" },
      { place: "Best WaaP Integration #3", amount: "$100 USDC", description: "Great WaaP wallet login flow" },
      { place: "Best WaaP Integration #4", amount: "$100 USDC", description: "Great WaaP wallet login flow" },
      { place: "Best WaaP Integration #5", amount: "$100 USDC", description: "Great WaaP wallet login flow" }
    ]
  },
  {
    title: "v0",
    description: "Build with v0 and show the v0 branding on your site. Projects must be published as public templates in the v0 directory at https://v0.app/templates. Plus: 200 codes of $10 USD in v0 credits for VibeCoding workshop participants!",
    available: true,
    logoLight: "/v0-logo-light.svg",
    logoDark: "/v0-logo-dark.svg",
    logoUrl: "https://v0.app",
    prize: "$1,000 USD",
    prizeDetails: "1st: $500 | 2nd: $300 | 3rd: $200 in v0 credits",
    prizeBreakdown: [
      { place: "1st Place", amount: "$500 USD", description: "In v0 credits" },
      { place: "2nd Place", amount: "$300 USD", description: "In v0 credits" },
      { place: "3rd Place", amount: "$200 USD", description: "In v0 credits" },
      { place: "Workshop Bonus", amount: "$10 USD each", description: "200 codes for VibeCoding workshop participants" }
    ]
  },
] as const;

// Legacy export for backward compatibility
export const TRACKS = [...MAIN_TRACKS, ...SPONSOR_BOUNTIES] as const;

export type HighlightIconKey = "rocket" | "globe" | "star" | "bolt";

export const HIGHLIGHTS = [
  {
    title: "Ship fast",
    description:
      "Go from idea to deployed demo with practical mentoring, tight scope, and clear milestones.",
    icon: "rocket",
  },
  {
    title: "Build with LATAM",
    description:
      "Meet builders from Mexico to Argentina. Form teams, find cofounders, and learn by doing.",
    icon: "globe",
  },
  {
    title: "Strong feedback",
    description:
      "Get product + engineering feedback from judges and mentors who’ve shipped at scale.",
    icon: "star",
  },
  {
    title: "Momentum & visibility",
    description:
      "Share updates, demos, and wins. The best projects get highlighted to the community.",
    icon: "bolt",
  },
] as const satisfies ReadonlyArray<{
  title: string;
  description: string;
  icon: HighlightIconKey;
}>;

export const COMMUNITIES = [
  { name: "Celo Mexico", url: "https://celo.mx" },
  { name: "Celo Colombia", url: "https://celocolombia.org" },
  { name: "Celo Brazil", url: null },
  { name: "Celo Argentina", url: null },
  { name: "CeLatam", url: "https://celatam.org" },
] as const;

export const FAQ = [
  {
    question: "Who can participate?",
    answer:
      "Builders from LATAM, living in LATAM—developers, designers, PMs, and founders. You can join solo or with a team (teams must be at least 50% LATAM).",
  },
  {
    question: "Do I need a team?",
    answer:
      "No. You can apply solo and team up during kickoff, or you can bring a team. Solo projects are welcome too.",
  },
  {
    question: "Can I apply to more than one track?",
    answer:
      "Yes — you can (and should!) apply to ALL tracks that fit your project. Compete in Open Track AND MiniApps if you're building a MiniApp. Add Human.Tech (WaaP or Passport) and v0 integrations to be eligible for sponsor bounties too. One project can win prizes in multiple categories!",
  },
  {
    question: "What do I need to submit?",
    answer:
      "A Karma Gap link to your project. Inside your Karma Gap project profile include: live demo link, GitHub repo link, slides, and a demo video.",
  },
  {
    question: "What are the judging criteria?",
    answer: "Impact, execution quality, clarity of the demo, and craft. Bonus points for shipping end-to-end and telling a great story. Special consideration: Projects generating the most transactions on Celo Mainnet receive higher prize consideration. All transactions count until the last day of the buildathon (Feb 27, 2026).",
  },
  {
    question: "How do submissions work?",
    answer:
      "Submit via a form with your Karma Gap project link. Your Karma Gap project should include your GitHub repo, deck, and demo.",
  },
  {
    question: "How do sponsor bounties work?",
    answer:
      "Sponsor bounties are additional prizes for integrating specific technologies. Human.Tech offers $1,000 USDC: 2 prizes of $250 for best Human.Passport integrations (embeds) and 5 prizes of $100 for best WaaP wallet login flows. v0 offers $1,000 USD in credits (1st: $500, 2nd: $300, 3rd: $200), plus 200 codes of $10 USD for VibeCoding workshop participants. You can win prizes from both main tracks AND sponsor bounties!",
  },
  {
    question: "Do transactions on mainnet affect my chances of winning?",
    answer:
      "Yes! Projects that generate the most transactions on Celo Mainnet receive special consideration for higher prizes. This demonstrates real usage and engagement with your dApp. All transactions count from the start of the buildathon until the last day (Feb 27, 2026). Deploy early and encourage users to interact with your project!",
  },
] as const satisfies ReadonlyArray<FaqItem>;

export type Sponsor = {
  name: string;
  website?: string;
};

export const SPONSORS: ReadonlyArray<Sponsor> = [
  { name: "Celo Devs", website: "https://celo-devs.beehiiv.com/subscribe" },
  { name: "Human.Tech", website: "https://human.tech" },
  { name: "v0", website: "https://v0.app" },
] as const;
