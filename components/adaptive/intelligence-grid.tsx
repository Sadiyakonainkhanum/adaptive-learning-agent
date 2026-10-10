
'use client'

import type { ReactNode } from 'react'
import {
  Brain,
  GitBranch,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Target,
  Library,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type {
  AnalysisResult,
  Severity,
  Understanding,
} from '@/lib/adaptive/types'
import type { Language } from '@/lib/adaptive/i18n'

const gridText: Record<Language, Record<string, string>> = {
  en: {
    good: 'Good',
    partial: 'Partial',
    poor: 'Poor',
    understanding: 'Estimated Understanding',
    confidence: 'Heuristic signal score',
    scoreNote: 'Rule-based demo score — not calibrated AI confidence.',
    detected: 'Detected concepts',
    decision: "Jeff's Decision",
    strategy: 'Strategy',
    gap: 'Current Learning Gap',
    severity: 'severity',
    predicted: 'Demo Gap Prediction',
    likelihood: 'Illustrative likelihood',
    predictionNote: 'Demo estimate only; not a validated forecast.',
    horizon: 'Demo horizon',
    validation: 'Rule-Based Checks',
    agreement: 'Agreement',
    conflict: 'Conflict',
    validationNote:
      'Uses the mock engine checks. This is not independent AI verification.',
    trusted: 'Reference Knowledge',
    knowledgeBase: 'Learning reference',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    advance: 'Advance',
    reinforce: 'Reinforce',
    remediate: 'Remediate',
  },
  kn: {
    good: 'ಉತ್ತಮ',
    partial: 'ಭಾಗಶಃ',
    poor: 'ಕಡಿಮೆ',
    understanding: 'ಅಂದಾಜಿನ ಅರ್ಥಗ್ರಹಿಕೆ',
    confidence: 'ನಿಯಮಾಧಾರಿತ ಸೂಚಕ ಅಂಕ',
    scoreNote: 'ಡೆಮೊ ಅಂಕ ಮಾತ್ರ; ಪರಿಶೀಲಿತ AI ವಿಶ್ವಾಸಮಟ್ಟವಲ್ಲ.',
    detected: 'ಗುರುತಿಸಿದ ಪರಿಕಲ್ಪನೆಗಳು',
    decision: 'Jeff ನಿರ್ಧಾರ',
    strategy: 'ತಂತ್ರ',
    gap: 'ಪ್ರಸ್ತುತ ಕಲಿಕಾ ಕೊರತೆ',
    severity: 'ತೀವ್ರತೆ',
    predicted: 'ಡೆಮೊ ಕಲಿಕಾ ಕೊರತೆಯ ಅಂದಾಜು',
    likelihood: 'ಸೂಚಕ ಸಾಧ್ಯತೆ',
    predictionNote: 'ಡೆಮೊ ಅಂದಾಜು ಮಾತ್ರ; ದೃಢೀಕೃತ ಮುನ್ಸೂಚನೆಯಲ್ಲ.',
    horizon: 'ಡೆಮೊ ಅವಧಿ',
    validation: 'ನಿಯಮಾಧಾರಿತ ಪರಿಶೀಲನೆ',
    agreement: 'ಹೊಂದಾಣಿಕೆ',
    conflict: 'ವಿರೋಧಾಭಾಸ',
    validationNote:
      'ಮಾಕ್ ಎಂಜಿನ್ ಪರಿಶೀಲನೆಗಳನ್ನು ಬಳಸುತ್ತದೆ; ಸ್ವತಂತ್ರ AI ಪರಿಶೀಲನೆಯಲ್ಲ.',
    trusted: 'ಉಲ್ಲೇಖ ಜ್ಞಾನ',
    knowledgeBase: 'ಕಲಿಕಾ ಉಲ್ಲೇಖ',
    low: 'ಕಡಿಮೆ',
    medium: 'ಮಧ್ಯಮ',
    high: 'ಹೆಚ್ಚು',
    advance: 'ಮುಂದುವರಿಸಿ',
    reinforce: 'ಮರುಅಭ್ಯಾಸ',
    remediate: 'ಮೂಲಭೂತ ಕಲಿಕೆ',
  },
  hi: {
    good: 'अच्छा',
    partial: 'आंशिक',
    poor: 'कमज़ोर',
    understanding: 'अनुमानित समझ',
    confidence: 'नियम-आधारित संकेत स्कोर',
    scoreNote: 'केवल डेमो स्कोर; प्रमाणित AI विश्वास स्तर नहीं।',
    detected: 'पहचानी गई अवधारणाएँ',
    decision: 'Jeff का निर्णय',
    strategy: 'रणनीति',
    gap: 'वर्तमान सीखने की कमी',
    severity: 'गंभीरता',
    predicted: 'डेमो सीखने की कमी का अनुमान',
    likelihood: 'संकेतात्मक संभावना',
    predictionNote: 'केवल डेमो अनुमान; सत्यापित पूर्वानुमान नहीं।',
    horizon: 'डेमो अवधि',
    validation: 'नियम-आधारित जाँच',
    agreement: 'सहमति',
    conflict: 'विरोध',
    validationNote:
      'मॉक इंजन की जाँच का उपयोग होता है; यह स्वतंत्र AI सत्यापन नहीं है।',
    trusted: 'संदर्भ ज्ञान',
    knowledgeBase: 'सीखने का संदर्भ',
    low: 'कम',
    medium: 'मध्यम',
    high: 'अधिक',
    advance: 'आगे बढ़ें',
    reinforce: 'दोबारा अभ्यास',
    remediate: 'बुनियादी सुधार',
  },
}

const understandingKey: Record<Understanding, string> = {
  good: 'good',
  partial: 'partial',
  poor: 'poor',
}

const severityStyles: Record<Severity, string> = {
  low: 'border-success/30 bg-success/10 text-success',
  medium: 'border-warning/30 bg-warning/10 text-warning',
  high: 'border-destructive/30 bg-destructive/10 text-destructive',
}

const actionStyles = {
  advance: 'text-success',
  reinforce: 'text-warning',
  remediate: 'text-destructive',
}

export function IntelligenceGrid({
  result,
  language = 'en',
}: {
  result: AnalysisResult
  language?: Language
}) {
  const t = gridText[language]
  const understanding = {
    label: t[understandingKey[result.understanding]],
    className:
      result.understanding === 'good'
        ? 'text-success'
        : result.understanding === 'partial'
          ? 'text-warning'
          : 'text-destructive',
  }

  const isAgreement = result.validation.status === 'agreement'

  const severityLabel: Record<Severity, string> = {
    low: t.low,
    medium: t.medium,
    high: t.high,
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <InsightCard
        icon={Brain}
        label={t.understanding}
        agent="Agnes · Demo"
        delay={0}
      >
        <p
          className={cn(
            'text-3xl font-semibold tracking-tight',
            understanding.className,
          )}
        >
          {understanding.label}
        </p>

        <Meter
          value={result.confidence}
          label={t.confidence}
          tone="primary"
        />

        <p className="text-xs leading-relaxed text-muted-foreground">
          {t.scoreNote}
        </p>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {result.agnes.summary}
        </p>

        {result.agnes.detectedConcepts.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label={t.detected}>
            {result.agnes.detectedConcepts.map((concept) => (
              <li
                key={concept}
                className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-foreground/80"
              >
                {concept}
              </li>
            ))}
          </ul>
        )}
      </InsightCard>

      <InsightCard
        icon={GitBranch}
        label={t.decision}
        agent="Jeff · Decision"
        delay={60}
      >
        <p
          className={cn(
            'text-xl font-semibold tracking-tight',
            actionStyles[result.decision.action],
          )}
        >
          {t[result.decision.action] ?? result.decision.label}
        </p>

        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {t.strategy}: {t[result.decision.action] ?? result.decision.action}
        </p>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {result.decision.rationale}
        </p>
      </InsightCard>

      <InsightCard
        icon={Target}
        label={t.gap}
        agent="Demo Analysis"
        delay={120}
      >
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xl font-semibold tracking-tight">
            {result.currentGap.concept}
          </p>

          <span
            className={cn(
              'rounded-full border px-2 py-0.5 text-[11px] font-medium',
              severityStyles[result.currentGap.severity],
            )}
          >
            {severityLabel[result.currentGap.severity]} {t.severity}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {result.currentGap.description}
        </p>
      </InsightCard>

      <InsightCard
        icon={Radar}
        label={t.predicted}
        agent="Static Demo"
        delay={180}
        highlight
      >
        <p className="text-xl font-semibold tracking-tight">
          {result.predictedGap.concept}
        </p>

        <Meter
          value={result.predictedGap.probability}
          label={t.likelihood}
          tone="warning"
        />

        <p className="text-xs leading-relaxed text-muted-foreground">
          {t.predictionNote}
        </p>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {result.predictedGap.description}
        </p>

        <p className="font-mono text-xs text-muted-foreground">
          {t.horizon} · {result.predictedGap.horizon}
        </p>
      </InsightCard>

      <InsightCard
        icon={isAgreement ? ShieldCheck : ShieldAlert}
        label={t.validation}
        agent="Mock Checks"
        delay={240}
      >
        <p
          className={cn(
            'inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1 text-lg font-semibold',
            isAgreement
              ? 'bg-success/10 text-success'
              : 'bg-destructive/10 text-destructive',
          )}
        >
          {isAgreement ? t.agreement : t.conflict}
        </p>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {result.validation.detail}
        </p>

        <p className="text-xs leading-relaxed text-muted-foreground">
          {t.validationNote}
        </p>
      </InsightCard>

      <InsightCard
        icon={Library}
        label={t.trusted}
        agent={t.knowledgeBase}
        delay={300}
      >
        <blockquote className="border-l-2 border-accent/60 pl-3 text-sm leading-relaxed text-foreground/90">
          {result.trustedKnowledge.statement}
        </blockquote>

        <p className="font-mono text-xs text-accent">
          {result.trustedKnowledge.source}
        </p>
      </InsightCard>
    </div>
  )
}

