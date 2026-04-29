'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import HUD from '@/lib/components/HUD';
import FrameworkPanel from '@/lib/components/FrameworkPanel';
import InputBar from '@/lib/components/InputBar';
import PlayField from '@/lib/components/PlayField';
import UnlockOverlay from '@/lib/components/UnlockOverlay';
import GameOverOverlay from '@/lib/components/GameOverOverlay';
import { OBJECTIONS, Objection } from '@/lib/config/objections';
import { GAME_CONFIG, getDifficulty, getSpawnDelay } from '@/lib/config/physics';
import { findMatchingComponent, isExactMatch } from '@/lib/game/matcher';
import {
  ActiveObjection,
  generateObjectionId,
  hasObjectionMissed
} from '@/lib/game/state';

export default function PlayPage() {
  const router = useRouter();

  // UI state
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(GAME_CONFIG.INITIAL_LIVES);
  const [comboStreak, setComboStreak] = useState(0);
  const [comboActive, setComboActive] = useState(false);
  const [reflectionUnlocked, setReflectionUnlocked] = useState(false);
  const [showUnlockOverlay, setShowUnlockOverlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [missedObjections, setMissedObjections] = useState<Objection[]>([]);
  const [activeObjections, setActiveObjections] = useState<ActiveObjection[]>([]);

  // Hot state (refs for performance)
  const activeObjectionsRef = useRef<ActiveObjection[]>([]);
  const lastSpawnTimeRef = useRef<number | null>(null);

  const syncActiveObjections = useCallback(() => {
    setActiveObjections([...activeObjectionsRef.current]);
  }, []);

  useEffect(() => {
    lastSpawnTimeRef.current = Date.now();
  }, []);

  // Spawn a new random objection
  const spawnObjection = useCallback(() => {
    const difficulty = getDifficulty(score);

    // Don't spawn if we're at max concurrent objections for current difficulty
    if (activeObjectionsRef.current.length >= difficulty.maxConcurrentObjections) {
      return;
    }

    // Pick a random objection
    const randomObjection = OBJECTIONS[Math.floor(Math.random() * OBJECTIONS.length)];

    // Random horizontal position (20-80% to keep away from edges)
    const randomX = 20 + Math.random() * 60;

    const newObjection: ActiveObjection = {
      id: generateObjectionId(),
      objection: randomObjection,
      x: randomX,
      y: 0,
      startTime: Date.now(),
      descentDuration: difficulty.descentDuration * 1000, // convert seconds to ms
    };

    activeObjectionsRef.current.push(newObjection);
    lastSpawnTimeRef.current = Date.now();
    syncActiveObjections();
  }, [score, syncActiveObjections]);

  // Check for missed objections and spawn new ones
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const now = Date.now();
      let livesLost = 0;
      const newlyMissed: Objection[] = [];

      // Check for missed objections
      const previousCount = activeObjectionsRef.current.length;
      activeObjectionsRef.current = activeObjectionsRef.current.filter((obj) => {
        if (hasObjectionMissed(obj, now, GAME_CONFIG.OBJECTION_DEATH_Y_RATIO)) {
          livesLost++;
          newlyMissed.push(obj.objection); // Track the missed objection
          return false; // Remove from array
        }
        return true;
      });
      const removedMisses = activeObjectionsRef.current.length !== previousCount;

      // Handle missed objections
      if (livesLost > 0) {
        // Add newly missed objections to the list
        setMissedObjections((prev) => [...prev, ...newlyMissed]);

        setLives((prev) => {
          const newLives = Math.max(0, prev - livesLost);
          if (newLives === 0) {
            setGameOver(true);
            // Don't auto-route - show GameOverOverlay instead
          }
          return newLives;
        });

        // Reset combo on miss
        setComboStreak(0);
        setComboActive(false);
      }

      // Spawn new objections based on difficulty
      const spawnDelay = getSpawnDelay(score);
      const lastSpawnTime = lastSpawnTimeRef.current ?? now;
      if (now - lastSpawnTime >= spawnDelay) {
        spawnObjection();
      } else if (removedMisses) {
        syncActiveObjections();
      }
    }, 50); // Check every 50ms

    return () => clearInterval(interval);
  }, [score, gameOver, router, spawnObjection, syncActiveObjections]);

  // Handle input submission
  const handleSubmit = useCallback((inputValue = currentInput) => {
    if (!inputValue.trim() || gameOver) return;

    const matchedComponent = findMatchingComponent(inputValue);

    if (!matchedComponent) {
      // Wrong answer - clear input, no penalty
      setCurrentInput('');
      return;
    }

    // Find the objection that matches this component (prioritize bottom-most/most urgent)
    const matchingObjectionIndex = activeObjectionsRef.current.findIndex(
      (obj) => obj.objection.component === matchedComponent
    );

    if (matchingObjectionIndex === -1) {
      // Correct component, but no matching objection on screen
      setCurrentInput('');
      return;
    }

    // SLICE! Remove the objection
    activeObjectionsRef.current.splice(matchingObjectionIndex, 1);
    syncActiveObjections();

    // Update score
    const newComboStreak = comboStreak + 1;
    const isComboActive = newComboStreak >= GAME_CONFIG.COMBO_THRESHOLD;
    const pointsAwarded = isComboActive
      ? GAME_CONFIG.POINTS_PER_SLICE * GAME_CONFIG.COMBO_MULTIPLIER
      : GAME_CONFIG.POINTS_PER_SLICE;

    setScore((prev) => prev + pointsAwarded);
    setComboStreak(newComboStreak);
    setComboActive(isComboActive);

    // Check for reflection unlock
    if (score + pointsAwarded >= GAME_CONFIG.REFLECTION_UNLOCK_SCORE && !reflectionUnlocked) {
      setReflectionUnlocked(true);
      setShowUnlockOverlay(true);
    }

    // Clear input
    setCurrentInput('');
  }, [currentInput, gameOver, comboStreak, score, reflectionUnlocked, syncActiveObjections]);

  // Handle input change
  const handleInputChange = (value: string) => {
    if (!gameOver) {
      setCurrentInput(value);
      if (isExactMatch(value)) {
        queueMicrotask(() => handleSubmit(value));
      }
    }
  };

  // Handle unlock overlay continue
  const handleContinuePlaying = () => {
    setShowUnlockOverlay(false);
  };

  return (
    <div className="relative h-full w-full overflow-hidden game-screen">
      {/* HUD */}
      <HUD
        score={score}
        lives={lives}
        comboStreak={comboStreak}
        comboActive={comboActive}
      />

      {/* Framework reference panel */}
      <FrameworkPanel />

      {/* Play field with descending objections */}
      <PlayField objections={activeObjections} />

      {/* Input bar */}
      <InputBar
        value={currentInput}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        disabled={gameOver || showUnlockOverlay}
      />

      {/* Unlock overlay (200 points) */}
      {showUnlockOverlay && (
        <UnlockOverlay
          score={score}
          onContinue={handleContinuePlaying}
        />
      )}

      {/* Game over overlay (0 lives) */}
      {gameOver && (
        <GameOverOverlay
          missedObjections={missedObjections}
          finalScore={score}
        />
      )}
    </div>
  );
}
