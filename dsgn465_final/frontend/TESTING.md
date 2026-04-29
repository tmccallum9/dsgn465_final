# Testing Checklist for Confidence Chasm

Quick step-by-step testing guide to verify all game mechanics work correctly.

## Setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

---

## ✅ Test 1: Start Screen

**What to check:**
- [ ] Title "Confidence Chasm" displays prominently
- [ ] Concept explanation is readable
- [ ] Framework reference panel shows all 3 frameworks (11 components total)
- [ ] "Begin →" button is visible and styled correctly
- [ ] Footer shows "Growth Innovation Design • Northwestern MMM"

**Action:** Click "Begin →"

---

## ✅ Test 2: Game Loads Correctly

**What to check:**
- [ ] HUD displays at top: SCORE 0000, LIVES (3 purple circles)
- [ ] Framework reference panel visible on left side
- [ ] Input field at bottom is auto-focused
- [ ] Placeholder text: "Type the framework component..."
- [ ] First objection spawns within 3 seconds at top of screen

---

## ✅ Test 3: Basic Typing Mechanics

**Test correct answer:**
1. Wait for an objection to appear (e.g., "Nobody's actually asking us for this")
2. Type `motivations` (lowercase)
3. Press Enter

**Expected:**
- [ ] Objection disappears
- [ ] Score increases to 0010
- [ ] Input field clears
- [ ] No lives lost

**Test wrong answer:**
1. Wait for next objection
2. Type `zzzzz`
3. Press Enter

**Expected:**
- [ ] Input clears
- [ ] Objection continues falling
- [ ] No score change
- [ ] No lives lost

---

## ✅ Test 4: Case Insensitivity & Typo Tolerance

**Test uppercase:**
1. Type `MOTIVATIONS` (all caps)
2. Press Enter

**Expected:**
- [ ] Works correctly, objection sliced

**Test typo (single character error):**
1. Type `EXPERENTIAL` (missing one 'I')
2. Press Enter

**Expected:**
- [ ] Still works! Levenshtein distance ≤ 1 is forgiving

**Test shorthand:**
1. Type `PERMISSION` (not "CUSTOMER PERMISSION")
2. Press Enter

**Expected:**
- [ ] Works for Customer Permission objections

---

## ✅ Test 5: Auto-Submit

**Test:**
1. Type `direct` (exactly, lowercase)
2. DO NOT press Enter — wait

**Expected:**
- [ ] Objection slices automatically when you finish typing
- [ ] No Enter key needed for exact matches

---

## ✅ Test 6: Miss Mechanic (Lives)

