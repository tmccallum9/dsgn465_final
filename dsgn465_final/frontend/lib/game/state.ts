// RFC2 §8: Game state types and management
// Uses refs for hot values (active objections, animation frame data)
// Uses useState for UI values (score, lives, combo)

import { Objection } from '../config/objections';

export interface ActiveObjection {
  id: string;                    // unique instance ID (not objection.id - can have duplicates)
  objection: Objection;          // the objection data
  x: number;                     // horizontal position (0-100 as percentage)
  y: number;                     // vertical position (0-100 as percentage, 0=top, 100=bottom)
  startTime: number;             // timestamp when spawned (milliseconds)
  descentDuration: number;       // how long it takes to descend (milliseconds)
}

export interface GameState {
  // UI state (managed by useState)
  score: number;
  lives: number;
  comboStreak: number;           // consecutive correct answers without miss
  comboActive: boolean;          // true if streak >= COMBO_THRESHOLD
  reflectionUnlocked: boolean;   // true once player hits 200 points
  gameOver: boolean;
  isPaused: boolean;

  // Hot state (managed by useRef)
  activeObjections: ActiveObjection[];
  lastSpawnTime: number;         // timestamp of last spawn
  currentInput: string;          // what player is currently typing
}

export const INITIAL_GAME_STATE: Omit<GameState, 'activeObjections' | 'lastSpawnTime' | 'currentInput'> = {
  score: 0,
  lives: 3,
  comboStreak: 0,
  comboActive: false,
  reflectionUnlocked: false,
  gameOver: false,
  isPaused: false,
};

// Game actions/events
export type GameAction =
  | { type: 'SLICE_OBJECTION'; objectionId: string; wasCombo: boolean }
  | { type: 'MISS_OBJECTION' }
  | { type: 'WRONG_ANSWER' }
  | { type: 'UNLOCK_REFLECTION' }
  | { type: 'GAME_OVER' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' };

// Helper to generate unique objection instance IDs
let objectionInstanceCounter = 0;
export function generateObjectionId(): string {
  return `obj-instance-${Date.now()}-${objectionInstanceCounter++}`;
}

// Calculate objection progress (0 = just spawned, 1 = at bottom)
export function getObjectionProgress(objection: ActiveObjection, now: number): number {
  const elapsed = now - objection.startTime;
  const progress = elapsed / objection.descentDuration;
  return Math.min(progress, 1);
}

// Check if objection has reached the bottom (missed)
export function hasObjectionMissed(objection: ActiveObjection, now: number, deathRatio = 0.95): boolean {
  const progress = getObjectionProgress(objection, now);
  return progress >= deathRatio;
}
