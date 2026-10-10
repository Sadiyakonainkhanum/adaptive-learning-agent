
'use client'

import { Fragment } from 'react'
import {
  BookOpen,
  Brain,
  Check,
  FileText,
  GitBranch,
  Radar,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AnalysisResult } from '@/lib/adaptive/types'
import type { SessionStatus } from '@/hooks/use-adaptive-session'
import type { Language } from '@/lib/adaptive/i18n'

type StageState = 'idle' | 'active' | 'done'

interface Stage {
  key: string
  title: string
  role: string
  icon: LucideIcon
  idleText: string
  activeText: string
  output: (result: AnalysisResult | null, wordCount: number) => string
  trace: (result: AnalysisResult | null, wordCount: number) => string
}

const pct = (n: number) => `${Math.round(n * 100)}%`

const flowText: Record<Language, Record<string, string>> = {
  en: {
    engine: 'Adaptive engine',
    processing: 'Processing',
    adapted: 'Path adapted',
    idle: 'Idle',
    answer: 'Student Answer',
    input: 'Input capture',
    awaiting: 'Awaiting response',
    tokenizing: 'Tokenizing reasoning…',
    agnes: 'Agnes Analysis',
    comprehension: 'Comprehension model',
    standing: 'Standing by',
    mapping: 'Mapping concepts…',
    jeff: 'Jeff Decision',
    pedagogy: 'Pedagogy policy',
    selecting: 'Selecting strategy…',
    gap: 'Gap Prediction',
    forecast: 'Forecast model',
    forecasting: 'Forecasting risk…',
    lesson: 'Adaptive Lesson',
    generator: 'Content generator',
    composing: 'Composing lesson…',
    complete: 'Complete',
    captured: 'words captured',
    confidence: 'confidence',
    trace: 'Engine trace',
    ready: 'Engine ready — submit an answer to begin adaptation',
  },
  kn: {
    engine: 'ಹೊಂದಾಣಿಕೆಯ ಎಂಜಿನ್',
    processing: 'ಪ್ರಕ್ರಿಯೆ ನಡೆಯುತ್ತಿದೆ',
    adapted: 'ಕಲಿಕೆಯ ಹಾದಿ ಹೊಂದಿಸಲಾಗಿದೆ',
    idle: 'ನಿಷ್ಕ್ರಿಯ',
    answer: 'ವಿದ್ಯಾರ್ಥಿಯ ಉತ್ತರ',
    input: 'ಉತ್ತರ ಸ್ವೀಕರಿಸುವಿಕೆ',
    awaiting: 'ಉತ್ತರಕ್ಕಾಗಿ ಕಾಯುತ್ತಿದೆ',
    tokenizing: 'ಆಲೋಚನೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ…',
    agnes: 'Agnes ವಿಶ್ಲೇಷಣೆ',
    comprehension: 'ಅರ್ಥಗ್ರಹಿಕೆ ಮಾದರಿ',
    standing: 'ಸಿದ್ಧವಾಗಿದೆ',
    mapping: 'ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ…',
    jeff: 'Jeff ನಿರ್ಧಾರ',
    pedagogy: 'ಬೋಧನಾ ನೀತಿ',
    selecting: 'ತಂತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗುತ್ತಿದೆ…',
    gap: 'ಕಲಿಕಾ ಕೊರತೆಯ ಮುನ್ಸೂಚನೆ',
    forecast: 'ಮುನ್ಸೂಚನೆ ಮಾದರಿ',
    forecasting: 'ಅಪಾಯವನ್ನು ಊಹಿಸಲಾಗುತ್ತಿದೆ…',
    lesson: 'ಹೊಂದಾಣಿಕೆಯ ಪಾಠ',
    generator: 'ವಿಷಯ ರಚನೆ',
    composing: 'ಪಾಠವನ್ನು ರಚಿಸಲಾಗುತ್ತಿದೆ…',
    complete: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    captured: 'ಪದಗಳನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    confidence: 'ವಿಶ್ವಾಸಮಟ್ಟ',
    trace: 'ಎಂಜಿನ್ ಪ್ರಕ್ರಿಯೆ ವಿವರ',
    ready: 'ಎಂಜಿನ್ ಸಿದ್ಧವಾಗಿದೆ — ಹೊಂದಾಣಿಕೆ ಪ್ರಾರಂಭಿಸಲು ಉತ್ತರಿಸಿ',
  },
  hi: {
    engine: 'अनुकूली इंजन',
    processing: 'प्रक्रिया जारी है',
    adapted: 'सीखने का मार्ग अनुकूलित',
    idle: 'निष्क्रिय',
    answer: 'विद्यार्थी का उत्तर',
    input: 'इनपुट प्राप्त करना',
    awaiting: 'उत्तर की प्रतीक्षा है',
    tokenizing: 'तर्क का विश्लेषण हो रहा है…',
    agnes: 'Agnes का विश्लेषण',
    comprehension: 'समझ का मॉडल',
    standing: 'तैयार है',
    mapping: 'अवधारणाओं की पहचान हो रही है…',
    jeff: 'Jeff का निर्णय',
    pedagogy: 'शिक्षण नीति',
    selecting: 'रणनीति चुनी जा रही है…',
    gap: 'सीखने की कमी का अनुमान',
    forecast: 'पूर्वानुमान मॉडल',
    forecasting: 'जोखिम का अनुमान हो रहा है…',
    lesson: 'अनुकूलित पाठ',
    generator: 'सामग्री निर्माण',
    composing: 'पाठ तैयार हो रहा है…',
    complete: 'पूरा हुआ',
    captured: 'शब्द प्राप्त हुए',
    confidence: 'विश्वास स्तर',
    trace: 'इंजन गतिविधि',
    ready: 'इंजन तैयार है — अनुकूलन शुरू करने के लिए उत्तर दें',
  },
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

interface DecisionFlowProps {
  status: SessionStatus
  completedStages: number
  result: AnalysisResult | null
  wordCount: number
  language: Language
}

export function DecisionFlow({
  status,
  completedStages,
  result,
  wordCount,
  language,
}: DecisionFlowProps) {
  const t = flowText[language]

  const stages: Stage[] = [
    {
      key: 'answer',
      title: t.answer,
      role: t.input,
      icon: FileText,
      idleText: t.awaiting,
      activeText: t.tokenizing,
      output: (_, words) => `${words} ${t.captured}`,
      trace: (_, words) => `input.capture(words=${words})`,
    },
    {
      key: 'agnes',
      title: t.agnes,
      role: t.comprehension,
      icon: Brain,
      idleText: t.standing,
      activeText: t.mapping,
      output: (r) =>
        r
          ? `${capitalize(r.understanding)} · ${pct(r.confidence)} ${t.confidence}`
          : t.complete,
      trace: (r) =>
        r
          ? `agnes.analyze() → understanding=${r.understanding} conf=${r.confidence}`
          : 'agnes.analyze()',
    },
    {
      key: 'jeff',
      title: t.jeff,
      role: t.pedagogy,
      icon: GitBranch,
      idleText: t.standing,
      activeText: t.selecting,
      output: (r) => r?.decision.label ?? t.complete,
      trace: (r) =>
        r
          ? `jeff.decide() → action=${r.decision.action}`
          : 'jeff.decide()',
    },
    {
      key: 'gap',
      title: t.gap,
      role: t.forecast,
      icon: Radar,
      idleText: t.standing,
      activeText: t.forecasting,
      output: (r) =>
        r
          ? `${r.predictedGap.concept} · ${pct(r.predictedGap.probability)}`
          : t.complete,
      trace: (r) =>
        r
          ? `gap.predict() → "${r.predictedGap.concept}" p=${r.predictedGap.probability}`
          : 'gap.predict()',
    },
    {
      key: 'lesson',
      title: t.lesson,
      role: t.generator,
      icon: BookOpen,
      idleText: t.standing,
      activeText: t.composing,
      output: (r) => r?.lesson.title ?? t.complete,
      trace: (r) =>
        r
          ? `lesson.generate() → "${r.lesson.title}"`
          : 'lesson.generate()',
    },
  ]

  const getState = (index: number): StageState => {
    if (index < completedStages) return 'done'
    if (status === 'analyzing' && index === completedStages) return 'active'
    return 'idle'
  }

  const statusLabel =
    status === 'analyzing'
      ? t.processing
      : status === 'complete'
        ? t.adapted
        : t.idle

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'size-2 rounded-full',
              status === 'analyzing' && 'animate-soft-pulse bg-primary',
              status === 'complete' && 'bg-success',
              (status === 'idle' || status === 'error') &&
                'bg-muted-foreground/50',
            )}
            aria-hidden="true"
          />
          <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            {t.engine}
          </span>
        </div>

        <span
          className="font-mono text-xs text-muted-foreground"
          aria-live="polite"
        >
          {statusLabel} · {completedStages}/{stages.length}
        </span>
      </div>

      <ol className="flex flex-col p-5 sm:p-6 lg:flex-row lg:items-stretch">
        {stages.map((stage, index) => {
          const state = getState(index)

          return (
            <Fragment key={stage.key}>
              {index > 0 && (
                <Connector
                  filled={index <= completedStages}
                  active={getState(index) === 'active'}
                />
              )}

              <FlowNode
                stage={stage}
                index={index}
                state={state}
                text={
                  state === 'done'
                    ? stage.output(result, wordCount)
                    : state === 'active'
                      ? stage.activeText
                      : stage.idleText
                }
              />
            </Fragment>
          )
        })}
      </ol>

      <div className="border-t border-border bg-background/40 px-5 py-4 sm:px-6">
        <p className="sr-only">{t.trace}</p>

        <div
          className="min-h-[1.5rem] space-y-1 font-mono text-xs"
          aria-live="polite"
        >
          {completedStages === 0 && status !== 'analyzing' && (
            <p className="text-muted-foreground">
              <span className="text-accent">$</span> {t.ready}
            </p>
          )}

          {stages.slice(0, completedStages).map((stage) => (
            <p
              key={stage.key}
              className="animate-fade-up truncate text-muted-foreground"
            >
              <Check
                className="mr-1.5 inline size-3 text-success"
                aria-hidden="true"
              />
              {stage.trace(result, wordCount)}
            </p>
          ))}

          {status === 'analyzing' && completedStages < stages.length && (
            <p className="text-primary">
              <span
                className="mr-1 inline-block h-3 w-1.5 animate-pulse bg-primary align-middle"
                aria-hidden="true"
              />
              {stages[completedStages].activeText}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function FlowNode({
  stage,
  index,
  state,
  text,
}: {
  stage: Stage
  index: number
  state: StageState
  text: string
}) {
  const Icon = stage.icon

  return (
    <li
      className={cn(
        'relative flex flex-1 items-center gap-4 rounded-2xl border p-4 transition-all duration-500 lg:flex-col lg:items-start lg:gap-3',
        state === 'idle' && 'border-border bg-surface/40',
        state === 'active' &&
          'border-primary/60 bg-primary/10 shadow-lg shadow-primary/20',
        state === 'done' && 'border-success/30 bg-success/5',
      )}
      aria-current={state === 'active' ? 'step' : undefined}
    >
      <div className="relative shrink-0">
        {state === 'active' && (
          <span
            className="absolute -inset-1.5 animate-spin rounded-xl border-2 border-transparent border-t-primary [animation-duration:1.2s]"
            aria-hidden="true"
          />
        )}

        <span
          className={cn(
            'flex size-10 items-center justify-center rounded-xl transition-colors duration-500',
            state === 'idle' && 'bg-secondary text-muted-foreground',
            state === 'active' && 'bg-primary text-primary-foreground',
            state === 'done' && 'bg-success/15 text-success',
          )}
        >
          {state === 'done' ? (
            <Check className="size-5" aria-hidden="true" />
          ) : (
            <Icon className="size-5" aria-hidden="true" />
          )}
        </span>
      </div>

      <div className="min-w-0">
        <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          0{index + 1} · {stage.role}
        </p>

        <p className="mt-0.5 text-sm font-semibold">{stage.title}</p>

        <p
          className={cn(
            'mt-1 text-xs leading-relaxed text-pretty',
            state === 'done' ? 'text-foreground/80' : 'text-muted-foreground',
            state === 'active' && 'text-primary',
          )}
        >
          {text}
        </p>
      </div>
    </li>
  )
}

function Connector({
  filled,
  active,
}: {
  filled: boolean
  active: boolean
}) {
  return (
    <li
      aria-hidden="true"
      className="relative mx-auto h-6 w-px shrink-0 overflow-hidden bg-border lg:mx-0 lg:h-px lg:w-8 lg:self-center"
    >
      <span
        className={cn(
          'absolute inset-0 origin-top bg-gradient-to-b from-success to-success/60 transition-transform duration-500 lg:origin-left lg:bg-gradient-to-r',
          filled ? 'scale-100' : 'scale-y-0 lg:scale-x-0 lg:scale-y-100',
        )}
      />

      {active && <span className="beam-line absolute inset-0 animate-beam" />}
    </li>
  )
}