**Test:**
1. Let an objection fall all the way to the bottom (don't type anything)
2. Wait for it to reach ~95% down the screen

**Expected:**
- [ ] Objection vanishes when it reaches bottom
- [ ] Lives decrease from 3 → 2 (one circle becomes empty)
- [ ] If you had a combo, it resets to 0

---

## ✅ Test 7: Difficulty Scaling

**Easy (0-50 points):**
- [ ] Only 1 objection on screen at a time
- [ ] Descent is slow (~12 seconds)
- [ ] 3 seconds between spawns

**Medium (50-150 points):**
Get score above 50 by slicing 5+ objections

- [ ] Up to 2 objections on screen
- [ ] Descent is faster (~9 seconds)
- [ ] 2.5 seconds between spawns

**Hard (150+ points):**
Get score above 150

- [ ] Up to 3 objections on screen
- [ ] Descent is fastest (~7 seconds)
- [ ] 2 seconds between spawns

---

## ✅ Test 8: Combo Multiplier

**Test 5x streak:**
1. Slice 5 objections in a row WITHOUT missing any
2. On the 5th correct answer

**Expected:**
- [ ] 🔥 flame icon appears in HUD
- [ ] Shows "5x" next to flame
- [ ] Next slice scores +20 points instead of +10
- [ ] Combo persists as long as you keep hitting (6x, 7x, etc.)

**Test combo reset:**
1. While combo is active, let one objection fall to bottom

**Expected:**
- [ ] Combo resets to 0
- [ ] Flame icon disappears
- [ ] Back to +10 per slice

---

## ✅ Test 9: Win Condition (200 Points)

**Test:**
1. Slice 20 objections (or 10 with combo active)
2. When score reaches exactly 200

**Expected:**
- [ ] Game pauses
- [ ] "Reflection Unlocked" overlay appears
- [ ] Shows score: "200 points — You crossed the chasm"
- [ ] Two buttons: "Read Reflection →" and "Continue Playing"

**Test "Read Reflection":**
- [ ] Routes to `/results?earned=true`
- [ ] Shows "You crossed the chasm." header

**Test "Continue Playing":**
- [ ] Overlay closes
- [ ] Game resumes
- [ ] Can keep playing for higher scores
- [ ] Overlay does NOT appear again (one-time unlock)

---

## ✅ Test 10: Lose Condition (0 Lives)

**Test:**
1. Start a fresh game
2. Let 3 objections fall to the bottom (lose all lives)

**Expected:**
- [ ] After 3rd miss, game over overlay appears
- [ ] Shows "The Innovation Didn't Make It" with broken heart icon
- [ ] Displays all 3 missed objections with their correct answers
- [ ] Shows explanation for each missed objection
- [ ] Final score is displayed
- [ ] Three buttons: "Try Again →", "View Reflection", "← Back to Start"

**Test the overlay content:**
- [ ] Each missed objection shows the objection text
- [ ] Each shows the correct framework component answer
- [ ] Each shows the explanation of why that framework wins
- [ ] All information is clearly readable and properly formatted

**Test navigation from overlay:**
- [ ] "Try Again →" button routes to `/play` (fresh game)
- [ ] "View Reflection" button routes to `/results?earned=false`
- [ ] "← Back to Start" button routes to `/`

---

## ✅ Test 11: Results Page

**Test earned path:**
Visit `/results?earned=true`

- [ ] Header: "You crossed the chasm."
- [ ] Shows 6 reflection questions (currently placeholders)
- [ ] Shows design notes section
- [ ] "Back to Start" button works
- [ ] "Play Again →" button works

**Test lost path:**
Visit `/results?earned=false`

- [ ] Header: "The innovation didn't make it — but here's what mastering the chasm looks like."
- [ ] Same content below (6 questions, design notes)
- [ ] Navigation buttons work

---

## ✅ Test 12: All Framework Components

**Verify each component works:**

| Component | Test Answer | Expected Objection (example) |
|-----------|-------------|------------------------------|
| direct | `direct` | "Three competitors launched..." |
| experiential | `experiential` | "Customers are using YouTube..." |
| perceptual | `perceptual` | "Apple has trained users..." |
| motivations | `motivations` | "Nobody's actually asking..." |
| market | `market` | "The market is shrinking..." |
| mechanics | `mechanics` | "This is just a feature..." |
| customer-permission | `permission` | "Our customers don't trust us..." |
| capability | `capability` | "Our field force has never..." |
| consciousness | `conscious` | "This profits off vulnerable..." |
| category | `category` | "Regulation in this space..." |
| commercial | `commercial` | "Even at full scale this is..." |

**Check:**
- [ ] All 11 components have at least one objection
- [ ] All answers are recognized and slice correctly
- [ ] Shorthand works (`permission`, `conscious`)

---

## ✅ Test 13: Responsive Behavior

**Desktop (target device):**
- [ ] All elements visible and properly positioned
- [ ] Framework panel doesn't overlap playfield
- [ ] Input bar is accessible and centered

**Small screen (< 1024px):**
Per spec, mobile is out of scope, but check:
- [ ] Game is still playable or shows graceful message

---

## ✅ Test 14: Navigation Flow

**Test full user journey:**
1. Start at `/`
2. Click "Begin" → `/play`
3. Play until 200 points
4. Click "Read Reflection" → `/results?earned=true`
5. Click "Play Again" → `/play`
6. Lose all 3 lives → auto `/results?earned=false`
7. Click "Back to Start" → `/`

**Check:**
- [ ] All routes load correctly
- [ ] No broken links
- [ ] Back/forward browser buttons work

---

## 🐛 Common Issues to Check

**Objections not appearing:**
- Open browser console (F12)
- Look for errors in `objections.ts`, `physics.ts`, or the spawn loop in `app/play/page.tsx`

**Input not working:**
- Check if input field is focused (should auto-focus)
- Click anywhere on play area to refocus
- Check console for matcher errors

**Score not updating:**
- Verify component IDs in `objections.ts` match `frameworks.ts`
- Check that `findMatchingComponent()` returns correct ID

**Lives not decreasing:**
- Check `OBJECTION_DEATH_Y_RATIO` in `physics.ts` (default 0.95)
- Verify miss detection logic in `/play/page.tsx`

---

## ✅ Performance Check

**Smooth gameplay:**
- [ ] Objections descend smoothly (no stuttering)
- [ ] Input is responsive (no lag)
- [ ] Animations are crisp (fade-in, transitions)
- [ ] Frame rate feels consistent (~60fps)

**Check browser DevTools:**
- Open Performance tab
- Record 30 seconds of gameplay
- Verify no major jank or dropped frames

---

## 📝 Notes for Tuning

After testing, note any adjustments needed:

**Difficulty feels too easy/hard:**
→ Edit `lib/config/physics.ts` descent durations

**Not enough time to read objections:**
→ Increase `descentDuration` values

**Too many/few objections:**
→ Adjust `SPAWN_DELAY_MS` values

**Combo threshold too low/high:**
→ Change `COMBO_THRESHOLD` (default: 5)

**Score threshold too low/high:**
→ Adjust `REFLECTION_UNLOCK_SCORE` (default: 200 = 20 slices)

---

**Testing complete!** ✅

If all tests pass, the game is ready for content authoring (objections + reflection).
