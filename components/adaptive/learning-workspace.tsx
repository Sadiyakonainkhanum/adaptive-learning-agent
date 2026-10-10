
'use client'

import { forwardRef, type KeyboardEvent } from 'react'
import {
  Lightbulb,
  Loader2,
  RotateCcw,
  Sparkles,
  Tag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { Question } from '@/lib/adaptive/types'
import type { SessionStatus } from '@/hooks/use-adaptive-session'
import type { Language } from '@/lib/adaptive/i18n'

interface LearningWorkspaceProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  answer: string
  onAnswerChange: (value: string) => void
  onAnalyze: () => void
  status: SessionStatus
  error: string | null
  isReinforcement: boolean
  language: Language
}

const workspaceText: Record<
  Language,
  Record<string, string>
> = {
  en: {
    reinforcement: 'Reinforcement attempt',
    question: 'Question',
    of: 'of',
    hint: 'Hint',
    yourAnswer: 'Your answer',
    word: 'words',
    placeholder:
      'Explain your reasoning in your own words. ADAPTIVE analyzes how you think, not just the final answer…',
    demo: 'Try an example:',
    strong: 'Strong answer',
    weak: 'Weak answer',
    shortcut: 'to analyze',
    analyzing: 'Analyzing…',
    analyze: 'Analyze Answer',
    easy: 'Beginner',
    medium: 'Intermediate',
    hard: 'Advanced',
    topic: 'Topic',
    concept: 'Concept',
  },

  kn: {
    reinforcement: 'ಮರುಅಭ್ಯಾಸ ಪ್ರಯತ್ನ',
    question: 'ಪ್ರಶ್ನೆ',
    of: '/',
    hint: 'ಸುಳಿವು',
    yourAnswer: 'ನಿಮ್ಮ ಉತ್ತರ',
    word: 'ಪದಗಳು',
    placeholder:
      'ನಿಮ್ಮದೇ ಪದಗಳಲ್ಲಿ ನಿಮ್ಮ ಆಲೋಚನೆಯನ್ನು ವಿವರಿಸಿ. ADAPTIVE ನಿಮ್ಮ ಅಂತಿಮ ಉತ್ತರದ ಜೊತೆಗೆ ನಿಮ್ಮ ಆಲೋಚನಾ ವಿಧಾನವನ್ನೂ ವಿಶ್ಲೇಷಿಸುತ್ತದೆ…',
    demo: 'ಉದಾಹರಣೆ ಪ್ರಯತ್ನಿಸಿ:',
    strong: 'ಉತ್ತಮ ಉತ್ತರ',
    weak: 'ದುರ್ಬಲ ಉತ್ತರ',
    shortcut: 'ವಿಶ್ಲೇಷಿಸಲು',
    analyzing: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ…',
    analyze: 'ಉತ್ತರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
    easy: 'ಪ್ರಾರಂಭಿಕ ಹಂತ',
    medium: 'ಮಧ್ಯಮ ಹಂತ',
    hard: 'ಮುಂದುವರಿದ ಹಂತ',
    topic: 'ವಿಷಯ',
    concept: 'ಪರಿಕಲ್ಪನೆ',
  },

  hi: {
    reinforcement: 'पुनः अभ्यास का प्रयास',
    question: 'प्रश्न',
    of: 'में से',
    hint: 'संकेत',
    yourAnswer: 'आपका उत्तर',
    word: 'शब्द',
    placeholder:
      'अपने शब्दों में अपना तर्क समझाएँ। ADAPTIVE आपके अंतिम उत्तर के साथ आपकी सोचने की प्रक्रिया का भी विश्लेषण करता है…',
    demo: 'उदाहरण आज़माएँ:',
    strong: 'अच्छा उत्तर',
    weak: 'कमज़ोर उत्तर',
    shortcut: 'विश्लेषण करने के लिए',
    analyzing: 'विश्लेषण हो रहा है…',
    analyze: 'उत्तर का विश्लेषण करें',
    easy: 'शुरुआती स्तर',
    medium: 'मध्यम स्तर',
    hard: 'उन्नत स्तर',
    topic: 'विषय',
    concept: 'अवधारणा',
  },
}

