
import { ArrowRight, Clock, Sparkles, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Language } from '@/lib/adaptive/i18n'
import type { AnalysisResult } from '@/lib/adaptive/types'
import { HighlightedText } from './highlighted-text'
import { PracticeCard } from './practice-card'

interface AdaptiveLessonProps {
  result: AnalysisResult
  onContinue: () => void
  language?: Language
}

const lessonText = {
  en: {
    generated: 'Generated for you',
    keyConcepts: 'Key concepts',
    keyTakeaway: 'Key takeaway',
    noPractice: 'No practice needed',
    noPracticeDescription:
      'Jeff determined your understanding is strong enough to move forward without extra practice.',
    nextStep: 'Next step decided by Jeff',
    continueNext: 'Continue to next concept',
    continueLearning: 'Continue Learning',
    minutes: 'min',
  },
  kn: {
    generated: 'ನಿಮಗಾಗಿ ರಚಿಸಲಾಗಿದೆ',
    keyConcepts: 'ಪ್ರಮುಖ ಪರಿಕಲ್ಪನೆಗಳು',
    keyTakeaway: 'ಮುಖ್ಯ ಅಂಶ',
    noPractice: 'ಅಭ್ಯಾಸದ ಅಗತ್ಯವಿಲ್ಲ',
    noPracticeDescription:
      'ನಿಮ್ಮ ತಿಳುವಳಿಕೆ ಉತ್ತಮವಾಗಿದೆ, ಆದ್ದರಿಂದ ಹೆಚ್ಚುವರಿ ಅಭ್ಯಾಸವಿಲ್ಲದೆ ಮುಂದುವರಿಯಬಹುದು ಎಂದು Jeff ನಿರ್ಧರಿಸಿದ್ದಾರೆ.',
    nextStep: 'ಮುಂದಿನ ಹಂತವನ್ನು Jeff ನಿರ್ಧರಿಸಿದ್ದಾರೆ',
    continueNext: 'ಮುಂದಿನ ಪರಿಕಲ್ಪನೆಗೆ ಮುಂದುವರಿಯಿರಿ',
    continueLearning: 'ಕಲಿಕೆಯನ್ನು ಮುಂದುವರಿಸಿ',
    minutes: 'ನಿಮಿಷ',
  },
  hi: {
    generated: 'आपके लिए तैयार किया गया',
    keyConcepts: 'मुख्य अवधारणाएँ',
    keyTakeaway: 'मुख्य सीख',
    noPractice: 'अभ्यास की आवश्यकता नहीं',
    noPracticeDescription:
      'Jeff ने निर्धारित किया है कि आपकी समझ अच्छी है और आप अतिरिक्त अभ्यास के बिना आगे बढ़ सकते हैं।',
    nextStep: 'अगला कदम Jeff ने तय किया है',
    continueNext: 'अगली अवधारणा पर जाएँ',
    continueLearning: 'सीखना जारी रखें',
    minutes: 'मिनट',
  },
} satisfies Record<Language, Record<string, string>>

export function AdaptiveLesson({
  result,
  onContinue,
  language = 'en',
}: AdaptiveLessonProps) {
  const { lesson, decision } = result
  const t = lessonText[language]

  const continueLabel =
    decision.action === 'advance'
      ? t.continueNext
      : t.continueLearning

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <article className="glass animate-fade-up overflow-hidden rounded-3xl lg:col-span-3">
        <header className="relative border-b border-border p-6 sm:p-8">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 font-medium text-primary">
                <Sparkles className="size-3" aria-hidden="true" />
                {t.generated}
              </span>

              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Target className="size-3" aria-hidden="true" />
                {lesson.focusConcept}
              </span>

              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Clock className="size-3" aria-hidden="true" />
                {lesson.estimatedMinutes} {t.minutes}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {lesson.title}
            </h3>

            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground text-pretty">
              {lesson.summary}
            </p>
          </div>
        </header>

        <div className="space-y-6 p-6 sm:p-8">
          {lesson.sections.map((section, i) => (
            <section key={section.heading} className="flex gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/40 font-mono text-xs text-primary">
                {i + 1}
              </span>

              <div>
                <h4 className="font-medium">{section.heading}</h4>
                <p className="mt-1.5 leading-relaxed text-foreground/80 text-pretty">
                  <HighlightedText text={section.body} />
                </p>
              </div>
            </section>
          ))}

          <div>
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {t.keyConcepts}
            </p>

            <ul className="mt-2 flex flex-wrap gap-2">
              {lesson.keyConcepts.map((concept) => (
                <li
                  key={concept}
                  className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-1 text-sm text-accent"
                >
                  {concept}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-success/25 bg-success/5 p-4">
            <p className="text-xs font-medium tracking-wider text-success uppercase">
              {t.keyTakeaway}
            </p>
            <p className="mt-1 font-medium">{lesson.keyTakeaway}</p>
          </div>
        </div>
      </article>

      <div className="flex flex-col gap-6 lg:col-span-2">
        {lesson.practice ? (
          <PracticeCard key={lesson.title} practice={lesson.practice} />
        ) : (
          <div className="glass animate-fade-up rounded-3xl p-6 [animation-delay:120ms]">
            <p className="text-xs font-medium tracking-wider text-success uppercase">
              {t.noPractice}
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {t.noPracticeDescription}
            </p>
          </div>
        )}

        <div className="glass animate-fade-up rounded-3xl p-6 [animation-delay:200ms]">
          <p className="text-sm text-muted-foreground">{t.nextStep}</p>
          <p className="mt-1 text-lg font-semibold">{decision.label}</p>

          <Button
            onClick={onContinue}
            className="mt-5 h-11 w-full gap-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90"
          >
            {continueLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
