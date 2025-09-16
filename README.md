# Vostly – Local Writing Workspace

Private, single-user Next.js app for organizing and analyzing written content with a configurable, OpenAI‑compatible assistant.

## Quick Start

1) Install dependencies

```
npm install
```

2) Configure environment

Create `.env` with a SQLite path and app name (already set by default):

```
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_APP_NAME="Vostly AI Writer"
```

3) Database

The schema and initial migration SQL live in `prisma/`. We executed the SQL directly and generated the Prisma client. If you run into Prisma migrate issues on Windows, see `Dev-doc/prisma-migration-issue.md`.

Generate the client (safe to re-run):

```
npm run db:generate
```

4) Run the app

```
npm run dev
```
Open http://localhost:3000

## What’s Included (Phase 1)

- Next.js 15 + TypeScript + Tailwind CSS (App Router)
- Prisma + SQLite schema (Post, AnalysisResult, ChatMessage, AIProviderSettings)
- API routes scaffolding for posts, analysis, chat, and AI provider settings
- Basic UI: layout, dashboard, editor placeholder, settings list
- Validation with Zod
- AI client abstractions for OpenAI‑compatible and Anthropic endpoints (Phase 3 wiring later)

## Scripts

- `npm run dev` – start dev server
- `npm run build` – build production
- `npm run start` – start production server
- `npm run lint` – lint code
- `npm run db:generate` – generate Prisma client
- `npm run db:migrate` – run migrations (see note below)

## Prisma Migration Note

`npx prisma migrate deploy` may error due to a provider lock mismatch when histories were initialized manually. Until resolved:
- Use `npx prisma db execute --file prisma/migrations/0001_init/migration.sql` to apply schema
- Then `npm run db:generate`
- Details in `Dev-doc/prisma-migration-issue.md`

## Documentation

- Phase overview: `Dev-doc/phase1-foundation.md`
- Prisma issue log: `Dev-doc/prisma-migration-issue.md`

## License

MIT (add your preferred license if different)
