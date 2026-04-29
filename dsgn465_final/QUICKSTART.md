# Confidence Chasm — Quick Start Guide

## 🚀 Get Running in 30 Seconds

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**

---

## 🎮 Play the Game

1. **Start Screen** — Click "Begin →"
2. **Type framework components** to slice objections:
   - `motivations`, `direct`, `capability`, `permission`, etc.
   - Case insensitive, typos forgiven
3. **Don't let objections reach the bottom** — you only have 3 lives
4. **Reach 200 points** to unlock your reflection

---

## ✍️ What You Need to Add

### 1. More Objections
**File:** `frontend/lib/config/objections.ts` (line 309)

Add ~13 more objections. Currently has 12 seeds.

**Quick template:**
```typescript
{
  id: 'obj-013',
  text: "Your objection (4-12 words)",
  framework: '5c',  // 'liquid', '3m', or '5c'
  component: 'category',  // see frameworks.ts for valid IDs
  acceptedAnswers: ['category'],
  explanation: 'Framework: why this component wins (1 sentence).'
}
```

### 2. Reflection Answers
**File:** `frontend/lib/content/reflection.ts` (line 14)

Replace `[PLACEHOLDER]` with your answers to 6 questions:
1. Innovation context
2. Customer frameworks applied
3. 5C analysis
4. Responsible innovation tensions
5. Personal relevance
6. First organizational hack

### 3. Design Notes
**File:** `frontend/lib/content/reflection.ts` (line 68)

Add 4-6 sentences on:
- Why clean framework mappings (vs real ambiguity)
- Why soft 200-point threshold (vs strict win/lose)
- Why framework reference stays visible (open-book mastery)

---

## 🧪 Quick Test

**Basic gameplay:**
```
1. Type "motivations" → objection slices
2. Type "DIRECT" (caps) → still works
3. Type "permission" → slices "customer permission" objections
4. Let one fall → lose 1 life
5. Get 5 in a row → 🔥 combo appears
```

**Win condition:**
- Score 200 points → "Reflection Unlocked" overlay
- Choose "Read Reflection" or "Continue Playing"

**Lose condition:**
- Miss 3 objections → Game Over overlay appears
- Shows all missed objections with correct framework answers
- Choose to "Try Again", view "Reflection", or return to start

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `frontend/README.md` | Full documentation |
| `frontend/TESTING.md` | Detailed testing checklist |
| `frontend/lib/config/objections.ts` | Add objections here |
| `frontend/lib/content/reflection.ts` | Add reflection answers here |
| `frontend/lib/config/physics.ts` | Tune difficulty/speed here |

---

## 🐛 Troubleshooting

**Dev server won't start:**
```bash
rm -rf .next
npm install
npm run dev
```

**Can't type in input:**
- Click anywhere on the play area to refocus

**Objections not spawning:**
- Check browser console (F12) for errors
- Hard refresh (Cmd+Shift+R)

---

## 📖 Framework Components (Quick Reference)

**Type these to slice objections:**

**Liquid Expectations:**
- `direct`, `experiential`, `perceptual`

**3M:**
- `motivations`, `market`, `mechanics`

**5C:**
- `permission` (or `customer permission`)
- `capability`
- `conscious` (or `consciousness`)
- `category`
- `commercial`

---

## ✅ Before Final Submission

- [ ] Add ~13 more objections
- [ ] Write 6 reflection answers
- [ ] Add design notes
- [ ] Playtest and tune difficulty
- [ ] Test on laptop with keyboard

---

**Need help?** See `frontend/README.md` for full docs or `frontend/TESTING.md` for detailed testing guide.
