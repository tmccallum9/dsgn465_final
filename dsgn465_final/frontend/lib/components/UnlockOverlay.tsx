// UnlockOverlay: Modal shown at 200 points (reflection unlocked)

'use client';

import Link from 'next/link';

interface UnlockOverlayProps {
  score: number;
  onContinue: () => void;
}

export default function UnlockOverlay({ score, onContinue }: UnlockOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl border-2 border-[var(--accent-cyan)] bg-gradient-to-b from-[var(--bg-darker)] to-[var(--bg-dark)] p-5 shadow-2xl md:p-8">
        {/* Icon/Visual */}
        <div className="mb-6 text-center">
          <div className="mb-4 inline-block rounded-full bg-[var(--accent-cyan)]/20 p-3 md:p-4">
            <span className="text-4xl md:text-6xl">✨</span>
          </div>
          <h2 className="mb-2 font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
            Reflection Unlocked
          </h2>
          <p className="font-mono text-sm text-[var(--accent-cyan)] md:text-lg">
            {score} points — You crossed the chasm
          </p>
        </div>

        {/* Message */}
        <p className="font-mono text-sm text-[var(--text-body)] text-center leading-relaxed mb-8">
          You&apos;ve demonstrated mastery of the frameworks. Continue playing for a higher score,
          or read your reflection on innovation and organizational hacking.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/results?earned=true"
            className="rounded-lg bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--purple-primary)] px-6 py-4 text-center font-mono text-base font-semibold text-white
                     md:text-lg
                     hover:shadow-xl hover:shadow-[var(--accent-cyan)]/30 transition-all duration-300 hover:scale-105"
          >
            Read Reflection →
          </Link>

          <button
            onClick={onContinue}
            className="rounded-lg border border-white/20 bg-white/10 px-6 py-4 font-mono text-base font-semibold text-white
                     md:text-lg
                     hover:bg-white/20 transition-all duration-200"
          >
            Continue Playing
          </button>
        </div>
      </div>
    </div>
  );
}
