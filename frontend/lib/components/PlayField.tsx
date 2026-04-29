// PlayField: Area where objections descend

'use client';

import { ActiveObjection, getObjectionProgress } from '../game/state';
import { useEffect, useState } from 'react';

interface PlayFieldProps {
  objections: ActiveObjection[];
}

export default function PlayField({ objections }: PlayFieldProps) {
  const [now, setNow] = useState(0);

  // Update "now" every frame to animate objections
  useEffect(() => {
    let rafId: number;
    const update = () => {
      setNow(Date.now());
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="fixed bottom-36 left-0 right-0 top-48 overflow-hidden md:bottom-32 md:left-64 md:top-16">
      {objections.map((obj) => {
        const progress = getObjectionProgress(obj, now);
        const yPosition = progress * 100; // 0-100%

        return (
          <div
            key={obj.id}
            className="absolute flex justify-center transition-opacity duration-200"
            style={{
              top: `${yPosition}%`,
              transform: 'translate(-50%, -50%)',
              left: `${obj.x}%`,
            }}
          >
            {/* Objection card */}
            <div className="w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-white/20 bg-white/10 px-4 py-3 shadow-2xl backdrop-blur-sm md:w-auto md:max-w-xl md:px-8 md:py-4">
              <p
                className="break-words text-center font-serif text-base leading-relaxed text-[var(--text-body)] md:text-xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                &quot;{obj.objection.text}&quot;
              </p>
            </div>
          </div>
        );
      })}

      {/* Visual hint when no objections */}
      {objections.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="px-6 text-center font-mono text-sm text-[var(--text-secondary)] opacity-30">
            Objections will appear here...
          </p>
        </div>
      )}
    </div>
  );
}
