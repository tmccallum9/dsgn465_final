# Confidence Chasm — Typing Game Spec (v2)

**Course:** Growth Innovation Design — MMM, Northwestern
**Author:** Tyler McCallum
**Deliverable type:** Interactive web-based reflection artifact
**Stack:** Next.js 16.2.4 (App Router), React 19, TypeScript, Tailwind CSS 4, Vercel
**Target device:** Laptop (desktop browser, physical keyboard)

---

## ⚠️ Important note for Claude Code

This project uses Next.js 16.2.4, which has breaking changes from earlier versions. **Before writing any route handlers, layout files, or client/server component code, read the relevant guide in `node_modules/next/dist/docs/`.** Heed deprecation notices. Do not rely on training-data assumptions about Next.js conventions.

---

## 1. Concept

**Confidence Chasm** is a typing-based reflection game that demonstrates mastery of three Growth Innovation frameworks by making the player diagnose innovation objections under time pressure.

The metaphor: the **Confidence Chasm** (Cotton/Shah/Bullock) is the gap between "we have an idea" and "the organization commits to it." Innovators cross the chasm by countering objections with the right framework. In the game, objections descend down the screen — the player types the specific framework component that defeats each one. Misses cost organizational confidence. Run out of confidence and the innovation dies.

Every word the player slices is worth 10 points. At 200 points, the player has demonstrated enough mastery to "earn" the reflection — the Results page unlocks as a celebration, not a consolation. The player can keep playing for higher scores or exit to read the reflection.

---

## 2. Pedagogical positioning

This deliverable addresses the four course themes:

| Theme | How the game addresses it |
|---|---|
| **Customer Relevance (Why/What)** | Liquid Expectations and 3M frameworks are playable; their components are the answer space |
| **Organizational Relevance (Why Us / How Do We)** | 5C framework is playable; the Confidence Chasm metaphor structures the game itself |
| **Organizational Innovation Hacking** | The game *is* a confidence-hacking exercise — practicing the rapid recall a real innovator needs in a meeting |
| **Conscious / Values Relevance** | Addressed primarily in Results page reflection (Question 4 territory) — see §10 |

The six required reflection questions are answered on the Results page in prose. The game itself is the *evidence* that the player has internalized the frameworks well enough to apply them; the reflection is the *application* to internship aspirations.

---

## 3. Three routes

```
/              Start screen   — concept intro, framework reference, "Begin" button
/play          Game screen    — typing gameplay
/results       Results screen — score breakdown + six reflection answers
```

The player can reach `/results` two ways:
1. **Lose:** game over (3 misses) → auto-route to `/results`
2. **Earn:** reach 200 points → "Reflection Unlocked" overlay appears with two CTAs: *Continue Playing* or *Read Reflection*

In both cases, `/results` shows the same content. The framing differs slightly based on whether the player earned it (`?earned=true` query param) or lost out (`?earned=false`).

---

## 4. The three frameworks (the answer space)

These are the **only** valid answers. The framework reference panel shows them at all times during play.

### Liquid Expectations (Class 1)
*Understanding true competition*
- **DIRECT** — products/services that directly compete with yours
- **EXPERIENTIAL** — experiences that replace the need for existing products/services
- **PERCEPTUAL** — companies that shape customer expectations across categories

### 3M Framework (Class 1, recapped Class 2)
*Evaluating desirability and the right unmet need*
- **MOTIVATIONS** — what drives the change? (evergreen vs emerging, structural vs cyclical)
- **MARKET** — who/what does this compete against? (direct, experiential, perceptual lenses applied to your offering)
- **MECHANICS** — how does the offering work? (full product vs feature, bundling, standalone value)

### 5C Framework (Class 2)
*Understanding innovation advantage — permission, prize, advantage*
- **CUSTOMER PERMISSION** *(also accepts: PERMISSION)* — do customers want us to do this? Will they trust us?
- **CAPABILITY** — what do we uniquely have to win? Existing assets, strategic fit
- **CONSCIOUSNESS** *(also accepts: CONSCIOUS)* — should we do this? Social, ethical, brand alignment
- **CATEGORY** — why now? Market trends, behavior shifts, technology context
- **COMMERCIAL** — is the prize meaningful? Market size, growth, long-term value

**Total answer space: 11 unique components.** All are accepted at any point in the game; there is no level-gating.

> **Note for Tyler:** 5C technically has a sixth C — "Confidence" — but it's the meta-frame, not a diagnostic component. Excluded from the answer space. Mention this in your reflection as evidence you understand the framework deeply.

---

