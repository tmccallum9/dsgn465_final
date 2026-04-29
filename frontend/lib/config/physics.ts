// RFC2 §5: Difficulty curve and game physics constants
// These are tuning targets — adjust during playtesting

export const GAME_CONFIG = {
  // Lives and scoring
  INITIAL_LIVES: 3,
  POINTS_PER_SLICE: 10,
  REFLECTION_UNLOCK_SCORE: 200, // 20th sliced objection

  // Combo multiplier (RFC2 §5)
  COMBO_THRESHOLD: 5,           // 5 correct in a row
  COMBO_MULTIPLIER: 2,          // Next slice scores 2x (so +20 instead of +10)

  // Difficulty thresholds (score-based)
  DIFFICULTY: {
    EASY: {
      scoreRange: [0, 50],
      maxConcurrentObjections: 1,
      descentDuration: 12,        // seconds from top to bottom
    },
    MEDIUM: {
      scoreRange: [50, 150],
      maxConcurrentObjections: 2,
      descentDuration: 9,         // seconds
    },
    HARD: {
      scoreRange: [150, Infinity],
      maxConcurrentObjections: 3,
      descentDuration: 7,         // seconds
    },
  },

  // Spawn timing
  SPAWN_DELAY_MS: {
    EASY: 3000,    // 3 seconds between spawns
    MEDIUM: 2500,  // 2.5 seconds
    HARD: 2000,    // 2 seconds
  },

  // Visual constants
  PLAYFIELD_HEIGHT: 600,         // pixels (approximate, will be dynamic based on viewport)
  OBJECTION_SPAWN_Y: 0,          // spawn at top
  OBJECTION_DEATH_Y_RATIO: 0.95, // objection "misses" at 95% down the screen

  // Animation durations (milliseconds)
  ANIMATION: {
    OBJECTION_FADE_IN: 200,
    SLICE_EFFECT: 400,
    SCORE_GLOW: 300,
    COMBO_PULSE: 400,
    MISS_FLASH: 200,
    MISS_SHAKE: 200,
    GAME_OVER_PAUSE: 1500,
  },
};

// Helper function to get current difficulty based on score
export function getDifficulty(score: number) {
  const { EASY, MEDIUM, HARD } = GAME_CONFIG.DIFFICULTY;

  if (score < EASY.scoreRange[1]) return EASY;
  if (score < MEDIUM.scoreRange[1]) return MEDIUM;
  return HARD;
}

// Helper function to get spawn delay based on score
export function getSpawnDelay(score: number): number {
  const { EASY, MEDIUM } = GAME_CONFIG.DIFFICULTY;

  if (score < EASY.scoreRange[1]) return GAME_CONFIG.SPAWN_DELAY_MS.EASY;
  if (score < MEDIUM.scoreRange[1]) return GAME_CONFIG.SPAWN_DELAY_MS.MEDIUM;
  return GAME_CONFIG.SPAWN_DELAY_MS.HARD;
}
