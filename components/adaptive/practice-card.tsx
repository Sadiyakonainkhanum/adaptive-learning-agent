'use client'

import { useState } from 'react'
import { CheckCircle2, PenLine, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PracticeQuestion } from '@/lib/adaptive/types'

export function PracticeCard({ practice }: { practice: PracticeQuestion }) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const isCorrect = selected === practice.correctIndex

  return (
    <section
      aria-labelledby="practice-title"
      className="glass animate-fade-up rounded-3xl p-6 [animation-delay:120ms]"
    >
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-warning/15 text-warning">
          <PenLine className="size-4" aria-hidden="true" />
        </span>
        <p className="text-xs font-medium tracking-wider text-warning uppercase">Practice recommended</p>
      </div>
      <h3 id="practice-title" className="mt-4 leading-snug font-medium text-pretty">
        {practice.prompt}
      </h3>
      <div role="radiogroup" aria-labelledby="practice-title" className="mt-4 space-y-2">
        {practice.options.map((option, i) => {
          const isSelected = selected === i
          const isAnswer = i === practice.correctIndex
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                !answered && 'border-border bg-surface/50 hover:border-primary/50 hover:bg-primary/5',
                answered && isAnswer && 'border-success/50 bg-success/10 text-foreground',
                answered && isSelected && !isAnswer && 'border-destructive/50 bg-destructive/10',
                answered && !isSelected && !isAnswer && 'border-border opacity-60',
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border font-mono text-xs text-muted-foreground">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{option}</span>
              {answered && isAnswer && <CheckCircle2 className="size-4 text-success" aria-hidden="true" />}
              {answered && isSelected && !isAnswer && (
                <XCircle className="size-4 text-destructive" aria-hidden="true" />
              )}
            </button>
          )
        })}
      </div>
      {answered && (
        <p
          role="status"
          className={cn('mt-4 animate-fade-up text-sm leading-relaxed', isCorrect ? 'text-success' : 'text-warning')}
        >
          <span className="font-semibold">{isCorrect ? 'Correct. ' : 'Not quite. '}</span>
          <span className="text-muted-foreground">{practice.explanation}</span>
        </p>
      )}
    </section>
  )
}
