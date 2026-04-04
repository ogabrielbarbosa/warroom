/* ═══════════════════════════════════════════════════════════
   PIPELINE — Kanban Board Mock Data
   ═══════════════════════════════════════════════════════════ */

export type PipelineStatus =
  | "Idea"
  | "Scripted"
  | "Filming"
  | "Editing"
  | "Posted";

export interface PipelineCard {
  id: string;
  title: string;
  topic: string;
  format: string;
  hookText: string;
  date: string;
  status: PipelineStatus;
  hasReference: boolean;
  contentAngle: string;
  material: string;
  onScreenText: string;
  recordingInstructions: string;
  script: string;
  referenceVideo: {
    hook: string;
    creator: string;
    views: string;
  } | null;
}

export const STATUS_COLORS: Record<PipelineStatus, string> = {
  Idea: "#B8B9B6",
  Scripted: "#6B8AFF",
  Filming: "#0053EA",
  Editing: "#B07CFF",
  Posted: "#4ADE80",
};

export const STATUS_BG: Record<PipelineStatus, string> = {
  Idea: "bg-[#2E2E2E]",
  Scripted: "bg-[#1a2744]",
  Filming: "bg-[#291C0F]",
  Editing: "bg-[#2A1A2E]",
  Posted: "bg-[#122E1A]",
};

