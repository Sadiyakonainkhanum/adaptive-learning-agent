
'use client'

import { useState } from 'react'
import { Menu, Waypoints, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StudentProfile } from '@/lib/adaptive/types'
import type { Language } from '@/lib/adaptive/i18n'

interface SiteHeaderProps {
  profile: StudentProfile
  language: Language
  onLanguageChange: (language: Language) => void
}

const navItems = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Learning Path', href: '#learning-path' },
  { label: 'Progress', href: '#progress' },
  { label: 'Profile', href: '#profile' },
]

const navTranslations: Record<Language, Record<string, string>> = {
  en: {
    Dashboard: 'Dashboard',
    'Learning Path': 'Learning Path',
    Progress: 'Progress',
    Profile: 'Profile',
  },
  kn: {
    Dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'Learning Path': 'ಕಲಿಕೆಯ ಹಾದಿ',
    Progress: 'ಪ್ರಗತಿ',
    Profile: 'ಪ್ರೊಫೈಲ್',
  },
  hi: {
    Dashboard: 'डैशबोर्ड',
    'Learning Path': 'सीखने का मार्ग',
    Progress: 'प्रगति',
    Profile: 'प्रोफ़ाइल',
  },
}

export function SiteHeader({
  profile,
  language,
  onLanguageChange,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#dashboard"
          className="flex items-center gap-2.5"
          aria-label="ADAPTIVE home"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25">
            <Waypoints className="size-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-[0.2em]">
            ADAPTIVE
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-border bg-surface/60 p-1">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={index === 0 ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground lg:px-4',
                    index === 0 && 'bg-secondary text-foreground',
                  )}
                >
                  {navTranslations[language][item.label]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <label htmlFor="adaptive-language" className="sr-only">
            Choose language
          </label>

          <select
            id="adaptive-language"
            value={language}
            onChange={(event) =>
              onLanguageChange(event.target.value as Language)
            }
            className="h-9 max-w-32 rounded-lg border border-border bg-background px-2 text-sm"
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="hi">हिन्दी</option>
          </select>

          <a
            href="#profile"
            className="hidden items-center gap-2.5 rounded-full border border-border bg-surface/60 py-1 pr-3 pl-1 transition-colors hover:border-primary/40 sm:flex"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
              {profile.initials}
            </span>
            <span className="text-sm">
              {profile.name.split(' ')[0]}
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border md:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {navTranslations[language][item.label]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
