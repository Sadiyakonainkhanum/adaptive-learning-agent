
'use client'

import { Check, Radar } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LearningProgress, PathNodeStatus } from '@/lib/adaptive/types'
import type { Language } from '@/lib/adaptive/i18n'

const pathText: Record<Language, Record<string, string>> = {
  en: {
    mastered: 'Mastered',
    current: 'In progress',
    atRisk: 'Needs reinforcement',
    upcoming: 'Upcoming',
    module: 'Module',
    moduleName: 'Recursion Foundations',
    conceptsMastered: 'concepts mastered',
    of: 'of',
    currentLegend: 'Current',
    atRiskLegend: 'At risk',
    predictedGap: 'Predicted gap',
    moduleMastery: 'Module mastery',
  },
  kn: {
    mastered: 'ಪೂರ್ಣವಾಗಿ ಕಲಿತಿದೆ',
    current: 'ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    atRisk: 'ಮರುಅಭ್ಯಾಸ ಅಗತ್ಯ',
    upcoming: 'ಮುಂದಿನದು',
    module: 'ವಿಭಾಗ',
    moduleName: 'ಪುನರಾವರ್ತನೆಯ ಮೂಲಭೂತಗಳು',
    conceptsMastered: 'ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಕಲಿತಿದೆ',
    of: 'ರಲ್ಲಿ',
    currentLegend: 'ಪ್ರಸ್ತುತ',
    atRiskLegend: 'ಅಪಾಯದಲ್ಲಿದೆ',
    predictedGap: 'ಊಹಿಸಲಾದ ಕಲಿಕಾ ಕೊರತೆ',
    moduleMastery: 'ವಿಭಾಗದ ಕಲಿಕಾ ಪ್ರಗತಿ',
  },
  hi: {
    mastered: 'सीख लिया',
    current: 'प्रगति में',
    atRisk: 'दोबारा अभ्यास ज़रूरी',
    upcoming: 'आगामी',
    module: 'मॉड्यूल',
    moduleName: 'रिकर्शन की बुनियाद',
    conceptsMastered: 'अवधारणाएँ सीखी गईं',
    of: 'में से',
    currentLegend: 'वर्तमान',
    atRiskLegend: 'जोखिम में',
    predictedGap: 'अनुमानित सीखने की कमी',
    moduleMastery: 'मॉड्यूल में सीखने की प्रगति',
  },
}

const statusKey: Record<PathNodeStatus, string> = {
  mastered: 'mastered',
  current: 'current',
  'at-risk': 'atRisk',
  upcoming: 'upcoming',
}

export function LearningPathTracker({
  progress,
  language = 'en',
}: {
  progress: LearningProgress
  language?: Language
}) {
  const t = pathText[language]

  const masteredCount = progress.path.filter(
    (node) => node.status === 'mastered',
  ).length

  const percent =
    progress.path.length === 0
      ? 0
      : Math.round((masteredCount / progress.path.length) * 100)

  return (
    <div className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {t.module} · {t.moduleName}
          </p>
          <p className="mt-1 text-lg font-semibold">
            {masteredCount} {t.of} {progress.path.length}{' '}
            {t.conceptsMastered}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <Legend className="bg-success" label={t.mastered} />
          <Legend className="bg-primary" label={t.currentLegend} />
          <Legend className="bg-warning" label={t.atRiskLegend} />
          <Legend
            className="border border-dashed border-warning bg-transparent"
            label={t.predictedGap}
          />
        </div>
      </div>

      <div
        className="mt-5 h-2 overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-label={t.moduleMastery}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-success via-primary to-accent transition-[width] duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7 lg:gap-0">
        {progress.path.map((node, i) => (
          <li
            key={node.id}
            className="relative flex items-center gap-3 lg:flex-col lg:text-center"
          >
            {i > 0 && (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-4 right-1/2 hidden h-px w-full -translate-y-1/2 lg:block',
                  node.status === 'upcoming'
                    ? 'bg-border'
                    : 'bg-primary/50',
                )}
              />
            )}

            <span
              className={cn(
                'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500',
                node.status === 'mastered' &&
                  'border-success bg-success text-success-foreground',
                node.status === 'current' &&
                  'border-primary bg-background text-primary shadow-lg shadow-primary/40',
                node.status === 'at-risk' &&
                  'border-warning bg-warning/15 text-warning',
                node.status === 'upcoming' &&
                  'border-border bg-background text-muted-foreground',
                node.predictedGap &&
                  'ring-2 ring-warning/60 ring-offset-2 ring-offset-background',
              )}
            >
              {node.status === 'mastered' ? (
                <Check className="size-4" aria-hidden="true" />
              ) : node.predictedGap ? (
                <Radar className="size-3.5 text-warning" aria-hidden="true" />
              ) : (
                <span className="font-mono text-xs">{i + 1}</span>
              )}
            </span>

            <div className="lg:mt-3 lg:px-1">
              <p className="text-sm font-medium">{node.label}</p>
              <p
                className={cn(
                  'text-xs',
                  node.status === 'at-risk'
                    ? 'text-warning'
                    : 'text-muted-foreground',
                )}
              >
                {node.predictedGap && node.status !== 'mastered'
                  ? t.predictedGap
                  : t[statusKey[node.status]]}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Legend({
  className,
  label,
}: {
  className: string
  label: string
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={cn('size-2.5 rounded-full', className)}
        aria-hidden="true"
      />
      {label}
    </span>
  )
}
