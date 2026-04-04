/* ═══════════════════════════════════════════════════════════
   HOOKS — Content Hooks Mock Data
   ═══════════════════════════════════════════════════════════ */

export type HookSource = "Kallaway" | "Noe";

export interface ContentHook {
  id: string;
  hookText: string;
  spokenHook: string;
  textHook: string;
  visualHook: string;
  framework: string;
  structure: string;
  source: HookSource;
  views: number;
  viewsFormatted: string;
  hookType: string;
  thumbnail: string;
  videoUrl: string;
  videoPlatform: string;
  performanceRank: number;
}

export const SOURCE_STYLES: Record<
  HookSource,
  { text: string; bg: string }
> = {
  Kallaway: { text: "text-[#0053EA]", bg: "bg-[#0F1529]" },
  Noe: { text: "text-[#B2B2FF]", bg: "bg-[#222229]" },
};

export const MOCK_HOOKS: ContentHook[] = [
  {
    id: "hook_01",
    hookText: "Você tá usando IA do jeito errado e nem sabe disso...",
    spokenHook:
      "Você tá usando IA do jeito errado e nem sabe disso. A maioria das pessoas acha que é só jogar um prompt e esperar mágica acontecer, mas a real é que sem contexto, sem estrutura, sem técnica, a IA vai te dar lixo. E o pior? Você nem percebe porque acha que aquilo é o melhor que ela pode fazer.",
    textHook: "Você tá usando IA do jeito ERRADO",
    visualHook:
      "Creator staring at screen with shocked expression, screen showing ChatGPT interface with red X overlay, split-screen comparison of bad vs good prompt results.",
    framework: "Curiosity Gap",
    structure: "Question → Reveal",
    source: "Kallaway",
    views: 120400,
    viewsFormatted: "120.4K",
    hookType: "Curiosity Gap",
    thumbnail: "/images/hooks/thumb-01.jpg",
    videoUrl: "https://instagram.com/p/example1",
    videoPlatform: "Instagram",
    performanceRank: 3,
  },
  {
    id: "hook_02",
    hookText: "A maioria dos programadores não sabe esse truque...",
    spokenHook:
      "A maioria dos programadores não sabe esse truque. E olha, não é nenhum segredo — é algo que qualquer um pode fazer, mas quase ninguém faz porque ninguém ensina. Eu descobri isso depois de anos escrevendo código e quase desistindo.",
    textHook: "O truque que NINGUÉM te ensina",
    visualHook:
      "Split screen: left side shows frustrated developer, right side shows clean code flowing. Text overlay with glitch effect.",
    framework: "Fear of Missing Out",
    structure: "Problem → Agitation → Solution",
    source: "Noe",
    views: 89200,
    viewsFormatted: "89.2K",
    hookType: "Fear of Missing Out",
    thumbnail: "/images/hooks/thumb-02.jpg",
    videoUrl: "https://instagram.com/p/example2",
    videoPlatform: "Instagram",
    performanceRank: 5,
  },
  {
    id: "hook_03",
    hookText: "Se você não fizer isso agora, vai se arrepender...",
    spokenHook:
      "Se você não fizer isso agora, vai se arrepender. Eu sei que parece exagero, mas o mercado de tech tá mudando tão rápido que quem não se adaptar nos próximos 6 meses vai ficar pra trás de um jeito que não tem volta.",
    textHook: "Você VAI se arrepender se não fizer isso",
    visualHook:
      "Creator walking towards camera urgently, countdown timer overlay, dramatic lighting with warm tones.",
    framework: "Contrarian Take",
    structure: "Bold Claim → Evidence → CTA",
    source: "Kallaway",
    views: 245100,
    viewsFormatted: "245.1K",
    hookType: "Contrarian Take",
    thumbnail: "/images/hooks/thumb-03.jpg",
    videoUrl: "https://instagram.com/p/example3",
    videoPlatform: "Instagram",
    performanceRank: 1,
  },
  {
    id: "hook_04",
    hookText: "Esse é o erro que todo iniciante comete e ninguém fala sobre...",
    spokenHook:
      "Esse é o erro que todo iniciante comete e ninguém fala sobre. Quando eu comecei, eu fazia isso todo dia e me perguntava por que meus projetos nunca ficavam bons. Até que alguém me mostrou o que eu tava fazendo de errado.",
    textHook: "O erro que TODO iniciante comete",
    visualHook:
      "Before/after code comparison, red highlights on common mistakes, creator pointing at screen with disappointed expression.",
    framework: "Common Mistake",
    structure: "Mistake → Impact → Fix",
    source: "Noe",
    views: 67800,
    viewsFormatted: "67.8K",
    hookType: "Common Mistake",
    thumbnail: "/images/hooks/thumb-04.jpg",
    videoUrl: "https://instagram.com/p/example4",
    videoPlatform: "Instagram",
    performanceRank: 8,
  },
  {
    id: "hook_05",
    hookText: "3 coisas que eu queria ter aprendido antes de começar a programar...",
    spokenHook:
      "3 coisas que eu queria ter aprendido antes de começar a programar. A primeira vai parecer óbvia, mas eu garanto que 90% das pessoas ignoram. A segunda mudou completamente como eu penso sobre código. E a terceira? Essa é a que mais dói.",
    textHook: "3 coisas que eu QUERIA ter aprendido antes",
    visualHook:
      "Three fingers counting down, each point appears as animated text overlay with icons. Clean studio background.",
    framework: "Listicle Hook",
    structure: "List Preview → Deep Dive → Payoff",
    source: "Kallaway",
    views: 312000,
    viewsFormatted: "312.0K",
    hookType: "Listicle Hook",
    thumbnail: "/images/hooks/thumb-05.jpg",
    videoUrl: "https://instagram.com/p/example5",
    videoPlatform: "Instagram",
    performanceRank: 2,
  },
  {
    id: "hook_06",
    hookText: "Eu testei todas as IAs de código e essa é a melhor disparada...",
    spokenHook:
      "Eu testei todas as IAs de código e essa é a melhor disparada. E não, não é o ChatGPT. Eu passei 3 meses testando cada uma dessas ferramentas no meu dia a dia de trabalho real, não em exemplos de tutorial.",
    textHook: "A MELHOR IA de código (testei TODAS)",
    visualHook:
      "Grid of AI tool logos being eliminated one by one, crown appearing on the winner. Dramatic reveal moment.",
    framework: "Authority Play",
    structure: "Credibility → Test → Verdict",
    source: "Noe",
    views: 54300,
    viewsFormatted: "54.3K",
    hookType: "Authority Play",
    thumbnail: "/images/hooks/thumb-06.jpg",
    videoUrl: "https://youtube.com/watch?v=example6",
    videoPlatform: "YouTube",
    performanceRank: 9,
  },
  {
    id: "hook_07",
    hookText: "Para de assistir tutorial. Faz isso aqui no lugar...",
    spokenHook:
      "Para de assistir tutorial. Faz isso aqui no lugar. Sério, fecha todos os tabs de tutorial que você tem aberto agora e me escuta. O que eu vou te falar nos próximos 60 segundos vale mais que qualquer curso de 40 horas.",
    textHook: "PARA de assistir tutorial. Faz ISSO.",
    visualHook:
      "Creator closing laptop dramatically, then opening a code editor. Fast-paced editing with typing sounds.",
    framework: "Direct Challenge",
    structure: "Challenge → Alternative → Proof",
    source: "Kallaway",
    views: 178900,
    viewsFormatted: "178.9K",
    hookType: "Direct Challenge",
    thumbnail: "/images/hooks/thumb-07.jpg",
    videoUrl: "https://instagram.com/p/example7",
    videoPlatform: "Instagram",
    performanceRank: 4,
  },
  {
    id: "hook_08",
    hookText: "Ninguém te contou isso sobre trabalhar com tecnologia...",
    spokenHook:
      "Ninguém te contou isso sobre trabalhar com tecnologia. E eu entendo por quê — porque a verdade não vende curso. Mas alguém precisa falar: a realidade de trabalhar com tech é muito diferente do que os influencers mostram.",
    textHook: "A VERDADE sobre trabalhar com tech",
    visualHook:
      "Contrasting scenes: glamorous tech life vs. reality. Dark room with multiple monitors, coffee cups, late night coding.",
    framework: "Secret Reveal",
    structure: "Secret → Reality → Lesson",
    source: "Noe",
    views: 93500,
    viewsFormatted: "93.5K",
    hookType: "Secret Reveal",
    thumbnail: "/images/hooks/thumb-08.jpg",
    videoUrl: "https://instagram.com/p/example8",
    videoPlatform: "Instagram",
    performanceRank: 6,
  },
  {
    id: "hook_09",
    hookText: "O futuro da programação não é o que você imagina...",
    spokenHook:
      "O futuro da programação não é o que você imagina. Todo mundo tá falando sobre IA substituir programadores, mas a real mudança que tá acontecendo é muito mais sutil — e muito mais impactante do que qualquer chatbot.",
    textHook: "O FUTURO da programação (não é o que pensam)",
    visualHook:
      "Futuristic overlay effects, timeline animation showing tech evolution, creator in dramatic side lighting.",
    framework: "Prediction Hook",
    structure: "Prediction → Counter-narrative → Insight",
    source: "Kallaway",
    views: 201700,
    viewsFormatted: "201.7K",
    hookType: "Prediction Hook",
    thumbnail: "/images/hooks/thumb-09.jpg",
    videoUrl: "https://instagram.com/p/example9",
    videoPlatform: "Instagram",
    performanceRank: 3,
  },
];
