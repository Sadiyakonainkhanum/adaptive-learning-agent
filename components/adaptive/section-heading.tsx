import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
  id?: string
}

export function SectionHeading({ eyebrow, title, description, action, id }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
        <h2 id={id} className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
