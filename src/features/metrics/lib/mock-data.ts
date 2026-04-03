/* ═══════════════════════════════════════════════════════════
   METRICS — Content Performance Mock Data
   ═══════════════════════════════════════════════════════════ */

export interface ContentVideo {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  views: number;
  viewsFormatted: string;
  likes: number;
  likesFormatted: string;
  comments: number;
  commentsFormatted: string;
  saves: number;
  savesFormatted: string;
  watchTimeAvg: string;
  outlierScore: number;
  isOutlier: boolean;
  topic: string;
  contentType: string;
  visualFormat: string;
  duration: string;
  hook: string;
  caption: string;
  totalWatchTime: string;
}

export const MOCK_VIDEOS: ContentVideo[] = [
  {
    id: "vid_01",
    title: "Voce ta usando IA do jeito errado e nem sabe disso...",
    thumbnail: "/images/metrics/thumb-01.jpg",
    date: "Mar 28",
    views: 245100,
    viewsFormatted: "245.1K",
    likes: 12800,
    likesFormatted: "12.8K",
    comments: 6200,
    commentsFormatted: "6.2K",
    saves: 4100,
    savesFormatted: "4.1K",
    watchTimeAvg: "0:45 avg",
    outlierScore: 8.4,
    isOutlier: true,
    topic: "AI & Coding",
    contentType: "Short-form",
    visualFormat: "Talking Head",
    duration: "0:58",
    hook: "Voce ta usando IA do jeito errado e nem sabe disso...",
    caption:
      "Se voce ta aprendendo a programar e ainda nao usa IA do jeito certo, esse video e pra voce...",
    totalWatchTime: "18.4K min",
  },
  {
    id: "vid_02",
    title: "3 coisas que eu queria ter aprendido antes de comecar...",
    thumbnail: "/images/metrics/thumb-02.jpg",
    date: "Mar 25",
    views: 312000,
    viewsFormatted: "312.0K",
    likes: 15300,
    likesFormatted: "15.3K",
    comments: 8100,
    commentsFormatted: "8.1K",
    saves: 5700,
    savesFormatted: "5.7K",
    watchTimeAvg: "0:42 avg",
    outlierScore: 9.1,
    isOutlier: true,
    topic: "Career & Growth",
    contentType: "Short-form",
    visualFormat: "List Format",
    duration: "1:02",
    hook: "3 coisas que eu queria ter aprendido antes de comecar a programar...",
    caption:
      "Quando eu comecei, ninguem me contou essas 3 coisas. Teria economizado meses de frustacao...",
    totalWatchTime: "22.1K min",
  },
  {
    id: "vid_03",
    title: "O futuro da programacao nao e o que voce imagina...",
    thumbnail: "/images/metrics/thumb-03.jpg",
    date: "Mar 22",
    views: 201700,
    viewsFormatted: "201.7K",
    likes: 10100,
    likesFormatted: "10.1K",
    comments: 5400,
    commentsFormatted: "5.4K",
    saves: 3800,
    savesFormatted: "3.8K",
    watchTimeAvg: "0:41 avg",
    outlierScore: 5.2,
    isOutlier: false,
    topic: "Tech Trends",
    contentType: "Short-form",
    visualFormat: "Talking Head",
    duration: "0:47",
    hook: "O futuro da programacao nao e o que voce imagina...",
    caption:
      "Todo mundo fala de IA substituindo programadores, mas a mudanca real e muito mais sutil...",
    totalWatchTime: "14.2K min",
  },
  {
    id: "vid_04",
    title: "Para de assistir tutorial. Faz isso aqui no lugar...",
    thumbnail: "/images/metrics/thumb-04.jpg",
    date: "Mar 19",
    views: 178900,
    viewsFormatted: "178.9K",
    likes: 8900,
    likesFormatted: "8.9K",
    comments: 4700,
    commentsFormatted: "4.7K",
    saves: 3200,
    savesFormatted: "3.2K",
    watchTimeAvg: "0:38 avg",
    outlierScore: 7.2,
    isOutlier: true,
    topic: "Productivity",
    contentType: "Short-form",
    visualFormat: "Direct Camera",
    duration: "0:52",
    hook: "Para de assistir tutorial. Faz isso aqui no lugar...",
    caption:
      "Fecha todos os tabs de tutorial e me escuta. O que vou falar vale mais que qualquer curso...",
    totalWatchTime: "11.8K min",
  },
  {
    id: "vid_05",
    title: "Se voce nao fizer isso agora, vai se arrepender...",
    thumbnail: "/images/metrics/thumb-05.jpg",
    date: "Mar 15",
    views: 124300,
    viewsFormatted: "124.3K",
    likes: 6400,
    likesFormatted: "6.4K",
    comments: 3300,
    commentsFormatted: "3.3K",
    saves: 2900,
    savesFormatted: "2.9K",
    watchTimeAvg: "0:36 avg",
    outlierScore: 4.8,
    isOutlier: false,
    topic: "AI & Coding",
    contentType: "Short-form",
    visualFormat: "Talking Head",
    duration: "0:44",
    hook: "Se voce nao fizer isso agora, vai se arrepender...",
    caption:
      "O mercado de tech ta mudando rapido. Quem nao se adaptar nos proximos 6 meses vai ficar pra tras...",
    totalWatchTime: "8.9K min",
  },
  {
    id: "vid_06",
    title: "Eu testei todas as IAs de codigo e essa e a melhor...",
    thumbnail: "/images/metrics/thumb-06.jpg",
    date: "Mar 12",
    views: 120400,
    viewsFormatted: "120.4K",
    likes: 5900,
    likesFormatted: "5.9K",
    comments: 3100,
    commentsFormatted: "3.1K",
    saves: 2500,
    savesFormatted: "2.5K",
    watchTimeAvg: "0:33 avg",
    outlierScore: 3.9,
    isOutlier: false,
    topic: "AI Tools",
    contentType: "Short-form",
    visualFormat: "Screen Recording",
    duration: "1:15",
    hook: "Eu testei todas as IAs de codigo e essa e a melhor disparada...",
    caption:
      "3 meses testando cada ferramenta no dia a dia de trabalho real, nao em exemplos de tutorial...",
    totalWatchTime: "7.6K min",
  },
  {
    id: "vid_07",
    title: "Ninguem te contou isso sobre trabalhar com tecnologia...",
    thumbnail: "/images/metrics/thumb-07.jpg",
    date: "Mar 8",
    views: 93500,
    viewsFormatted: "93.5K",
    likes: 4800,
    likesFormatted: "4.8K",
    comments: 2600,
    commentsFormatted: "2.6K",
    saves: 2100,
    savesFormatted: "2.1K",
    watchTimeAvg: "0:35",
    outlierScore: 4.1,
    isOutlier: false,
    topic: "Career & Growth",
    contentType: "Short-form",
    visualFormat: "Talking Head",
    duration: "0:49",
    hook: "Ninguem te contou isso sobre trabalhar com tecnologia...",
    caption:
      "A verdade nao vende curso. Mas alguem precisa falar: a realidade de trabalhar com tech e diferente...",
    totalWatchTime: "6.2K min",
  },
  {
    id: "vid_08",
    title: "Esse e o erro que todo iniciante comete e ninguem fala...",
    thumbnail: "/images/metrics/thumb-08.jpg",
    date: "Mar 5",
    views: 89200,
    viewsFormatted: "89.2K",
    likes: 4200,
    likesFormatted: "4.2K",
    comments: 2300,
    commentsFormatted: "2.3K",
    saves: 1800,
    savesFormatted: "1.8K",
    watchTimeAvg: "0:31",
    outlierScore: 3.5,
    isOutlier: false,
    topic: "Coding Tips",
    contentType: "Short-form",
    visualFormat: "Screen Recording",
    duration: "0:55",
    hook: "Esse e o erro que todo iniciante comete e ninguem fala sobre...",
    caption:
      "Quando eu comecei, fazia isso todo dia e me perguntava por que meus projetos nunca ficavam bons...",
    totalWatchTime: "5.1K min",
  },
];
