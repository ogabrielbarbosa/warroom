# Warroom — Command Center

## Stack
- **Framework**: Next.js 16.2 (App Router)
- **UI**: React 19, TypeScript 5
- **Styling**: Tailwind CSS 4 with CSS custom properties (`@theme inline` in globals.css)
- **Components**: shadcn v4 (base-nova style) + @base-ui/react (headless)
- **Icons**: lucide-react
- **Backend**: Supabase (Auth + Database + Edge Functions)
- **Fonts**: Geist (sans) + JetBrains Mono (mono)

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, providers)
│   ├── globals.css             # Tailwind 4 + design tokens (light/dark)
│   ├── not-found.tsx           # Global 404
│   ├── (auth)/                 # Public routes (no auth required)
│   │   └── login/
│   │       └── page.tsx
│   ├── (app)/                  # Authenticated routes
│   │   ├── layout.tsx          # Sidebar + auth guard
│   │   ├── loading.tsx         # Suspense fallback
│   │   ├── error.tsx           # Error boundary
│   │   ├── page.tsx            # Dashboard (Server Component)
│   │   ├── missions/
│   │   ├── settings/
│   │   └── ...
│   └── (internal)/             # Dev-only routes
│       └── design-system/
│           └── page.tsx
├── components/
│   └── ui/                     # Reusable UI primitives (shadcn)
├── features/
│   └── <feature>/
│       ├── components/         # Feature-scoped UI
│       ├── actions/            # Server Actions
│       └── lib/                # Feature-specific logic
├── lib/
│   ├── utils.ts                # cn() helper (clsx + tailwind-merge)
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   └── server.ts           # Server Supabase client
│   └── dal/                    # Data Access Layer (server-only)
├── providers/                  # Client context providers
└── proxy.ts                    # Auth guard + route protection (Next.js 16 proxy)
```

## Conventions

### Next.js 16 Rules
- **Pages are Server Components by default.** Only add `"use client"` to small interactive components.
- **`params` and `searchParams` are Promises** — always `await` them.
- **Use `loading.tsx`** for Suspense fallbacks, **`error.tsx`** for error boundaries.
- **Route groups**: `(auth)` for public, `(app)` for authenticated, `(internal)` for dev tools.
- **Private folders**: Prefix with `_` for co-located components (e.g., `_components/`).
- **Server Actions**: Use `"use server"` for mutations. Place in `features/<name>/actions/`.
- **Data Access Layer**: All DB queries go through `lib/dal/` with `server-only` protection.
- **Read `node_modules/next/dist/docs/`** before using any Next.js API you're unsure about.

### Styling
- **Tailwind 4**: No `tailwind.config.ts`. Config lives in `globals.css` via `@theme inline`.
- **Design tokens**: Use CSS variables (`--background`, `--primary`, etc.) — never hardcode colors.
- **Dark mode**: Default. Toggle via `.dark` class on `<html>`.
- **`cn()` helper**: Always use `cn()` from `@/lib/utils` for conditional classnames.

### Components
- **UI primitives** in `src/components/ui/` — generic, reusable, no business logic.
- **Feature components** in `src/features/<name>/components/` — feature-specific UI.
- **Barrel exports**: `src/components/ui/index.ts` re-exports all UI components.
- **shadcn CLI**: `npx shadcn@latest add <component>` to add new components.

### Supabase
- **Auth**: Use Supabase Auth with proxy for session management.
- **Database**: Access via DAL layer (`lib/dal/`), never query directly in components.
- **Server client**: Use `createServerClient()` in Server Components and Server Actions.
- **Browser client**: Use `createBrowserClient()` only in Client Components when needed.
- **RLS**: Always enable Row Level Security on tables.

### Code Quality
- **TypeScript strict mode** is on — no `any`, no implicit types.
- **ESLint 9** with `eslint-config-next`.
- **Path alias**: `@/` maps to `src/`.

@AGENTS.md