## 5. Game mechanics

### Core loop

1. Objections (1–6 word phrases) descend from the top of the screen at varied speeds and horizontal positions.
2. The player types the framework component that defeats each objection.
3. On submit (Enter key, or auto-match):
   - **Correct** → objection vanishes with a "slice" effect, +10 points, brief flash of the explanation, optional combo multiplier.
   - **Incorrect** → input clears, objection continues falling, no penalty (encourages rapid retry).
4. If an objection reaches the bottom of the screen → **−1 life**, objection vanishes, brief shake/red flash.
5. **3 misses → game over → route to /results.**
6. **200 points → "Reflection Unlocked" overlay → player chooses to continue or exit.**

### Score

- **+10 points per sliced objection**
- **Combo multiplier:** 5 correct in a row without a miss or wrong answer = next slice scores 2× (so +20). Streak resets on any miss or wrong answer. Combo state shown as a small flame icon next to the score with the streak count.

### Lives

- **3 lives** at start, displayed top-right as 3 filled icons (suggested: small purple circles or chevrons in MMM brand color)
- Lives are not regained — once lost, they stay lost
- **Game over** shows a brief "Innovation didn't make it" overlay (1.5s) before routing to `/results?earned=false`

### Soft threshold

- At exactly **200 points** (20th sliced objection), pause game and show **Reflection Unlocked** overlay
- Two buttons: `Continue Playing` (resume game, no further unlock notifications) and `Read Reflection` (route to `/results?earned=true`)
- This unlock happens **once per session** — a player who continues past 200 won't see it again, even if they hit 300, 400, etc.

### Difficulty curve (continuous, no levels)

Spawn rate and descent speed scale gently with score:
- **0–50 points:** 1 objection on screen at a time, slow descent (~12 seconds top-to-bottom)
- **50–150 points:** Up to 2 concurrent objections, medium descent (~9 seconds)
- **150+ points:** Up to 3 concurrent objections, faster descent (~7 seconds)

These are tuning targets — adjust during playtesting. Define them as constants in `lib/config/physics.ts` so they're easy to iterate.

---

## 6. Input handling

### Single text input field, always focused

- Fixed at the bottom-center of the play area, prominent (slightly larger than typical input)
- Auto-focused on game start; if focus is lost, click anywhere on play area refocuses it
- Placeholder text: *"Type the framework component..."*
- The current typed string is also rendered larger above the input as the player types — this creates a "stage presence" feel and is a standard typing-game convention

### Matching rules

The parser is forgiving but not loose:

1. **Case-insensitive** (`motivations` = `MOTIVATIONS` = `Motivations`)
2. **Whitespace-trimmed** (leading/trailing spaces ignored)
3. **Levenshtein distance ≤ 1** from any canonical or accepted-shorthand form (handles single-character typos like `EXPERENTIAL` for `EXPERIENTIAL`)
4. **Multi-word answers accept their shorthand:** `PERMISSION` matches `CUSTOMER PERMISSION`; `CONSCIOUS` matches `CONSCIOUSNESS`

### When to evaluate

Two trigger conditions for evaluation:

- **Player presses Enter** → check current input against all on-screen objections, slice the topmost one (smallest y-position) whose answer matches
- **Auto-match on exact equality** → if the player types a complete valid answer (after whitespace trim, case-insensitive, exact), evaluate immediately without needing Enter. This makes correct answers feel instantaneous.

If multiple on-screen objections have the same answer, slice the one closest to the bottom (most urgent threat).

If no on-screen objection matches the typed input on Enter → input clears, no points, no penalty.

---

## 7. Visual design

### Brand constraints

- **Northwestern MMM brand colors:**
  - Primary deep purple: `#4E2A84` (Northwestern purple)
  - Secondary lighter purple: `#836EAA`
  - Accent (slice / success / score): cyan or electric — suggest `#00D9FF` for tonal contrast
  - Warning / miss: red `#E74C3C`
  - Background: very dark — suggest `#0F0A1A` or `#1A0F2E` (deep purple-black, not pure black)
  - Text: warm off-white `#F5F0E6` for body, white for emphasis

### Typography

The game has two typographic moments that matter:

1. **The descending objections** — should feel weighty and consequential. Use a strong serif or slab-serif (suggest **Fraunces** or **DM Serif Display** from Google Fonts). 18–24px. Each objection in a subtle "card" with a faint glow/shadow.
2. **The HUD and input** — should feel technical and precise. Use a monospace or geometric sans (suggest **JetBrains Mono** or **Space Mono**). Score in a large, fixed-width display.

