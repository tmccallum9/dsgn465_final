# Confidence Chasm — Typing Game

A typing-based reflection game demonstrating mastery of three Growth Innovation frameworks by diagnosing innovation objections under time pressure.

**Course:** Growth Innovation Design — MMM, Northwestern
**Stack:** Next.js 16.2.4 (App Router), React 19, TypeScript, Tailwind CSS 4
**Target:** Desktop/laptop with physical keyboard

---

## 🎮 Game Concept

The **Confidence Chasm** (Cotton/Shah/Bullock) is the gap between "we have an idea" and "the organization commits to it." Innovators cross the chasm by countering objections with the right framework.

**Gameplay:**
- Objections descend from the top of the screen
- Type the framework component that defeats each objection
- Misses cost organizational confidence (lives)
- Reach 200 points (20 sliced objections) to unlock your reflection

**Frameworks (11 components total):**
1. **Liquid Expectations** — Direct, Experiential, Perceptual
2. **3M Framework** — Motivations, Market, Mechanics
3. **5C Framework** — Customer Permission, Capability, Consciousness, Category, Commercial

---

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## 🧪 How to Test the Game

### 1. Start Screen (/)
- Should display game title, concept explanation, and framework reference
- Click **"Begin"** to start playing

### 2. Play Screen (/play)
**Test the core loop:**
1. Objections appear at the top and descend slowly
2. Type a framework component in the input field (e.g., "motivations", "direct", "capability")
3. Press Enter or wait for auto-submit on exact match
4. **Correct answer** → Objection vanishes, +10 points, combo builds
5. **Wrong answer** → Input clears, no penalty (try again)
6. **Miss (reaches bottom)** → Lose 1 life, combo resets

**Test difficulty scaling:**
- **0-50 points:** 1 objection at a time (slow descent, ~12 seconds)
- **50-150 points:** Up to 2 concurrent objections (medium speed, ~9 seconds)
- **150+ points:** Up to 3 concurrent objections (fast, ~7 seconds)

**Test combo multiplier:**
- Get 5 correct answers in a row without missing
- Next slice should score **+20 points** instead of +10
- Look for 🔥 flame icon in HUD showing streak count

**Test win condition (200 points):**
- Game pauses, "Reflection Unlocked" overlay appears
- Two choices: **"Read Reflection"** (→ /results?earned=true) or **"Continue Playing"**
- Should only appear once per session

**Test lose condition (0 lives):**
- Let 3 objections fall to the bottom
- Game over overlay appears showing:
  - All missed objections with their correct framework answers
  - Explanations for why each framework component wins
  - Final score
  - Options to "Try Again", "View Reflection", or go "Back to Start"

**Input matching to verify:**
- Case insensitive: `MOTIVATIONS` = `motivations`
- Typo tolerant: `EXPERENTIAL` = `EXPERIENTIAL` (Levenshtein distance ≤ 1)
- Shorthand accepted: `PERMISSION` = `CUSTOMER PERMISSION`, `CONSCIOUS` = `CONSCIOUSNESS`

### 3. Results Screen (/results)
**Test earned path:**
- Visit `/results?earned=true`
- Should show: "You crossed the chasm."

**Test lost path:**
- Visit `/results?earned=false`
- Should show: "The innovation didn't make it — but here's what mastering the chasm looks like."

**Check content:**
- 6 reflection questions should display (currently placeholders)
- Design notes section at bottom
- "Back to Start" and "Play Again" buttons work

---

## ✍️ Content Authoring (TODO)

### 1. Add More Objections
**File:** `lib/config/objections.ts`

Currently has **12 seed objections**. Add ~13 more for better coverage.

**Guidelines:**
- Voice of skeptical executive in a meeting (short, blunt, realistic)
- Generic but recognizable (any MMM-target company could face)
- Clean mapping: one framework clearly wins, one component clearly right
- Aim for roughly even distribution across all 11 components

**Example format:**
```typescript
{
  id: 'obj-013',
  text: "Your pithy objection here (4-12 words)",
  framework: '5c',
  component: 'category',
  acceptedAnswers: ['category'],
  explanation: 'Category: one sentence explaining why this framework component wins.'
}
```

### 2. Write Reflection Content
**File:** `lib/content/reflection.ts`

Replace `[PLACEHOLDER]` text with your actual reflection answers:

**Six required questions:**
1. Innovation context — organization, innovation, chasm relevance
2. Customer relevance frameworks (Liquid Expectations, 3M) applied
3. 5C analysis for your organizational context
4. Responsible innovation tensions — what to watch for
5. Personal relevance — why this innovation, why now for you
6. First organizational hack to start crossing the chasm

**Design notes:**
- Write after implementation is complete
- Address: (1) Why clean framework mappings vs real-world ambiguity, (2) Why soft 200-point threshold, (3) Why framework reference stays visible

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout, fonts (DM Serif Display, JetBrains Mono)
│   ├── page.tsx                # Start screen (/)
│   ├── play/
│   │   └── page.tsx            # Game screen (/play) - main typing game logic
│   ├── results/
│   │   └── page.tsx            # Results/reflection screen (/results)
│   └── globals.css             # Theme tokens, Northwestern purple brand
│
├── lib/
│   ├── config/
│   │   ├── frameworks.ts       # 3 frameworks, 11 components, accepted answers
│   │   ├── objections.ts       # 12 seed objections (add ~13 more)
│   │   └── physics.ts          # Difficulty curve, spawn rates, tuning constants
│   │
│   ├── content/
│   │   └── reflection.ts       # 6 reflection answers (PLACEHOLDER - author these)
│   │
│   ├── game/
│   │   ├── matcher.ts          # Input matching logic (Levenshtein, case-insensitive)
│   │   └── state.ts            # Game state types and helpers
│   │
│   └── components/
│       ├── HUD.tsx             # Score, lives, combo display
│       ├── FrameworkPanel.tsx  # Left sidebar framework reference
│       ├── InputBar.tsx        # Bottom typing input + live preview
│       ├── PlayField.tsx       # Descending objections area
│       └── UnlockOverlay.tsx   # "Reflection Unlocked" modal at 200 points
│
└── docs/
    └── rfc2.md                 # Full game specification