export const MOCK_PIPELINE_CARDS: PipelineCard[] = [
  // ── Idea ──
  {
    id: "idea-1",
    title: "AI Code Review Tool Breakdown",
    topic: "AI Tools",
    format: "Screen Share",
    hookText: "This tool just mass replaced...",
    date: "Mar 28",
    status: "Idea",
    hasReference: true,
    contentAngle:
      "Show the tool in action — live code review on a real PR, then compare output to human review",
    material:
      "GitHub Copilot review stats, CodeRabbit vs Sourcery benchmarks, developer survey data on AI adoption",
    onScreenText: "",
    recordingInstructions: "",
    script: "",
    referenceVideo: null,
  },
  {
    id: "idea-2",
    title: "Claude MCP Server Tutorial",
    topic: "Claude Code",
    format: "Talking Head",
    hookText: "You need to stop using...",
    date: "Mar 30",
    status: "Idea",
    hasReference: false,
    contentAngle:
      "Walk through building an MCP server from scratch — connect Claude to your own tools",
    material:
      "MCP spec docs, Anthropic blog posts, community server examples on GitHub",
    onScreenText: "",
    recordingInstructions: "",
    script: "",
    referenceVideo: null,
  },
  {
    id: "idea-3",
    title: "VS Code Extensions Tier List",
    topic: "Editors",
    format: "B-Roll + Words",
    hookText: "I ranked every extension...",
    date: "Apr 1",
    status: "Idea",
    hasReference: false,
    contentAngle:
      "Rank extensions by real impact on productivity, not downloads — controversial takes encouraged",
    material:
      "VS Code marketplace stats, extension install counts, personal usage data over 6 months",
    onScreenText: "",
    recordingInstructions: "",
    script: "",
    referenceVideo: null,
  },
  // ── Scripted ──
  {
    id: "script-1",
    title: "10 Terminal Commands You Need",
    topic: "Terminal",
    format: "Self",
    hookText: "I rebuilt my entire workflow...",
    date: "Mar 25",
    status: "Scripted",
    hasReference: true,
    contentAngle:
      "Practical demonstration — show each command solving a real problem, not just listing syntax",
    material:
      "ripgrep vs grep benchmarks, fd vs find comparison, zoxide usage stats from GitHub, fzf integration patterns with shell history, tldr pages community data",
    onScreenText:
      "1. ripgrep  2. fd  3. zoxide  4. fzf  5. bat  6. eza  7. delta  8. dust  9. hyperfine  10. tldr",
    recordingInstructions:
      "Record terminal on left, face cam on right. Show each command with a real use case. Keep energy high, 3-5 seconds per command demo.",
    script:
      'HOOK: "You\'re mass slower in the terminal because nobody taught you these 10 commands."\n\nOPEN: Show slow grep search, then ripgrep instant result.\n\n1. ripgrep — "grep but mass faster. rg \'pattern\' and it searches everything, respects gitignore."\n\n2. fd — "find but actually usable. fd \'query\' and you\'re done."\n\n3. zoxide — "cd but it learns. z project-name from anywhere."\n\n4. fzf — "fuzzy find everything. Pipe anything into it."\n\n5. bat — "cat but with syntax highlighting and line numbers."\n\nCLOSE: "Save this, try one today. Which command are you installing first?"',
    referenceVideo: {
      hook: '"These mass changed my terminal workflow..."',
      creator: "@techcreator",
      views: "2.1M views",
    },
  },
  {
    id: "script-2",
    title: "Building a CLI with Go",
    topic: "DevTools",
    format: "Split Screen",
    hookText: "Stop building CLIs the wrong...",
    date: "Mar 27",
    status: "Scripted",
    hasReference: false,
    contentAngle:
      "Build a real CLI tool step by step using cobra — from init to distribution",
    material:
      "Go cobra library docs, charmbracelet/bubbletea examples, CLI design best practices",
    onScreenText: "",
    recordingInstructions:
      "Split screen: code editor left, terminal right. Build incrementally, show each feature working.",
    script:
      'HOOK: "Stop building CLIs the wrong way."\n\nOPEN: Show a messy bash script, then the polished Go CLI replacement.\n\n1. cobra init — scaffold the project\n2. Add subcommands\n3. Flags and config\n4. Interactive prompts with bubbletea\n\nCLOSE: "Ship it with goreleaser. Link in bio."',
    referenceVideo: null,
  },
  // ── Filming ──
  {
    id: "film-1",
    title: "Neovim Config From Scratch",
    topic: "Neovim",
    format: "Screen Share",
    hookText: "I mass deleted my config and...",
    date: "Mar 22",
    status: "Filming",
    hasReference: false,
    contentAngle:
      "Start from zero — build a productive Neovim setup in real-time, explaining every plugin choice",
    material:
      "kickstart.nvim, lazy.nvim docs, telescope, treesitter, LSP config guides",
    onScreenText: "",
    recordingInstructions:
      "Full screen terminal. Start with empty init.lua. Add plugins one by one, showing the result after each.",
    script:
      'HOOK: "I mass deleted my config and started from scratch."\n\nStep through each plugin addition with live demos.',
    referenceVideo: null,
  },
  {
    id: "film-2",
    title: "Docker Compose Deep Dive",
    topic: "Docker",
    format: "Self",
    hookText: "Nobody explains this part...",
    date: "Mar 20",
    status: "Filming",
    hasReference: false,
    contentAngle:
      "Focus on the parts people skip — networking, volumes, health checks, and multi-stage builds",
    material:
      "Docker docs, real-world compose files from open source projects, common gotchas",
    onScreenText: "",
    recordingInstructions:
      "Talking head with screen share cutaways. Show docker-compose.yml evolving step by step.",
    script:
      'HOOK: "Nobody explains this part of Docker Compose."\n\nCover networking, volumes, depends_on vs healthcheck, multi-stage.',
    referenceVideo: null,
  },
  // ── Editing ──
  {
    id: "edit-1",
    title: "Git Worktrees Explained",
    topic: "Git",
    format: "Talking Head",
    hookText: "Why is nobody talking about...",
    date: "Mar 18",
    status: "Editing",
    hasReference: false,
    contentAngle:
      "Show the problem (stashing, branch switching pain) then reveal worktrees as the solution",
    material: "Git worktree docs, real workflow examples, benchmark data",
    onScreenText: "",
    recordingInstructions: "",
    script:
      'HOOK: "Why is nobody talking about git worktrees?"\n\nShow the pain of branch switching, then the worktree workflow.',
    referenceVideo: null,
  },
  {
    id: "edit-2",
    title: "Why I Switched to Zed",
    topic: "Editors",
    format: "B-Roll + Words",
    hookText: "I mass deleted VS Code and...",
    date: "Mar 15",
    status: "Editing",
    hasReference: false,
    contentAngle:
      "Honest comparison — what Zed does better, what it lacks, and who should switch",
    material:
      "Zed performance benchmarks, feature comparison matrix, community feedback",
    onScreenText: "",
    recordingInstructions: "",
    script:
      'HOOK: "I mass deleted VS Code and switched to Zed."\n\nCompare startup time, extensions, AI features, collaboration.',
    referenceVideo: null,
  },
  {
    id: "edit-3",
    title: "Linux on Mac M4",
    topic: "Linux",
    format: "Split Screen",
    hookText: "Apple doesn't want you to...",
    date: "Mar 12",
    status: "Editing",
    hasReference: false,
    contentAngle:
      "Step-by-step guide to running Linux on Apple Silicon — UTM, Asahi, and bare metal options",
    material:
      "Asahi Linux progress reports, UTM docs, benchmark comparisons M4 vs x86",
    onScreenText: "",
    recordingInstructions: "",
    script:
      'HOOK: "Apple doesn\'t want you to know this."\n\nShow UTM setup, then Asahi installation, then benchmark results.',
    referenceVideo: null,
  },
  // ── Posted ──
  {
    id: "post-1",
    title: "My Dev Setup 2026",
    topic: "Productivity",
    format: "B-Roll + Words",
    hookText: "Here's everything on my desk...",
    date: "Mar 5",
    status: "Posted",
    hasReference: false,
    contentAngle:
      "Tour of the full setup — hardware, software, ergonomics, and why each choice matters",
    material:
      "Product links, setup photos, before/after productivity metrics",
    onScreenText: "",
    recordingInstructions: "",
    script:
      'HOOK: "Here\'s everything on my desk and why."\n\nTour each item with reasoning behind the choice.',
    referenceVideo: null,
  },
  {
    id: "post-2",
    title: "Claude Code First Look",
    topic: "AI Tools",
    format: "Screen Share",
    hookText: "I tried the new Claude Code...",
    date: "Mar 1",
    status: "Posted",
    hasReference: false,
    contentAngle:
      "First impressions using Claude Code on a real project — speed, accuracy, and workflow integration",
    material:
      "Claude Code docs, comparison with GitHub Copilot CLI, real project demo",
    onScreenText: "",
    recordingInstructions: "",
    script:
      'HOOK: "I tried the new Claude Code and it changed everything."\n\nLive demo on a real codebase.',
    referenceVideo: null,
  },
];