The Results page should switch register entirely — see §10.

### Layout (play screen)

```
┌────────────────────────────────────────────────────────────┐
│  SCORE: 0150        🔥 x3          ❤️ ❤️ ❤️                │  ← HUD (top, sticky)
├──────────────┬─────────────────────────────────────────────┤
│              │                                             │
│ FRAMEWORKS   │              "Our compliance team           │  ← descending objection
│              │               will never approve this"      │
│ Liquid Exp.  │                                             │
│ • Direct     │                                             │
│ • Experien.. │                  "Field force won't sell    │  ← second objection
│ • Perceptual │                   something this technical" │
│              │                                             │
│ 3M           │                                             │
│ • Motivations│                                             │
│ • Market     │                                             │
│ • Mechanics  │                                             │
│              │                                             │
│ 5C           │                                             │
│ • Customer.. │                                             │
│ • Capability │                                             │
│ • Conscious..│                                             │
│ • Category   │                  ┌─────────────────────┐    │
│ • Commercial │  what you typed: │ CAPAB              ▏ │    │  ← input
│              │                  └─────────────────────┘    │
└──────────────┴─────────────────────────────────────────────┘
```

The framework reference panel is **always visible** during play. This is intentional — it signals open-book mastery and lets professors playing for 90 seconds see the answer space immediately.

### Motion

- **Objection spawn:** fade in over 200ms while starting descent
- **Slice:** sharp horizontal "cut" effect — a thin cyan line slashes through the objection, the objection splits into two halves that fall and fade over 400ms
- **Score increment:** number tick animation, brief cyan glow on score
- **Combo multiplier hit:** brief scale-up + flame icon pulse
- **Miss (objection reaches bottom):** screen edge red flash (200ms), short camera shake (subtle, 4–6px translate, 200ms), heart icon shatters
- **Game over:** desaturate the screen, "Innovation didn't make it" text fades in, 1.5s pause, route

Do not over-animate. The typing flow needs to stay focused. Animations are punctuation, not paragraphs.

---

## 8. File structure

```
frontend/
├── app/
│   ├── layout.tsx              Root layout, font loading, global styles
│   ├── page.tsx                / — start screen
│   ├── play/
│   │   └── page.tsx            /play — game screen (client component)
│   ├── results/
│   │   └── page.tsx            /results — reflection page
│   └── globals.css             Theme tokens, base styles, font setup
│
├── lib/
│   ├── config/
│   │   ├── frameworks.ts       The 3 frameworks + components, with descriptions
│   │   ├── objections.ts       The full set of objections (academic content)
│   │   └── physics.ts          Spawn rate, descent speed, difficulty curve constants
│   │
│   ├── content/
│   │   └── reflection.ts       Six reflection answers (Tyler authors)
│   │
│   ├── game/
│   │   ├── matcher.ts          Input → objection matching logic (Levenshtein, case, etc.)
│   │   └── state.ts            Game state types and helpers
│   │
│   └── components/
│       ├── HUD.tsx             Score, lives, combo
│       ├── FrameworkPanel.tsx  Sticky reference panel (left side)
│       ├── PlayField.tsx       The descending-objections area
│       ├── InputBar.tsx        The typing input + live preview
│       └── UnlockOverlay.tsx   "Reflection Unlocked" modal
│
└── public/                     Static assets (favicon, OG image)
```

Two small architectural notes:

- **Game state in `useRef` + a render trigger, not `useState` for hot values.** Score and lives can use `useState`. Active objections, input string, and frame timing should live in refs to avoid re-rendering the whole tree on every animation frame. A single `setTick` or `requestAnimationFrame` schedules redraws.
- **DOM rendering recommended over canvas.** With max 3 concurrent objections, DOM (CSS transforms, absolute positioning) is simpler and the typography looks crisper. Each objection is an absolutely-positioned div with a CSS transform updated each frame.

---

## 9. Objection authoring

### Format

```ts
// lib/config/objections.ts
export type Framework = 'liquid' | '3m' | '5c';

export type ObjectionComponent =
  | 'direct' | 'experiential' | 'perceptual'                       // Liquid
  | 'motivations' | 'market' | 'mechanics'                         // 3M
  | 'customer-permission' | 'capability' | 'consciousness'         // 5C
  | 'category' | 'commercial';                                     // 5C

export interface Objection {
  id: string;
  text: string;                    // Short, voice-of-skeptic phrasing, 4–12 words
  framework: Framework;
  component: ObjectionComponent;
  acceptedAnswers: string[];       // Lowercased canonical + shorthand forms
  explanation: string;             // 1-sentence "why this framework wins" — flashes on slice
}

export const OBJECTIONS: Objection[] = [
  // ...see authoring guidelines below
];
```

