// GameOverOverlay: Shows missed objections and correct answers when player loses

'use client';

import Link from 'next/link';
import { Objection } from '../config/objections';
import { getComponentById } from '../config/frameworks';

interface GameOverOverlayProps {
  missedObjections: Objection[];
  finalScore: number;
}

export default function GameOverOverlay({ missedObjections, finalScore }: GameOverOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-md md:items-center">
      <div className="my-4 w-full max-w-3xl rounded-2xl border-2 border-[var(--accent-red)] bg-gradient-to-b from-[var(--bg-darker)] to-[var(--bg-dark)] p-5 shadow-2xl md:my-8 md:p-8">
        {/* Header */}
        <div className="mb-6 text-center md:mb-8">
          <div className="mb-4 inline-block rounded-full bg-[var(--accent-red)]/20 p-3 md:p-4">
            <span className="text-4xl md:text-6xl">💔</span>
          </div>
          <h2 className="mb-2 font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
            The Innovation Didn&apos;t Make It
          </h2>
          <p className="font-mono text-base text-[var(--accent-red)] md:text-lg">
            Final Score: {finalScore} points
          </p>
        </div>

        {/* Message */}
        <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4 md:mb-8 md:p-6">
          <p className="font-mono text-sm text-[var(--text-body)] text-center leading-relaxed">
            You ran out of organizational confidence. Here are the objections that slipped through
            and the framework components that could have defeated them:
          </p>
        </div>

        {/* Missed Objections with Correct Answers */}
        <div className="mb-8 max-h-80 space-y-4 overflow-y-auto md:max-h-96">
          {missedObjections.map((objection, index) => {
            const component = getComponentById(objection.component);

            return (
              <div
                key={`${objection.id}-${index}`}
                className="rounded-lg border border-[var(--accent-red)]/30 bg-white/5 p-4 transition-colors hover:bg-white/10 md:p-5"
              >
                {/* Objection text */}
                <div className="mb-3">
                  <div className="font-mono text-xs text-[var(--accent-red)] uppercase tracking-wider mb-2">
                    Missed Objection
                  </div>
                  <p className="font-serif text-base italic text-[var(--text-body)] md:text-lg">
                    &quot;{objection.text}&quot;
                  </p>
                </div>

                {/* Correct answer */}
                <div className="flex items-center gap-3 rounded border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 p-3">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-xs text-[var(--text-secondary)] mb-1">
                      Correct Answer:
                    </div>
                    <div className="break-words font-mono text-sm font-bold uppercase text-[var(--accent-cyan)] md:text-base">
                      {component?.name || objection.component}
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                {objection.explanation && (
                  <div className="mt-3 pl-3 border-l-2 border-white/20">
                    <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed">
                      {objection.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {missedObjections.length === 0 && (
            <div className="text-center py-8 text-[var(--text-secondary)] font-mono text-sm">
              No objections were missed — the game ended for another reason.
            </div>
          )}
        </div>

        {/* Study tip */}
        <div className="mb-6 p-4 bg-[var(--purple-primary)]/20 border border-[var(--purple-primary)]/50 rounded-lg">
          <p className="font-mono text-xs text-[var(--text-body)] text-center">
            💡 <strong>Tip:</strong> The framework reference panel on the left shows all valid answers.
            Use it to study the mappings between objections and framework components.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/play"
            className="rounded-lg bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--purple-primary)] px-6 py-4 text-center font-mono text-base font-semibold text-white
                     md:text-lg
                     hover:shadow-xl hover:shadow-[var(--accent-cyan)]/30 transition-all duration-300 hover:scale-105"
          >
            Try Again →
          </Link>

          <Link
            href="/results?earned=false"
            className="rounded-lg border border-white/20 bg-white/10 px-6 py-4 text-center font-mono text-base font-semibold text-white
                     md:text-lg
                     hover:bg-white/20 transition-all duration-200 text-center"
          >
            View Reflection
          </Link>

          <Link
            href="/"
            className="px-6 py-4 font-mono text-sm text-[var(--text-secondary)] hover:text-white transition-colors text-center"
          >
            ← Back to Start
          </Link>
        </div>
      </div>
    </div>
  );
}
