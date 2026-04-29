// InputBar: Typing input + live preview (bottom center)

'use client';

import { useEffect, useRef } from 'react';

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function InputBar({ value, onChange, onSubmit, disabled = false }: InputBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount and whenever disabled state changes
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/40 px-4 py-4 backdrop-blur-sm md:left-64 md:px-12 md:py-8">
      <div className="mx-auto max-w-2xl space-y-3 md:space-y-4">
        {/* Live preview - "stage presence" */}
        {value && (
          <div className="break-all text-center font-mono text-lg font-bold uppercase tracking-wider text-white md:text-2xl">
            {value}
          </div>
        )}

        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Type the framework component..."
          className="w-full rounded-lg border-2 border-[var(--purple-secondary)] bg-white/10 px-4 py-3 text-center font-mono text-base
                     text-white placeholder:text-[var(--text-secondary)] uppercase
                     focus:outline-none focus:border-[var(--accent-cyan)] focus:bg-white/15
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 md:px-6 md:py-4 md:text-lg"
        />

        {/* Helper text */}
        <div className="text-center font-mono text-[0.65rem] text-[var(--text-secondary)] md:text-xs">
          Press Enter to submit • Typos are forgiven
        </div>
      </div>
    </div>
  );
}