### Authoring guidelines

Tyler authors ~25 objections. Guidelines:

1. **Voice:** speak as a skeptical executive in a meeting. Short, blunt, organizationally realistic.
2. **Generic but recognizable:** since these are generic per Tyler's call, write them in a way that almost any MMM-internship-target company could face. Avoid company-specific names.
3. **The "clean mapping" test:** every objection must pass these three checks:
   - One framework is obviously the right lens
   - One component within that framework is obviously the right answer
   - A reasonable MMM student would not first reach for a different framework
4. **Distribution target:** roughly even across the 11 components. Not exact, but no component should have fewer than 1 or more than 4 objections.

### Starter set (seed objections — Tyler refines)

Below are 12 starter objections to get the file going. Tyler authors the remaining ~13.

```ts
{
  id: 'obj-001',
  text: "Nobody's actually asking us for this",
  framework: '3m',
  component: 'motivations',
  acceptedAnswers: ['motivations'],
  explanation: 'Motivations: is this an evergreen need being underserved, or an emerging one driven by structural change?'
},
{
  id: 'obj-002',
  text: "The market is shrinking 8% a year",
  framework: '3m',
  component: 'market',
  acceptedAnswers: ['market'],
  explanation: 'Market: evaluate the market for change — direct, experiential, and perceptual competitive pressures.'
},
{
  id: 'obj-003',
  text: "This is just a feature, not a product",
  framework: '3m',
  component: 'mechanics',
  acceptedAnswers: ['mechanics'],
  explanation: 'Mechanics: rethink the offering — full product vs feature, standalone value, bundling.'
},
{
  id: 'obj-004',
  text: "Apple has trained users to expect zero-friction onboarding",
  framework: 'liquid',
  component: 'perceptual',
  acceptedAnswers: ['perceptual'],
  explanation: 'Perceptual: companies outside your category are shaping what customers expect from any moment that matters.'
},
{
  id: 'obj-005',
  text: "Customers are using YouTube tutorials instead of buying our service",
  framework: 'liquid',
  component: 'experiential',
  acceptedAnswers: ['experiential'],
  explanation: 'Experiential: an alternative experience is replacing the need your offering used to fulfill.'
},
{
  id: 'obj-006',
  text: "Three competitors launched the same thing last quarter",
  framework: 'liquid',
  component: 'direct',
  acceptedAnswers: ['direct'],
  explanation: 'Direct: are we differentiated — valuable and visible — versus the competitors playing the same game?'
},
{
  id: 'obj-007',
  text: "Our customers don't trust us with their health data",
  framework: '5c',
  component: 'customer-permission',
  acceptedAnswers: ['customer permission', 'permission'],
  explanation: 'Customer Permission: do they want us to do this? Do we have the right to play in this space with this audience?'
},
{
  id: 'obj-008',
  text: "Our field force has never sold a subscription product",
  framework: '5c',
  component: 'capability',
  acceptedAnswers: ['capability'],
  explanation: 'Capability: what do we uniquely have to win? Do existing assets accelerate or block us?'
},
{
  id: 'obj-009',
  text: "This profits off vulnerable users",
  framework: '5c',
  component: 'consciousness',
  acceptedAnswers: ['consciousness', 'conscious'],
  explanation: 'Consciousness: should we do this? Social, ethical, and brand-promise alignment matter.'
},
{
  id: 'obj-010',
  text: "Regulation in this space is changing every six months",
  framework: '5c',
  component: 'category',
  acceptedAnswers: ['category'],
  explanation: 'Category: why now? Are market and regulatory trends a tailwind or a headwind?'
},
{
  id: 'obj-011',
  text: "Even at full scale this is a $20M business",
  framework: '5c',
  component: 'commercial',
  acceptedAnswers: ['commercial'],
  explanation: 'Commercial: is the prize meaningful? Size, growth, and long-term value of the play.'
},
{
  id: 'obj-012',
  text: "Gen Z fundamentally interacts with brands differently now",
  framework: '3m',
  component: 'motivations',
  acceptedAnswers: ['motivations'],
  explanation: 'Motivations: a structural shift in customer behavior is a different kind of opportunity than a cyclical one.'
}
```

---

## 10. Results page (`/results`)

### Two framings, one content

The Results page accepts a `?earned=true|false` query param:

