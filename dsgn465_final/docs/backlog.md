# Future Enhancements Backlog

This document tracks optional features and polish items that can be implemented after the MVP is complete.

## Audio Features

### Sound Effects (via Howler.js)
**Estimated effort:** 1-2 hours
**Priority:** Medium

- [ ] Slice sound effect (satisfying "swoosh" or "slice")
- [ ] Miss sound (warning tone when quote escapes)
- [ ] Level transition sound (achievement chime)
- [ ] Game over sound
- [ ] Background music (subtle, toggleable)
- [ ] Mute/unmute button in UI

**Implementation notes:**
- Add Howler.js via `npm install howler`
- Store audio files in `public/sounds/`
- Create `lib/audio/sound-manager.ts` to handle playback
- Respect browser autoplay policies (wait for user interaction)

---

## Visual Polish

### Particle Effects on Slice
**Estimated effort:** 2 hours
**Priority:** Low

- [ ] Burst of particles when quote is sliced
- [ ] Particles follow slash color (cyan)
- [ ] Fade out over 300-500ms

**Implementation notes:**
- Simple particle system with velocity and gravity
- Render particles on canvas along with quotes
- Reuse physics engine for particle motion

### Screen Shake
**Estimated effort:** 30 minutes
**Priority:** Low

- [ ] Subtle screen shake on successful slice
- [ ] Stronger shake on miss/life lost

**Implementation notes:**
- Apply transform offset to canvas rendering
- Duration: 100-200ms
- Decay shake intensity over time

### Combo System
**Estimated effort:** 1-2 hours
**Priority:** Low

- [ ] Track consecutive slices without miss
- [ ] Display combo counter (e.g., "3x Combo!")
- [ ] Bonus points for combos (optional score multiplier)

---

## UX Improvements

### How to Play Screen
**Estimated effort:** 1 hour
**Priority:** Medium

- [ ] Tutorial overlay on first visit (use localStorage to track)
- [ ] Animated swipe gesture demonstration
- [ ] "Got it" button to dismiss
- [ ] Visual explanation of lives, scoring, levels

**Implementation notes:**
- Modal overlay with animated SVG/CSS
- Store `hasSeenTutorial` in localStorage
- Show on first `/play` visit only

### Miss Visual Feedback
**Estimated effort:** 30 minutes
**Priority:** Medium

- [ ] Red flash at edge of screen when quote is missed
- [ ] Shake the lives indicator
- [ ] Brief pause or slow-motion effect (optional)

**Implementation notes:**
- Overlay div with red border, fade animation
- CSS animation on lives component

---

## Performance & Polish

### FPS Counter (Dev Mode)
**Estimated effort:** 20 minutes
**Priority:** Low (dev tool)

- [ ] Toggle FPS counter with keyboard shortcut (e.g., F key)
- [ ] Display current FPS, min/max, average
- [ ] Show active quote count

**Implementation notes:**
- Canvas text rendering in top-left corner
- Calculate FPS from `requestAnimationFrame` delta
- Hide in production build

### Loading State
**Estimated effort:** 30 minutes
**Priority:** Low

- [ ] Loading spinner while app initializes
- [ ] Preload any assets (future: images, sounds)

---

## Gameplay Tweaks

### Difficulty Modifiers
**Estimated effort:** 1 hour
**Priority:** Low

- [ ] Optional "Hard Mode" with faster quotes and fewer lives
- [ ] Selectable difficulty on start screen

### Quote Variety
**Estimated effort:** 30 minutes per set
**Priority:** Low

- [ ] Expand quote pools from 8 to 12-15 per level
- [ ] Ensure no repeat quotes within a single playthrough

---

## Accessibility

### Text Contrast & Sizing
**Estimated effort:** 1 hour
**Priority:** Low

- [ ] Ensure WCAG AA contrast ratios
- [ ] Font size options (small/medium/large)

### Keyboard Controls
**Estimated effort:** 2 hours
**Priority:** Low (iPad/touch-focused game)

- [ ] Mouse-only mode is already supported
- [ ] Optional: Keyboard shortcuts (arrow keys to "slice"?)

---

## Content Management

### Admin Panel for Quote Editing
**Estimated effort:** 3-4 hours
**Priority:** Very Low (overkill for class project)

- [ ] In-app editor for `levels.ts` quotes
- [ ] Visual physics tuner (sliders for gravity, speed, etc.)
- [ ] Export updated config as JSON

**Note:** For this project, direct file editing is sufficient.

---

## Deployment & Sharing

### Open Graph Meta Tags
**Estimated effort:** 15 minutes
**Priority:** Low

- [ ] Add OG image for link previews
- [ ] OG title, description for social sharing

### PWA Support
**Estimated effort:** 1 hour
**Priority:** Low

- [ ] Add service worker for offline play
- [ ] Add to home screen prompt on iPad
- [ ] App icon and splash screen

---

## Future Phases (Post-Class)

### Analytics
- [ ] Track completion rate, average score, drop-off points
- [ ] Heatmap of where quotes are most often missed

### Backend & Leaderboard
- [ ] Persistent high scores (requires backend)
- [ ] Compare scores with classmates

### Alternative Game Modes
- [ ] "Zen Mode" (no lives, focus on practice)
- [ ] "Sprint Mode" (timed challenge)

---

## Notes

- All items above are **optional** and **not required** for the MVP or course submission
- Prioritize based on available time after Phase 12 (deployment)
- Test on actual iPad before adding any features - core gameplay must feel great first
