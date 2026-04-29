# Confidence Chasm

A typing-based reflection game for Northwestern MMM Growth Innovation Design. Players diagnose descending innovation objections by typing the matching framework component, then unlock a reflection page at 200 points.

## Project Structure

```text
dsgn465_final/
├── frontend/              # Next.js app
│   ├── app/               # Routes: /, /play, /results
│   ├── lib/components/    # Game UI components
│   ├── lib/config/        # Framework, objection, and physics config
│   ├── lib/content/       # Reflection content
│   └── lib/game/          # Matching and game state helpers
├── docs/
│   ├── rfc2.md            # Current technical spec
│   └── backlog.md         # Future enhancements
└── QUICKSTART.md          # Editing and playtest guide
```

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Key Files

- `frontend/lib/config/frameworks.ts` - playable framework components and accepted answers
- `frontend/lib/config/objections.ts` - objection prompts and their correct framework component
- `frontend/lib/config/physics.ts` - difficulty, spawn timing, lives, and unlock score
- `frontend/lib/content/reflection.ts` - reflection page prose
- `frontend/app/play/page.tsx` - main game loop and scoring behavior

## Checks

```bash
cd frontend
npm run lint
npm run build
```

## Documentation

- `QUICKSTART.md` - fast editing guide
- `frontend/README.md` - detailed gameplay and implementation notes
- `frontend/TESTING.md` - manual test checklist
- `docs/rfc2.md` - current technical specification
- `docs/backlog.md` - deferred features
