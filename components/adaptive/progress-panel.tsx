
'use client'

import { AlertTriangle, Award, Flame, Repeat, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { LearningProgress } from '@/lib/adaptive/types'
import type { Language } from '@/lib/adaptive/i18n'

const progressText: Record<Language, Record<string, string>> = {
  en: {
    attempts: 'Attempts',
    analyzed: 'Answers analyzed this session',
    mastered: 'Concepts mastered',
    latest: 'Latest',
    weak: 'Weak concepts',
    noWeak: 'No active weak spots',
    streak: 'Learning streak',
    days: 'days',
  },
  kn: {
    attempts: 'ಪ್ರಯತ್ನಗಳು',
    analyzed: 'ಈ ಅವಧಿಯಲ್ಲಿ ವಿಶ್ಲೇಷಿಸಿದ ಉತ್ತರಗಳು',
    mastered: 'ಪೂರ್ಣವಾಗಿ ಕಲಿತ ಪರಿಕಲ್ಪನೆಗಳು',
    latest: 'ಇತ್ತೀಚಿನದು',
    weak: 'ಕಷ್ಟಕರ ಪರಿಕಲ್ಪನೆಗಳು',
    noWeak: 'ಪ್ರಸ್ತುತ ಯಾವುದೇ ದುರ್ಬಲ ಅಂಶಗಳಿಲ್ಲ',
    streak: 'ನಿರಂತರ ಕಲಿಕೆ',
    days: 'ದಿನಗಳು',
  },
  hi: {
    attempts: 'प्रयास',
    analyzed: 'इस सत्र में विश्लेषित उत्तर',
    mastered: 'सीखी गई अवधारणाएँ',
    latest: 'नवीनतम',
    weak: 'कमज़ोर अवधारणाएँ',
    noWeak: 'अभी कोई कमज़ोर विषय नहीं',
    streak: 'लगातार सीखने का क्रम',
    days: 'दिन',
  },
}

export function ProgressPanel({
  progress,
  language = 'en',
}: {
  progress: LearningProgress
  language?: Language
}) {
  const t = progressText[language]
  const masteredConcepts = progress.path
  .filter((node) => node.status === 'mastered')
  .map((node) => node.label)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Repeat}
        label={t.attempts}
        tone="text-primary bg-primary/15"
      >
        <StatValue>{progress.attempts}</StatValue>
        <p className="text-xs text-muted-foreground">{t.analyzed}</p>
      </StatCard>

      <StatCard
        icon={Award}
        label={t.mastered}
        tone="text-success bg-success/15"
      >
      <StatValue>
        {masteredConcepts.length}
        <span className="text-base font-normal text-muted-foreground">
          /{progress.path.length}
        </span>
      </StatValue>
      <p className="truncate text-xs text-muted-foreground">
        {t.latest}: {masteredConcepts.at(-1) ?? '—'}
      </p>
      </StatCard>

      <StatCard
        icon={AlertTriangle}
        label={t.weak}
        tone="text-warning bg-warning/15"
      >
        {progress.weakConcepts.length === 0 ? (
          <>
            <StatValue>0</StatValue>
            <p className="text-xs text-muted-foreground">{t.noWeak}</p>
          </>
        ) : (
          <ul className="flex flex-wrap gap-1.5">
            {progress.weakConcepts.map((concept) => (
              <li
                key={concept}
                className="rounded-md border border-warning/30 bg-warning/10 px-2 py-0.5 text-xs text-warning"
              >
                {concept}
              </li>
            ))}
          </ul>
        )}
      </StatCard>

      <StatCard
        icon={Flame}
        label={t.streak}
        tone="text-destructive bg-destructive/15"
      >
        <StatValue>
          {progress.streakDays}
          <span className="text-base font-normal text-muted-foreground">
            {' '}{t.days}
          </span>
        </StatValue>
        <div className="flex gap-1" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                i < progress.streakDays
                  ? 'bg-destructive/80'
                  : 'bg-secondary'
              }`}
            />
          ))}
        </div>
      </StatCard>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  tone,
  children,
}: {
  icon: LucideIcon
  label: string
  tone: string
  children: ReactNode
}) {
  return (
    <article className="glass flex flex-col gap-3 rounded-2xl p-5 transition-colors hover:border-primary/30">
      <header className="flex items-center gap-2.5">
        <span className={`flex size-8 items-center justify-center rounded-lg ${tone}`}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <h3 className="text-sm text-muted-foreground">{label}</h3>
      </header>
      {children}
    </article>
  )
}

function StatValue({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-3xl font-semibold tracking-tight tabular-nums">
      {children}
    </p>
  )
}
