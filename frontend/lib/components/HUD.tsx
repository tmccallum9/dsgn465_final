// HUD: Score, Lives, Combo display (top bar)

interface HUDProps {
  score: number;
  lives: number;
  comboStreak: number;
  comboActive: boolean;
}

export default function HUD({ score, lives, comboStreak, comboActive }: HUDProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex min-h-16 items-center justify-between gap-3 border-b border-white/10 bg-black/30 px-3 py-3 backdrop-blur-sm md:px-6 md:py-4">
      {/* Score */}
      <div className="flex min-w-0 items-center gap-2 md:gap-4">
        <div className="font-mono text-[0.65rem] text-[var(--text-secondary)] md:text-sm">SCORE</div>
        <div className="font-mono text-xl font-bold tabular-nums text-[var(--accent-cyan)] md:text-3xl">
          {score.toString().padStart(4, '0')}
        </div>
      </div>

      {/* Combo indicator (only shown when active) */}
      {comboActive && (
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-[var(--accent-cyan)]/50 bg-[var(--accent-cyan)]/20 px-3 py-1.5 md:gap-2 md:px-4 md:py-2">
          <span className="animate-pulse text-lg md:text-2xl">🔥</span>
          <span className="font-mono text-base font-bold text-[var(--accent-cyan)] md:text-lg">
            {comboStreak}x
          </span>
        </div>
      )}

      {/* Lives */}
      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <div className="font-mono text-[0.65rem] text-[var(--text-secondary)] md:text-sm">LIVES</div>
        <div className="flex gap-1.5 md:gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 md:h-3 md:w-3 ${
                i < lives
                  ? 'bg-[var(--purple-primary)] shadow-lg shadow-[var(--purple-primary)]/50'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