function getDifficultyLabel(
  difficulty: string,
  language: Language,
  t: Record<string, string>,
) {
  const value = difficulty.toLowerCase()

  if (['easy', 'beginner', 'foundational'].includes(value)) {
    return t.easy
  }

  if (['medium', 'intermediate'].includes(value)) {
    return t.medium
  }

  if (['hard', 'advanced'].includes(value)) {
    return t.hard
  }

  return difficulty
}

export const LearningWorkspace = forwardRef<
  HTMLTextAreaElement,
  LearningWorkspaceProps
>(function LearningWorkspace(
  {
    question,
    questionNumber,
    totalQuestions,
    answer,
    onAnswerChange,
    onAnalyze,
    status,
    error,
    isReinforcement,
    language,
  },
  ref,
) {
  const isAnalyzing = status === 'analyzing'
  const wordCount = answer.trim()
    ? answer.trim().split(/\s+/).length
    : 0

  const t = workspaceText[language]

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key !== 'Enter' || !(e.metaKey || e.ctrlKey)) return
    if (e.nativeEvent.isComposing || e.keyCode === 229) return

    e.preventDefault()
    onAnalyze()
  }

  const difficultyLabel = getDifficultyLabel(
    question.difficulty,
    language,
    t,
  )

  return (
    <div className="glass grid overflow-hidden rounded-3xl lg:grid-cols-5">
      <div className="border-b border-border p-6 sm:p-8 lg:col-span-2 lg:border-r lg:border-b-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
            <Tag className="size-3" aria-hidden="true" />
            {question.topic} · {question.concept}
          </span>

          <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
            {difficultyLabel}
          </span>

          {isReinforcement && (
            <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 text-xs text-warning">
              <RotateCcw className="size-3" aria-hidden="true" />
              {t.reinforcement}
            </span>
          )}
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {t.question} {questionNumber} {t.of} {totalQuestions}
        </p>

        <h3 className="mt-2 text-xl leading-snug font-medium text-balance sm:text-2xl">
          {question.prompt}
        </h3>

        <div className="mt-6 flex gap-3 rounded-xl border border-border bg-surface/70 p-4">
          <Lightbulb
            className="mt-0.5 size-4 shrink-0 text-warning"
            aria-hidden="true"
          />

          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">
              {t.hint}
            </p>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {question.hint}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-8 lg:col-span-3">
        <div className="flex items-center justify-between">
          <label htmlFor="student-answer" className="text-sm font-medium">
            {t.yourAnswer}
          </label>

          <span className="font-mono text-xs text-muted-foreground">
            {wordCount} {t.word}
          </span>
        </div>

        <Textarea
          ref={ref}
          id="student-answer"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAnalyzing}
          placeholder={t.placeholder}
          className="mt-3 min-h-52 flex-1 resize-none rounded-xl border-border bg-background/60 p-4 text-base leading-relaxed placeholder:text-muted-foreground/70 focus-visible:border-primary/60 md:text-sm"
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {t.demo}
          </span>

          <button
            type="button"
            disabled={isAnalyzing}
            onClick={() => onAnswerChange(question.sampleAnswers.strong)}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-success/50 hover:text-success disabled:opacity-50"
          >
            {t.strong}
          </button>

          <button
            type="button"
            disabled={isAnalyzing}
            onClick={() => onAnswerChange(question.sampleAnswers.weak)}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-warning/50 hover:text-warning disabled:opacity-50"
          >
            {t.weak}
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">
              Ctrl
            </kbd>{' '}
            +{' '}
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">
              Enter
            </kbd>{' '}
            {t.shortcut}
          </p>

          <Button
            onClick={onAnalyze}
            disabled={!answer.trim() || isAnalyzing}
            className="h-11 gap-2 rounded-xl px-6 text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90"
          >
            {isAnalyzing ? (
              <>
                <Loader2
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
                {t.analyzing}
              </>
            ) : (
              <>
                <Sparkles className="size-4" aria-hidden="true" />
                {t.analyze}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
})
