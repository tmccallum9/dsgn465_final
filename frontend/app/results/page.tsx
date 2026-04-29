import Link from "next/link";
import { REFLECTION } from "@/lib/content/reflection";

interface ResultsPageProps {
  searchParams: Promise<{ earned?: string }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  // Next.js 16.2.4: searchParams is a Promise!
  const params = await searchParams;
  const earned = params.earned === 'true';

  return (
    <main className="h-dvh w-full overflow-y-auto overflow-x-hidden bg-white text-gray-900 results-screen">
      <div className="grid min-h-full w-full place-items-start justify-items-center px-4 py-8 md:px-6 md:py-16">
        <div className="w-full max-w-3xl space-y-10 md:space-y-16">
        {/* Header - different framing based on earned vs lost */}
        <header className="space-y-4 border-b border-gray-300 pb-6 text-center md:pb-8">
          <h1 className="font-serif text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            {earned ? "You crossed the chasm." : "The innovation didn't make it —"}
          </h1>
          {!earned && (
            <p className="text-xl leading-snug text-gray-600 md:text-2xl">
              but here&apos;s what mastering the chasm looks like.
            </p>
          )}
          <p className="pt-2 font-mono text-sm text-gray-500 md:pt-4 md:text-lg">
            Growth Innovation Design • Northwestern MMM
          </p>
        </header>

        {/* BCG Context - Why This Game Matters */}
        <section className="space-y-6">
          <div className="text-center border-b border-gray-300 pb-6">
            <h2 className="mb-2 font-serif text-2xl font-bold leading-tight text-gray-800 md:text-3xl">
              Innovation at BCG: From Game to Practice
            </h2>
            <p className="text-xs uppercase tracking-wider text-gray-500 md:text-sm">
              Crossing the Confidence Chasm in Client Work
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="border-l-4 border-purple-600 bg-purple-50 py-2 pl-4 text-base leading-relaxed text-gray-700 md:pl-6 md:text-lg">
              {REFLECTION.context}
            </p>
          </div>
        </section>

        {/* Six Reflection Questions */}
        <section className="space-y-8 md:space-y-12">
          <div className="border-t border-gray-200 pt-8 text-center">
            <h2 className="font-serif text-2xl font-bold leading-tight text-gray-800 md:text-3xl">
              Reflection on Innovation Frameworks
            </h2>
            <p className="text-gray-600 mt-2">
              Applying customer relevance, organizational positioning, and conscious innovation
            </p>
          </div>

          {REFLECTION.questions.map((q, index) => (
            <article key={q.id} className="space-y-4">
              <h3 className="font-serif text-xl font-semibold leading-snug text-gray-800 md:text-2xl">
                {index + 1}. {q.prompt}
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="whitespace-pre-line text-base leading-relaxed text-gray-700 md:text-lg">
                  {q.answer}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Design Notes */}
        <section className="space-y-4 border-t border-gray-300 pt-8 md:pt-12">
          <h2 className="font-serif text-xl font-semibold leading-snug text-gray-800 md:text-2xl">
            A Note on Game Design Choices
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-700 md:text-lg">
              {REFLECTION.designNotes}
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col justify-center gap-3 border-t border-gray-200 pb-8 pt-8 sm:flex-row md:gap-4 md:pb-16">
          <Link
            href="/"
            className="rounded-lg bg-gray-900 px-6 py-4 text-center font-mono font-semibold text-white md:px-8
                     hover:bg-gray-800 transition-all duration-200"
          >
            ← Back to Start
          </Link>
          <Link
            href="/play"
            className="rounded-lg bg-gradient-to-r from-[#00D9FF] to-[#4E2A84] px-6 py-4 text-center font-mono font-semibold text-white md:px-8
                     hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Play Again →
          </Link>
        </div>
        </div>
      </div>
    </main>
  );
}