```

---

## ⚙️ Tuning & Configuration

All tuning constants are in **`lib/config/physics.ts`** for easy iteration:

**Lives & Scoring:**
```typescript
INITIAL_LIVES: 3
POINTS_PER_SLICE: 10
REFLECTION_UNLOCK_SCORE: 200
COMBO_THRESHOLD: 5              // 5 correct in a row
COMBO_MULTIPLIER: 2             // 2x points (so +20)
```

**Difficulty Scaling:**
```typescript
EASY (0-50 points):
  - 1 concurrent objection
  - 12 seconds descent time

MEDIUM (50-150 points):
  - 2 concurrent objections
  - 9 seconds descent time

HARD (150+ points):
  - 3 concurrent objections
  - 7 seconds descent time
```

**Spawn Timing:**
```typescript
SPAWN_DELAY_MS: {
  EASY: 3000,    // 3 seconds between spawns
  MEDIUM: 2500,
  HARD: 2000
}
```

Adjust these values based on playtesting!

---

## 🎨 Design System

**Northwestern MMM Brand Colors:**
- Primary purple: `#4E2A84`
- Secondary purple: `#836EAA`
- Background: `#0F0A1A` (deep purple-black)
- Accent (slice/success): `#00D9FF` (cyan)
- Warning (miss): `#E74C3C` (red)

**Typography:**
- **Objections:** DM Serif Display (weighty, consequential)
- **HUD/Input:** JetBrains Mono (technical, precise)
- **Results page:** Switches to light serif for reading

**Visual Moments:**
- Objections spawn at top with fade-in (200ms)
- Slice effect: objection vanishes (TODO: add slash animation)
- Miss: red flash + camera shake (TODO: add in polish phase)
- Combo: 🔥 flame icon pulses on activation
- Game Over: Overlay showing all missed objections with correct answers (educational feedback)

---

## 🔧 Technical Notes

### Next.js 16.2.4 Breaking Changes
- `searchParams` is now a **Promise** (must `await` in server components)
- Used correctly in `/results` page

### Performance Optimizations
- **Hot values** (active objections, animation frame data) → `useRef`
- **UI values** (score, lives, combo) → `useState`
- Objections render as absolutely-positioned divs (DOM, not canvas)
- Max 3 concurrent objections keeps render count low

### Input Matching
- Case-insensitive: `motivations` = `MOTIVATIONS`
- Whitespace-trimmed
- Levenshtein distance ≤ 1: `EXPERENTIAL` matches `EXPERIENTIAL`
- Shorthand: `PERMISSION` matches `CUSTOMER PERMISSION`
- Auto-submit on exact match (no Enter needed)

### No Persistent State
- Each session is fresh (no localStorage, no leaderboards per spec)
- This is intentional — focus on mastery demonstration, not high scores

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Connect GitHub repo to Vercel
# Vercel auto-detects Next.js and deploys
```

### Manual Build
```bash
npm run build
npm start
```

Build outputs to `.next/` directory.

---

## 📖 Framework Reference (Quick Lookup)

### Liquid Expectations
- **DIRECT** — products/services directly competing
- **EXPERIENTIAL** — experiences replacing the need
- **PERCEPTUAL** — companies shaping expectations across categories

### 3M Framework
- **MOTIVATIONS** — what drives the change?
- **MARKET** — who/what competes?
- **MECHANICS** — how does the offering work?

### 5C Framework
- **CUSTOMER PERMISSION** (also: PERMISSION) — do they want us to do this?
- **CAPABILITY** — what do we uniquely have to win?
- **CONSCIOUSNESS** (also: CONSCIOUS) — should we do this?
- **CATEGORY** — why now?
- **COMMERCIAL** — is the prize meaningful?

---

## 🐛 Troubleshooting

**Dev server won't start:**
```bash
rm -rf .next
npm install
npm run dev
```

**Fonts not loading:**
- Check `app/layout.tsx` — DM Serif Display and JetBrains Mono should load from Google Fonts
- Verify `globals.css` has `--font-serif` and `--font-mono` variables

**Objections not spawning:**
- Check browser console for errors
- Verify `lib/config/objections.ts` has valid objection data
- Try hard refresh (Cmd+Shift+R)

**Input not matching:**
- Check accepted answers in `lib/config/frameworks.ts`
- Verify component IDs match between `frameworks.ts` and `objections.ts`
- Console log the matcher output in `lib/game/matcher.ts`

**TypeScript errors:**
- Run `npm run build` to see full error list
- Most common: missing imports or type mismatches
- Check `tsconfig.json` paths are correct (`@/*` maps to `./`)

---

## 📝 To-Do Before Final Submission

- [ ] Author ~13 more objections in `lib/config/objections.ts`
- [ ] Write 6 reflection answers in `lib/content/reflection.ts`
- [ ] Add design notes to reflection (post-implementation meta-reflection)
- [ ] Playtest and tune difficulty constants in `lib/config/physics.ts`
- [ ] Optional: Add slice animation, miss feedback effects (polish phase)
- [ ] Test on laptop (target device) — desktop browser, physical keyboard
- [ ] Verify all 11 framework components have objections and work correctly

---

**Built with:** Next.js 16.2.4 • React 19 • TypeScript • Tailwind CSS 4
**For:** Growth Innovation Design, Northwestern MMM