- **`earned=true`** (player hit 200): heading reads *"You crossed the chasm."* Subheading congratulates the score.
- **`earned=false`** (player lost): heading reads *"The innovation didn't make it — but here's what mastering the chasm looks like."* Subheading shows the score reached.

In both cases, the rest of the page is identical.

### Page structure

1. **Header** — framing line + final score + framework breakdown stat (e.g., *"You sliced 8 Liquid Expectations objections, 7 from 3M, 8 from 5C"*) — pulled from session state held in localStorage or a simple URL param.

2. **Six reflection answers** — from `lib/content/reflection.ts`. Tyler authors these. The six required questions are:
   - Q1: What is your innovation context — what's the organization, what's the innovation, why is the chasm relevant?
   - Q2: How do customer relevance frameworks (Liquid Expectations, 3M) apply to your innovation hypothesis?
   - Q3: How does the 5C analysis read for your specific organizational context?
   - Q4: Where would responsible innovation tensions arise — what should you watch for?
   - Q5: What's your personal relevance — why this innovation, why this organization, why now for you?
   - Q6: What's the first hack you would deploy to start crossing the chasm at this organization, and why?

   *(These question phrasings are placeholders — Tyler should swap to the exact course wording.)*

3. **Author's note on game design choices** — a short paragraph (4–6 sentences) where Tyler names the design decisions:
   - Why filtering objections to clean framework mappings (and what's lost: real-world ambiguity)
   - Why the soft 200-point threshold instead of strict win/lose
   - Why the framework reference panel stays visible (open-book mastery)

   This paragraph is part of the academic substance — it shows meta-reflection on the artifact itself.

### Visual register shift

The Results page should feel **deliberately different** from the game — quieter, more editorial. Move from dark game UI to a light, reading-focused layout. Serif body type, generous line-height, comfortable measure (~65 characters wide). The contrast reinforces "you've earned the right to a thoughtful read."

### Reflection content file

```ts
// lib/content/reflection.ts
export const REFLECTION = {
  questions: [
    {
      id: 'q1',
      prompt: 'Your innovation context: organization, innovation, chasm relevance',
      answer: `[TYLER AUTHORS]`
    },
    // ... q2 through q6
  ],
  designNotes: `[TYLER AUTHORS — meta-reflection on game design choices]`
};
```

---

## 11. Build order (for Claude Code)

Suggested sequence to keep the build verifiable at each step:

1. **Read `node_modules/next/dist/docs/`** for App Router conventions in this Next.js version
2. Set up `app/layout.tsx`, `globals.css` with theme tokens, font loading
3. Build `/` start screen — static, no game logic yet
4. Build `lib/config/frameworks.ts` and `lib/config/objections.ts` (with the 12 seed objections)
5. Build `lib/game/matcher.ts` with unit-testable matching logic (Levenshtein, case, shorthand)
6. Build `lib/game/state.ts` — game state shape and reducer
7. Build `app/play/page.tsx` skeleton — HUD, FrameworkPanel, InputBar, empty PlayField
8. Wire input → state → match → score → lives, with no descending objections yet (just type and submit, see score change)
9. Add spawn scheduling in `app/play/page.tsx` — single objection, fixed position, no descent yet
10. Add descent (CSS transform, requestAnimationFrame loop)
11. Add multiple concurrent objections + difficulty curve
12. Add UnlockOverlay at 200 points
13. Add game-over flow → route to `/results?earned=false`
14. Build `/results` page with reflection content (placeholder text first, real content later)
15. Polish: animations, slice effect, combo multiplier, miss feedback
16. Playtest, tune `lib/config/physics.ts`

---

## 12. What is explicitly out of scope

- **Audio / sound effects** — nice to have, not required. Add only if everything else is polished.
- **Persistent state** — no leaderboards, no localStorage of scores. Each session is fresh.
- **Mobile / iPad** — desktop only. Render a simple "Please play on a laptop" message at viewport widths < 1024px.
- **Multiplayer** — single-player.
- **Accessibility beyond keyboard** — the game is keyboard-first by design. The Results page should be fully accessible (semantic HTML, sufficient contrast, screen-reader-friendly). The game screen is acknowledged as visual-and-typing-dependent.

---

## 13. Open questions for Tyler

Before final implementation:

1. **Combo multiplier:** keep it (recommended) or strip it for simplicity?
2. **Difficulty curve numbers** in §5 are guesses — adjust during playtesting.
3. **Six reflection question phrasings** — swap to exact course wording from the syllabus.
4. **Author's design notes** on Results page — write after the build is done so they reference real implementation choices.

---

**End of spec.**
