import Link from "next/link";
import { FRAMEWORKS } from "@/lib/config/frameworks";

export default function StartPage() {
  return (
    <div className="min-h-full w-full overflow-y-auto bg-[var(--bg-dark)] px-4 py-8 md:flex md:items-center md:justify-center md:p-8">
      <main className="flex w-full max-w-6xl flex-col items-start gap-8 pb-12 md:gap-12 lg:flex-row">
        {/* Left: Title and Concept */}
        <div className="w-full flex-1 space-y-6 md:space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
              Confidence Chasm
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--purple-primary)] rounded-full" />
          </div>

          {/* Concept */}
          <div className="space-y-4 font-mono text-base leading-relaxed text-[var(--text-body)] md:text-lg">
            <p>
              The <strong className="text-white">Confidence Chasm</strong> is the gap between
              &quot;we have an idea&quot; and &quot;the organization commits to it.&quot;
            </p>
            <p>
              Innovators cross the chasm by countering objections with the right framework.
              In this game, objections descend down the screen — you type the specific
              framework component that defeats each one.
            </p>
            <p className="text-[var(--text-secondary)] text-base">
              Misses cost organizational confidence. Run out of confidence and the innovation dies.
              Slice 20 objections to unlock your reflection.
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4 md:p-6">
            <h2 className="font-mono text-sm uppercase tracking-wider text-[var(--accent-cyan)]">
              How to Play
            </h2>
            <ul className="space-y-2 font-mono text-sm text-[var(--text-body)]">
              <li className="flex gap-2">
                <span className="text-[var(--accent-cyan)]">→</span>
                Type the framework component that defeats each objection
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent-cyan)]">→</span>
                Press Enter to submit (typos are forgiven)
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent-cyan)]">→</span>
                Three lives. Three frameworks. 200 points to unlock reflection.
              </li>
            </ul>
          </div>

          {/* Begin Button */}
          <Link
            href="/play"
            className="block w-full rounded-lg bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--purple-primary)] px-8 py-4 text-center font-mono text-lg font-bold text-white
                     md:inline-block md:w-auto md:px-12 md:py-5 md:text-xl
                     hover:shadow-2xl hover:shadow-[var(--accent-cyan)]/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Begin →
          </Link>
        </div>

        {/* Right: Framework Reference */}
        <div className="w-full flex-1 rounded-xl border border-white/10 bg-white/5 p-4 md:p-8">
          <h2 className="font-mono text-sm uppercase tracking-wider text-[var(--text-secondary)] mb-6">
            Framework Reference
          </h2>

          <div className="space-y-6">
            {FRAMEWORKS.map((framework) => (
              <div key={framework.id} className="space-y-2">
                <div className="font-mono text-sm font-semibold text-white">
                  {framework.name}
                </div>
                <div className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                  {framework.subtitle}
                </div>
                <ul className="space-y-1.5">
                  {framework.components.map((component) => (
                    <li
                      key={component.id}
                      className="font-mono text-xs text-[var(--text-body)] flex items-start gap-2"
                    >
                      <span className="text-[var(--accent-cyan)]">•</span>
                      <span>{component.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="px-4 pb-4 text-center font-mono text-xs text-[var(--text-secondary)] opacity-50 md:absolute md:bottom-4 md:left-0 md:right-0 md:p-0">
        Growth Innovation Design • Northwestern MMM
      </div>
    </div>
  );
}
