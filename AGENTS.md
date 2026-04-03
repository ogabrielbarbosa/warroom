<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Rules — Warroom

## Before Writing Any Code
1. Read the relevant Next.js 16 doc in `node_modules/next/dist/docs/` for the feature you're implementing.
2. Check `CLAUDE.md` for project conventions and folder structure.
3. If adding a new route, follow the route group pattern: `(auth)`, `(app)`, or `(internal)`.

## Server vs Client Components
- **Default to Server Components.** Only add `"use client"` when you need useState, useEffect, event handlers, or browser APIs.
- **Never make a page.tsx a Client Component** unless absolutely necessary. Lift interactive parts into small child components.
- **Context providers** (`src/providers/`) are Client Components — wrap Server Component children, don't make the whole tree client-side.

## Data Fetching
- **Server Components**: Fetch data directly using DAL functions from `lib/dal/`.
- **Client Components**: Use Server Actions for mutations, or pass data down as props from Server Components.
- **Never import `server-only` modules in Client Components.**
- **`params` and `searchParams` are Promises** in Next.js 16 — always `await` them.

## Supabase
- **Server**: Use `createServerClient()` from `lib/supabase/server.ts` in Server Components, Server Actions, proxy, and Route Handlers.
- **Browser**: Use `createBrowserClient()` from `lib/supabase/client.ts` only in Client Components.
- **Auth flow**: Middleware handles session refresh and route protection. Don't duplicate auth checks in page components.
- **Database**: All queries go through `lib/dal/` with `server-only`. Never query Supabase directly in components.
- **RLS must be enabled** on every table. Run security advisors after migrations.

## Styling
- **Tailwind 4**: Config is in `globals.css` via `@theme inline`. No `tailwind.config.ts`.
- **Use design tokens** (`--primary`, `--background`, etc.) — never hardcode hex colors.
- **Use `cn()`** from `@/lib/utils` for conditional classnames.
- **Component variants**: Use `class-variance-authority` (cva) for variant patterns.

## File Conventions
- `loading.tsx` — Required in route groups for Suspense fallback.
- `error.tsx` — Required in route groups for error boundaries.
- `not-found.tsx` — At app root for global 404.
- `_components/` — Private folder for co-located components within a route.
- `actions.ts` — Server Actions file within feature folders.

## Mutations
- Use **Server Actions** (`"use server"`) for all data mutations.
- Place in `features/<name>/actions/` or co-locate as `actions.ts` next to the page.
- Always revalidate after mutations: `revalidatePath()` or `revalidateTag()`.
- Validate all input server-side — never trust client data.

## Do NOT
- Use `"use client"` on pages unless you have a very specific reason.
- Query the database from Client Components.
- Hardcode colors — use CSS variables.
- Skip `loading.tsx` / `error.tsx` in route groups.
- Use the Pages Router (`pages/` directory).
- Assume Next.js APIs work like your training data — always check the docs first.
