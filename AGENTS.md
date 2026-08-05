# AGENTS

This repository uses an AI agent workflow. Agents must use Next.js v16 documentation when performing upgrades or running automated codemods.

Required references (version-matched):

- Next.js documentation (v16): https://nextjs.org/docs (use v16 pages)
- Next.js upgrade guide (v16): https://nextjs.org/docs/upgrading (follow v16-specific upgrade notes)
- Recommended codemod (v16): npx @next/codemod@16 upgrade

Agent instructions:

1. Always use the Next.js v16 docs as the source of truth for migrations. If a local guide is present under docs/app/guides/upgrading/version-16 use that first.
2. Run the official codemod before making manual changes where possible: `npx @next/codemod@16 upgrade <paths...>`
3. After codemod and dependency changes, run the package manager install (pnpm in this repo) and the standard checks: `pnpm install` -> `pnpm -w build` or `pnpm -w dev` as appropriate.
4. If the repository is a monorepo, update workspace package versions consistently and prefer the monorepo's package manager (pnpm).

If this file is outdated, follow the project's internal upgrade docs: /docs/app/guides/upgrading/version-16 and update this file with canonical links and codemod commands.
