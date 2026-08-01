# Repository Guidelines

## Project Structure & Module Organization

Routes and layouts live in `app/`; route-specific components stay beside their page, such as `app/photos/components/photo-gallery.tsx`. Shared components belong in `components/`, with reusable primitives in `components/ui/`. Site constants and structured-data helpers live in `lib/`. Static files, Markdown mirrors, favicons, and the CV are in `public/`. Photography source files, generated WebP files, metadata, and helper scripts live under `scripts/`; follow `scripts/README.md` for the gallery workflow.

Use the `@/` alias for imports from the repository root.

## Build, Test, and Development Commands

- `pnpm install` installs the pinned dependencies.
- `pnpm dev` starts the local site at `http://localhost:3000`.
- `pnpm exec tsc --noEmit` performs the required strict TypeScript check.
- `pnpm build` creates and validates the production build.
- `cd scripts && ./convert-img-to-webp.sh` converts new gallery inputs.

The declared `pnpm lint` script is currently incompatible with Next.js 16; do not treat it as a passing verification step until the ESLint command is repaired.

## Coding Style & Naming Conventions

Use TypeScript/TSX, two-space indentation, double quotes, semicolons, and trailing commas where the surrounding code does. React components use PascalCase; files use lowercase kebab-case (`mobile-menu-panel.tsx`). Prefer server components unless browser state or effects require `"use client"`. Follow existing Tailwind ordering and responsive breakpoints. Use semantic HTML, descriptive labels, `text-balance` for headings, `text-pretty` for short prose, and at least 40px interactive hit areas. Avoid `transition-all`; name the transitioned properties.

## Testing Guidelines

No automated test framework or coverage target is configured. Before submitting, run the TypeScript check and production build. Manually verify affected routes and interactions at mobile, tablet, and desktop widths. For gallery changes, test thumbnail layout, lightbox navigation, captions, keyboard controls, and console errors on `/photos`. If tests are introduced, colocate them as `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines

Recent commits use concise, imperative summaries such as `Update dependencies...`, `Refactor...`, and occasionally `feat:`. Keep commits focused and explain user-visible impact. Pull requests should include a short problem/solution summary, verification commands, linked issues when applicable, and before/after screenshots for visual changes. Call out new assets, metadata updates, redirects, or external-service dependencies explicitly.

## Security & Configuration

Do not commit secrets or ImageKit credentials. Keep external URLs centralized in `lib/config.ts`, preserve `noopener noreferrer` on new-tab links, and review `next.config.ts` when adding redirects or allowed development origins.
