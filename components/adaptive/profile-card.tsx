
'use client'

import type { StudentProfile } from '@/lib/adaptive/types'
import type { Language } from '@/lib/adaptive/i18n'

const profileText: Record<Language, Record<string, string>> = {
  en: {
    learningStyle: 'Learning style',
    currentGoal: 'Current goal',
  },
  kn: {
    learningStyle: 'ಕಲಿಕೆಯ ಶೈಲಿ',
    currentGoal: 'ಪ್ರಸ್ತುತ ಗುರಿ',
  },
  hi: {
    learningStyle: 'सीखने की शैली',
    currentGoal: 'वर्तमान लक्ष्य',
  },
}

export function ProfileCard({
  profile,
  language = 'en',
}: {
  profile: StudentProfile
  language?: Language
}) {
  const t = profileText[language]

  const details = [
    [t.learningStyle, profile.learningStyle],
    [t.currentGoal, profile.goal],
  ]

  return (
    <section
      id="profile"
      aria-labelledby="profile-title"
      className="glass flex scroll-mt-24 flex-col gap-6 rounded-3xl p-6 sm:flex-row sm:items-center sm:p-8"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-semibold text-primary-foreground">
          {profile.initials}
        </span>

        <div>
          <h3 id="profile-title" className="text-lg font-semibold">
            {profile.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {profile.program}
          </p>
        </div>
      </div>

      <dl className="grid flex-1 gap-4 sm:grid-cols-2 sm:border-l sm:border-border sm:pl-6">
        {details.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="mt-0.5 text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
