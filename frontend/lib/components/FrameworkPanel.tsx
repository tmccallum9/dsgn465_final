// FrameworkPanel: Always-visible reference panel (left side)

import { FRAMEWORKS } from '../config/frameworks';

export default function FrameworkPanel() {
  return (
    <div className="fixed left-0 right-0 top-16 z-40 h-32 overflow-x-auto overflow-y-hidden border-b border-white/10 bg-black/40 backdrop-blur-sm md:bottom-0 md:right-auto md:h-auto md:w-64 md:overflow-y-auto md:border-b-0 md:border-r">
      <div className="flex min-w-max gap-4 p-3 md:block md:min-w-0 md:space-y-6 md:p-6">
        <h2 className="sr-only md:not-sr-only md:font-mono md:text-xs md:uppercase md:tracking-wider md:text-[var(--text-secondary)]">
          Frameworks
        </h2>

        {FRAMEWORKS.map((framework) => (
          <div key={framework.id} className="w-56 shrink-0 space-y-2 md:w-auto">
            {/* Framework name */}
            <div className="font-mono text-xs font-semibold text-white md:text-sm">
              {framework.name}
            </div>

            {/* Subtitle */}
            <div className="mb-2 line-clamp-2 font-mono text-[0.65rem] leading-relaxed text-[var(--text-secondary)] md:mb-3 md:text-xs">
              {framework.subtitle}
            </div>

            {/* Components */}
            <ul className="space-y-1 md:space-y-1.5">
              {framework.components.map((component) => (
                <li
                  key={component.id}
                  className="flex items-start gap-1.5 font-mono text-[0.65rem] text-[var(--text-body)] md:gap-2 md:text-xs"
                >
                  <span className="text-[var(--accent-cyan)] mt-0.5">•</span>
                  <span className="truncate" title={component.name}>
                    {component.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Helper text */}
        <div className="hidden border-t border-white/10 pt-4 md:block">
          <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed">
            Type the component that defeats each objection
          </p>
        </div>
      </div>
    </div>
  );
}
