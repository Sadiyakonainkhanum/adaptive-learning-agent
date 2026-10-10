
import { ArrowRight, Brain, Radar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConceptGraph } from './concept-graph'
import type { AnalysisResult } from '@/lib/adaptive/types'
import type { Language } from '@/lib/adaptive/i18n'

const heroText: Record<Language, Record<string, string>> = {
  en: {
    badge: 'Adaptive intelligence engine · v1.0',
    heading: 'Your learning path.',
    highlight: 'Adapted to you.',
    description:
      'ADAPTIVE reads how you reason, not just what you answer. It diagnoses the gaps behind every response, predicts where you will struggle next, and rewrites your path in real time.',
    start: 'Start Learning',
    see: 'See how it adapts',
    agents: 'AI agents',
    signals: 'Signals per answer',
    adapt: 'To adapt',
    graph: 'Live concept graph',
    updated: 'Updated',
    waiting: 'Waiting for analysis',
    understanding: 'Understanding',
    firstAnswer: 'Waiting for your first answer',
    predicted: 'Predicted gap',
  },
  kn: {
    badge: 'ಹೊಂದಿಕೊಳ್ಳುವ ಬುದ್ಧಿವಂತಿಕೆ ವ್ಯವಸ್ಥೆ · v1.0',
    heading: 'ನಿಮ್ಮ ಕಲಿಕೆಯ ಹಾದಿ.',
    highlight: 'ನಿಮಗೆ ತಕ್ಕಂತೆ ಹೊಂದಿಕೆ.',
    description:
      'ADAPTIVE ನಿಮ್ಮ ಉತ್ತರಗಳನ್ನು ಮಾತ್ರವಲ್ಲ, ನೀವು ಹೇಗೆ ಯೋಚಿಸುತ್ತೀರಿ ಎಂಬುದನ್ನೂ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತದೆ. ಕಲಿಕೆಯ ಕೊರತೆಗಳನ್ನು ಗುರುತಿಸಿ, ಮುಂದಿನ ಸವಾಲುಗಳನ್ನು ಊಹಿಸಿ, ನಿಮ್ಮ ಕಲಿಕೆಯ ಹಾದಿಯನ್ನು ತಕ್ಷಣ ಹೊಂದಿಸುತ್ತದೆ.',
    start: 'ಕಲಿಕೆ ಪ್ರಾರಂಭಿಸಿ',
    see: 'ಇದು ಹೇಗೆ ಹೊಂದಿಕೊಳ್ಳುತ್ತದೆ ನೋಡಿ',
    agents: 'AI ಏಜೆಂಟ್‌ಗಳು',
    signals: 'ಪ್ರತಿ ಉತ್ತರದ ಸೂಚನೆಗಳು',
    adapt: 'ಹೊಂದಿಕೊಳ್ಳಲು',
    graph: 'ನೇರ ಪರಿಕಲ್ಪನಾ ನಕ್ಷೆ',
    updated: 'ನವೀಕರಿಸಲಾಗಿದೆ',
    waiting: 'ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಕಾಯುತ್ತಿದೆ',
    understanding: 'ಅರ್ಥಗ್ರಹಿಕೆ',
    firstAnswer: 'ನಿಮ್ಮ ಮೊದಲ ಉತ್ತರಕ್ಕಾಗಿ ಕಾಯುತ್ತಿದೆ',
    predicted: 'ಊಹಿಸಿದ ಕಲಿಕೆಯ ಕೊರತೆ',
  },
  hi: {
    badge: 'अनुकूलनशील बुद्धिमत्ता प्रणाली · v1.0',
    heading: 'आपकी सीखने की राह।',
    highlight: 'आपके अनुसार अनुकूलित।',
    description:
      'ADAPTIVE केवल आपके उत्तर नहीं, बल्कि आपके सोचने के तरीके को भी समझता है। यह सीखने की कमियों को पहचानता है, अगली कठिनाइयों का अनुमान लगाता है और आपकी सीखने की राह को तुरंत बदलता है।',
    start: 'सीखना शुरू करें',
    see: 'यह कैसे अनुकूल होता है, देखें',
    agents: 'AI एजेंट',
    signals: 'हर उत्तर के संकेत',
    adapt: 'अनुकूलन का समय',
    graph: 'लाइव कॉन्सेप्ट ग्राफ',
    updated: 'अपडेट किया गया',
    waiting: 'विश्लेषण की प्रतीक्षा में',
    understanding: 'समझ',
    firstAnswer: 'आपके पहले उत्तर की प्रतीक्षा में',
    predicted: 'अनुमानित सीखने की कमी',
  },
}

export function HeroSection({
  onStart,
  result,
  language = 'en',
}: {
  onStart: () => void
  result: AnalysisResult | null
  language?: Language
}) {
  const t = heroText[language]

  const understanding = result
    ? result.understanding.charAt(0).toUpperCase() +
      result.understanding.slice(1)
    : null

  return (
    <section
      id="dashboard"
      aria-labelledby="hero-title"
      className="relative scroll-mt-20"
    >
      <div
        className="grid-fade pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="size-1.5 animate-soft-pulse rounded-full bg-primary" aria-hidden="true" />
            {t.badge}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {t.heading}{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.highlight}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {t.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              onClick={onStart}
              className="h-11 gap-2 rounded-xl px-6 text-sm font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90"
            >
              {t.start}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>

            <a
              href="#engine"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {t.see}
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              ['2', t.agents],
              ['6', t.signals],
              ['<4s', t.adapt],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-mono text-xl font-semibold">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="glass relative overflow-hidden rounded-3xl p-5 shadow-2xl shadow-primary/10 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                {t.graph}
              </p>

              <span className="flex items-center gap-1.5 text-xs text-success">
                <span className="size-1.5 animate-soft-pulse rounded-full bg-success" aria-hidden="true" />
                {result ? t.updated : t.waiting}
              </span>
            </div>

            <ConceptGraph result={result} />

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface/80 p-3">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Brain className="size-3.5 text-primary" aria-hidden="true" />
                  Agnes · {t.understanding}
                </p>

                <p className="mt-1 text-sm font-medium">
                  {result
                    ? `${understanding} — ${result.currentGap.concept}`
                    : t.firstAnswer}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface/80 p-3">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Radar className="size-3.5 text-warning" aria-hidden="true" />
                  {t.predicted}
                </p>

                <p className="mt-1 text-sm font-medium">
                  {result ? (
                    <>
                      {result.predictedGap.concept}{' '}
                      <span className="font-mono text-warning">
                        · {Math.round(result.predictedGap.probability * 100)}%
                      </span>
                    </>
                  ) : (
                    t.firstAnswer
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