function InsightCard({
  icon: Icon,
  label,
  agent,
  delay,
  highlight,
  children,
}: {
  icon: LucideIcon
  label: string
  agent: string
  delay: number
  highlight?: boolean
  children: ReactNode
}) {
  return (
    <article
      className={cn(
        'glass group flex animate-fade-up flex-col gap-3 rounded-2xl p-5 transition-colors duration-300 hover:border-primary/40',
        highlight && 'border-warning/30',
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
            <Icon className="size-4" aria-hidden="true" />
          </span>

          <h3 className="text-sm font-medium text-muted-foreground">
            {label}
          </h3>
        </div>

        <span className="font-mono text-[10px] tracking-wider text-muted-foreground/80 uppercase">
          {agent}
        </span>
      </header>

      {children}
    </article>
  )
}

function Meter({
  value,
  label,
  tone,
}: {
  value: number
  label: string
  tone: 'primary' | 'warning'
}) {
  const percent = Math.max(0, Math.min(100, Math.round(value * 100)))

  return (
    <div>
      <div className="flex justify-between gap-2 text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono">{percent}%</span>
      </div>

      <div
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary"
        role="meter"
        aria-label={label}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-700 ease-out',
            tone === 'primary'
              ? 'bg-gradient-to-r from-primary to-accent'
              : 'bg-warning',
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
