/* ═══════════════════════════════════════════════════════════
   IDEAS — Content Ideas Mock Data
   ═══════════════════════════════════════════════════════════ */

export interface ContentIdea {
  id: string;
  title: string;
  handle: string;
  platform: string;
  date: string;
  country: string;
  countryFlag: string;
  contentType: string;
  visualFormat: string;
  topic: string;
  topicSummary: string;
  duration: string;
  outlierScore: number;
  views: string;
  reach: string;
  likes: string;
  comments: string;
  shares: string;
  saves: string;
  plays: string;
  replays: string;
  totalWatchTime: string;
  avgWatchTime: string;
  totalInteractions: string;
  spokenHook: string;
  textHook: string;
  visualHook: string;
  audioHook: string;
  hookFramework: string;
  hookStructure: string;
  contentStructure: string;
  cta: string;
  caption: string;
  source: string;
  status: string;
  analyzedAt: string;
  metricsUpdatedAt: string;
  createdAt: string;
  videoUrl: string;
  thumbnail: string;
}

export const MOCK_IDEAS: ContentIdea[] = [
  {
    id: "idea_01",
    title: "Você tá usando IA do jeito errado...",
    handle: "@ogabarbosa",
    platform: "Instagram",
    date: "Mar 15, 2026",
    country: "Brazil",
    countryFlag: "🇧🇷",
    contentType: "Tutorial",
    visualFormat: "Talking Head",
    topic: "AI Prompt Engineering",
    topicSummary:
      "Creator explains common mistakes when using AI tools like ChatGPT, emphasizing the importance of context, structure, and technique in prompt engineering for better results.",
    duration: "0:45",
    outlierScore: 8.4,
    views: "124.3K",
    reach: "98.7K",
    likes: "8,412",
    comments: "1,247",
    shares: "3,891",
    saves: "5,234",
    plays: "142.8K",
    replays: "18.4K",
    totalWatchTime: "847.2h",
    avgWatchTime: "21.3s",
    totalInteractions: "18,784",
    spokenHook:
      "Você tá usando IA do jeito errado e nem sabe disso. A maioria das pessoas acha que é só jogar um prompt e esperar mágica acontecer, mas a real é que sem contexto, sem estrutura, sem técnica, a IA vai te dar lixo.",
    textHook: "Você tá usando IA do jeito ERRADO",
    visualHook:
      "Creator staring at screen with shocked expression, screen showing ChatGPT interface with red X overlay, split-screen comparison of bad vs good prompt results.",
    audioHook:
      "Dramatic pause after 'do jeito errado' with rising tension music, followed by a beat drop on the reveal.",
    hookFramework: "Curiosity Gap",
    hookStructure: "Question → Reveal",
    contentStructure:
      "Hook (problem statement) → Agitate (common mistakes) → Solution (proper technique) → Demo (live example) → CTA (follow for more)",
    cta: "Follow for more AI tips that actually work. Link in bio for the full prompt engineering guide.",
    caption:
      "Você tá usando IA do jeito errado e nem sabe disso 🤯 A real é que 90% das pessoas jogam um prompt genérico e acham que isso é o máximo... Salva esse post e compartilha com alguém que precisa ver isso! #IA #promptengineering #chatgpt",
    source: "Instagram API",
    status: "Analyzed",
    analyzedAt: "Mar 16, 2026 09:14",
    metricsUpdatedAt: "Mar 28, 2026 15:42",
    createdAt: "Mar 15, 2026 22:30",
    videoUrl: "https://instagram.com/p/example1",
    thumbnail: "/images/ideas/thumb-01.jpg",
  },
  {
    id: "idea_02",
    title: "Stop building apps nobody wants...",
    handle: "@maborsolmk",
    platform: "YouTube",
    date: "Feb 28, 2026",
    country: "United States",
    countryFlag: "🇺🇸",
    contentType: "How-To",
    visualFormat: "Screen Recording",
    topic: "Product Validation",
    topicSummary:
      "Developer shares a systematic approach to validating app ideas before writing code, including user research and MVP strategies.",
    duration: "12:30",
    outlierScore: 6.1,
    views: "89.2K",
    reach: "72.1K",
    likes: "5,891",
    comments: "834",
    shares: "2,145",
    saves: "3,467",
    plays: "95.4K",
    replays: "12.1K",
    totalWatchTime: "1,245.8h",
    avgWatchTime: "4:12",
    totalInteractions: "12,337",
    spokenHook:
      "Stop building apps nobody wants. I know it sounds harsh but hear me out — 90% of side projects fail not because of bad code, but because nobody needed them in the first place.",
    textHook: "Stop building apps NOBODY wants",
    visualHook:
      "Split screen showing graveyard of failed app icons on left, thriving app with users on right.",
    audioHook: "Ominous tone on 'nobody wants', upbeat shift on the solution reveal.",
    hookFramework: "Bold Claim",
    hookStructure: "Statement → Evidence",
    contentStructure:
      "Hook → Problem (wasted effort) → Framework (validation steps) → Case Study → Tools → CTA",
    cta: "Subscribe and hit the bell for weekly dev business tips.",
    caption:
      "Stop building apps nobody wants 🛑 Here's my 5-step validation framework that saved me months of wasted development time... #dev #startup #buildinpublic",
    source: "YouTube API",
    status: "Analyzed",
    analyzedAt: "Mar 01, 2026 14:22",
    metricsUpdatedAt: "Mar 28, 2026 15:42",
    createdAt: "Feb 28, 2026 18:00",
    videoUrl: "https://youtube.com/watch?v=example2",
    thumbnail: "/images/ideas/thumb-02.jpg",
  },
  {
    id: "idea_03",
    title: "This AI tool replaced my entire team...",
    handle: "@techreviewer",
    platform: "TikTok",
    date: "Mar 22, 2026",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    contentType: "Review",
    visualFormat: "Talking Head",
    topic: "AI Tools",
    topicSummary:
      "Tech reviewer demonstrates an AI tool that automates multiple team workflows, discussing implications for small businesses and solopreneurs.",
    duration: "0:58",
    outlierScore: 9.2,
    views: "245.1K",
    reach: "198.3K",
    likes: "18,923",
    comments: "3,412",
    shares: "8,745",
    saves: "12,891",
    plays: "312.4K",
    replays: "45.2K",
    totalWatchTime: "2,134.5h",
    avgWatchTime: "24.6s",
    totalInteractions: "43,971",
    spokenHook:
      "This AI tool literally replaced my entire team of five people. I'm not even exaggerating — let me show you exactly what it does.",
    textHook: "This AI tool REPLACED my entire team",
    visualHook:
      "Creator sitting at desk surrounded by empty chairs, then showing dashboard with automated workflows.",
    audioHook:
      "Silence after 'entire team' for dramatic effect, then upbeat music kicks in with the demo.",
    hookFramework: "Shock Value",
    hookStructure: "Claim → Proof",
    contentStructure:
      "Hook (bold claim) → Context (team size) → Demo (tool walkthrough) → Results (metrics) → CTA",
    cta: "Follow for more AI tool reviews. Comment 'TOOL' and I'll DM you the link.",
    caption:
      "This AI tool replaced my entire team of 5 🤖 Not clickbait — here's the full breakdown of what it does and how much I'm saving... #AI #automation #solopreneur",
    source: "TikTok API",
    status: "Analyzed",
    analyzedAt: "Mar 23, 2026 08:45",
    metricsUpdatedAt: "Mar 28, 2026 15:42",
    createdAt: "Mar 22, 2026 14:15",
    videoUrl: "https://tiktok.com/@techreviewer/video/example3",
    thumbnail: "/images/ideas/thumb-03.jpg",
  },
  {
    id: "idea_04",
    title: "Por que todo dev deveria aprender a vender",
    handle: "@ogabarbosa",
    platform: "Instagram",
    date: "Mar 25, 2026",
    country: "Brazil",
    countryFlag: "🇧🇷",
    contentType: "Opinion",
    visualFormat: "Talking Head",
    topic: "Developer Career",
    topicSummary:
      "Gabriel argues that sales skills are the missing differentiator for most developers and shares how it impacted his career trajectory.",
    duration: "1:02",
    outlierScore: 7.3,
    views: "67.8K",
    reach: "54.2K",
    likes: "4,567",
    comments: "891",
    shares: "1,234",
    saves: "2,890",
    plays: "78.4K",
    replays: "9.8K",
    totalWatchTime: "512.3h",
    avgWatchTime: "23.5s",
    totalInteractions: "9,582",
    spokenHook:
      "O que separa um dev que ganha R$5k de um que ganha R$25k não é código. É a capacidade de vender — vender ideias, vender soluções, vender a si mesmo.",
    textHook: "O que separa um dev de R$5k de um de R$25k",
    visualHook:
      "Split screen with two developer setups — modest on left, premium on right. Text overlay with salary comparison.",
    audioHook: "Pause after the salary reveal for impact.",
    hookFramework: "Curiosity Gap",
    hookStructure: "Contrast → Reveal",
    contentStructure:
      "Hook (salary gap) → Story (personal experience) → Framework (sales skills for devs) → Examples → CTA",
    cta: "Segue pra mais conteúdo sobre carreira dev. Salva esse post.",
    caption:
      "O que separa um dev de R$5k de um de R$25k NÃO é código 💰 Depois de anos achando que ser bom de código era suficiente, descobri o que realmente faz diferença... #dev #carreira #programação",
    source: "Instagram API",
    status: "Analyzed",
    analyzedAt: "Mar 26, 2026 10:30",
    metricsUpdatedAt: "Mar 28, 2026 15:42",
    createdAt: "Mar 25, 2026 20:00",
    videoUrl: "https://instagram.com/p/example4",
    thumbnail: "/images/ideas/thumb-04.jpg",
  },
  {
    id: "idea_05",
    title: "Setup de terminal produtivo em 5 minutos",
    handle: "@ogabarbosa",
    platform: "TikTok",
    date: "Mar 15, 2026",
    country: "Brazil",
    countryFlag: "🇧🇷",
    contentType: "Tutorial",
    visualFormat: "Screen Recording",
    topic: "Developer Tools",
    topicSummary:
      "Quick terminal setup walkthrough covering Zsh, Starship prompt, essential aliases and plugins for maximum productivity.",
    duration: "0:52",
    outlierScore: 5.8,
    views: "45.2K",
    reach: "38.1K",
    likes: "3,201",
    comments: "567",
    shares: "1,890",
    saves: "4,123",
    plays: "52.3K",
    replays: "7.6K",
    totalWatchTime: "298.4h",
    avgWatchTime: "20.1s",
    totalInteractions: "9,781",
    spokenHook:
      "Se seu terminal parece isso, você tá perdendo tempo. Em 5 minutos eu vou transformar ele nisso.",
    textHook: "Se seu terminal parece ISSO, você tá perdendo tempo",
    visualHook:
      "Side-by-side: ugly default terminal on left transforming into beautiful custom terminal on right.",
    audioHook: "Typing sounds on the 'before', satisfying whoosh on the 'after' reveal.",
    hookFramework: "Before/After",
    hookStructure: "Problem → Transform",
    contentStructure:
      "Hook (before/after) → Step 1 (Zsh) → Step 2 (Starship) → Step 3 (Aliases) → Final Result → CTA",
    cta: "Segue pra mais dicas de dev. Link na bio pro guia completo.",
    caption:
      "Se seu terminal parece isso, você tá perdendo tempo ⏰ Em 5 min eu transformo ele completamente... #terminal #dev #produtividade",
    source: "TikTok API",
    status: "Analyzed",
    analyzedAt: "Mar 16, 2026 11:00",
    metricsUpdatedAt: "Mar 28, 2026 15:42",
    createdAt: "Mar 15, 2026 16:45",
    videoUrl: "https://tiktok.com/@ogabarbosa/video/example5",
    thumbnail: "/images/ideas/thumb-05.jpg",
  },
  {
    id: "idea_06",
    title: "React Server Components in 60 seconds",
    handle: "@reactdev",
    platform: "YouTube",
    date: "Mar 20, 2026",
    country: "United States",
    countryFlag: "🇺🇸",
    contentType: "Tutorial",
    visualFormat: "Animation",
    topic: "React Architecture",
    topicSummary:
      "Concise animated explainer of React Server Components — what they are, why they exist, and when to use them vs client components.",
    duration: "1:00",
    outlierScore: 7.8,
    views: "156.7K",
    reach: "128.4K",
    likes: "11,234",
    comments: "1,567",
    shares: "5,678",
    saves: "8,901",
    plays: "178.2K",
    replays: "22.3K",
    totalWatchTime: "1,567.3h",
    avgWatchTime: "31.2s",
    totalInteractions: "27,380",
    spokenHook:
      "If you don't understand Server Components, you're already falling behind. Here's everything you need to know in 60 seconds.",
    textHook: "Server Components explained in 60 SECONDS",
    visualHook:
      "Animated diagram showing server and client boundary with components flowing between them.",
    audioHook: "Timer ticking sound effect to emphasize the 60-second constraint.",
    hookFramework: "Urgency",
    hookStructure: "Warning → Promise",
    contentStructure:
      "Hook (urgency) → What (definition) → Why (benefits) → When (use cases) → Diagram → CTA",
    cta: "Subscribe for more React deep dives in 60 seconds or less.",
    caption:
      "React Server Components in 60 seconds ⚛️ Everything you need to know... #react #nextjs #webdev #frontend",
    source: "YouTube API",
    status: "Analyzed",
    analyzedAt: "Mar 21, 2026 09:00",
    metricsUpdatedAt: "Mar 28, 2026 15:42",
    createdAt: "Mar 20, 2026 12:00",
    videoUrl: "https://youtube.com/watch?v=example6",
    thumbnail: "/images/ideas/thumb-06.jpg",
  },
  {
    id: "idea_07",
    title: "Automação com n8n que economiza 10h/semana",
    handle: "@ogabarbosa",
    platform: "Instagram",
    date: "Mar 31, 2026",
    country: "Brazil",
    countryFlag: "🇧🇷",
    contentType: "How-To",
    visualFormat: "Screen Recording",
    topic: "Automation",
    topicSummary:
      "Real workflow automation using n8n — from lead capture to automated follow-up, saving 10 hours per week.",
    duration: "1:15",
    outlierScore: 6.5,
    views: "52.1K",
    reach: "43.8K",
    likes: "3,789",
    comments: "645",
    shares: "1,567",
    saves: "3,890",
    plays: "61.2K",
    replays: "8.9K",
    totalWatchTime: "423.1h",
    avgWatchTime: "24.8s",
    totalInteractions: "9,891",
    spokenHook:
      "Essa automação me economiza 10 horas por semana e custou R$0. Vou te mostrar como fazer igual.",
    textHook: "Essa automação me economiza 10h/semana",
    visualHook:
      "n8n workflow editor filling the screen with nodes connecting, then showing time saved counter.",
    audioHook: "Cash register sound on 'R$0', satisfying click sounds on each automation step.",
    hookFramework: "Value Proposition",
    hookStructure: "Benefit → How",
    contentStructure:
      "Hook (benefit) → Problem (manual work) → Solution (n8n setup) → Demo (live workflow) → Results → CTA",
    cta: "Segue pra mais automações. Comenta 'N8N' que eu mando o template.",
    caption:
      "Essa automação me economiza 10h por semana e custou R$0 ⚡ Vou te mostrar o passo a passo completo usando n8n... #automação #n8n #produtividade",
    source: "Instagram API",
    status: "Analyzed",
    analyzedAt: "Apr 01, 2026 08:15",
    metricsUpdatedAt: "Apr 02, 2026 10:30",
    createdAt: "Mar 31, 2026 19:00",
    videoUrl: "https://instagram.com/p/example7",
    thumbnail: "/images/ideas/thumb-07.jpg",
  },
  {
    id: "idea_08",
    title: "Why I mass-deleted 200 npm packages",
    handle: "@cleancode",
    platform: "YouTube",
    date: "Mar 18, 2026",
    country: "Germany",
    countryFlag: "🇩🇪",
    contentType: "Opinion",
    visualFormat: "Talking Head",
    topic: "JavaScript Ecosystem",
    topicSummary:
      "Developer explains the bloat problem in modern JS projects and demonstrates how removing unnecessary dependencies improved build times by 60%.",
    duration: "8:45",
    outlierScore: 5.4,
    views: "34.8K",
    reach: "28.9K",
    likes: "2,456",
    comments: "789",
    shares: "1,123",
    saves: "1,890",
    plays: "38.9K",
    replays: "5.2K",
    totalWatchTime: "345.6h",
    avgWatchTime: "5:32",
    totalInteractions: "6,258",
    spokenHook:
      "I just mass-deleted 200 npm packages from my project. My build time went from 3 minutes to 45 seconds. Here's why you should do the same.",
    textHook: "I deleted 200 npm packages",
    visualHook: "Terminal showing npm uninstall running in a loop, package count dropping dramatically.",
    audioHook: "Delete sound effects stacking up rapidly, then silence with a clean build succeeding.",
    hookFramework: "Shock Value",
    hookStructure: "Action → Result",
    contentStructure:
      "Hook (action + result) → Context (project state) → Analysis (what was unnecessary) → Process → Before/After → CTA",
    cta: "Subscribe for more JavaScript deep dives and cleanup tips.",
    caption:
      "I mass-deleted 200 npm packages and my build time dropped 60% 🗑️ Here's what was actually unnecessary... #javascript #npm #webdev",
    source: "YouTube API",
    status: "Analyzed",
    analyzedAt: "Mar 19, 2026 12:00",
    metricsUpdatedAt: "Mar 28, 2026 15:42",
    createdAt: "Mar 18, 2026 10:30",
    videoUrl: "https://youtube.com/watch?v=example8",
    thumbnail: "/images/ideas/thumb-08.jpg",
  },
  {
    id: "idea_09",
    title: "Supabase vs Firebase em 2026 — qual escolher?",
    handle: "@ogabarbosa",
    platform: "YouTube",
    date: "Apr 02, 2026",
    country: "Brazil",
    countryFlag: "🇧🇷",
    contentType: "Review",
    visualFormat: "Screen Recording",
    topic: "Backend Services",
    topicSummary:
      "Practical comparison between Supabase and Firebase covering performance, DX, pricing, and real use cases with live demo.",
    duration: "15:20",
    outlierScore: 7.1,
    views: "78.4K",
    reach: "64.2K",
    likes: "6,123",
    comments: "1,034",
    shares: "2,345",
    saves: "5,678",
    plays: "84.7K",
    replays: "11.2K",
    totalWatchTime: "1,890.2h",
    avgWatchTime: "8:42",
    totalInteractions: "15,180",
    spokenHook:
      "Eu migrei do Firebase pro Supabase e minha conta caiu 80%. Mas será que Supabase é melhor em tudo? Vamos comparar lado a lado.",
    textHook: "Migrei do Firebase pro Supabase — minha conta caiu 80%",
    visualHook:
      "Split screen showing Firebase and Supabase dashboards side by side, pricing comparison overlay.",
    audioHook: "Cash register ka-ching on the 80% savings reveal.",
    hookFramework: "Result First",
    hookStructure: "Result → Investigation",
    contentStructure:
      "Hook (result) → Context → Comparison Matrix → Live Demo (both) → Pricing → Verdict → CTA",
    cta: "Se inscreve pro canal e ativa o sino pra mais comparações técnicas.",
    caption:
      "Supabase vs Firebase em 2026 🔥 Migrei e minha conta caiu 80% — mas será que vale pra todo mundo? Comparação completa... #supabase #firebase #backend",
    source: "YouTube API",
    status: "Analyzed",
    analyzedAt: "Apr 03, 2026 09:00",
    metricsUpdatedAt: "Apr 03, 2026 12:00",
    createdAt: "Apr 02, 2026 14:00",
    videoUrl: "https://youtube.com/watch?v=example9",
    thumbnail: "/images/ideas/thumb-09.jpg",
  },
];
