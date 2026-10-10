
'use client'

import { useRef, useState } from 'react'
import {
  Activity,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  GitBranch,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  UserRound,
} from 'lucide-react'

import { translate, type Language } from '@/lib/adaptive/i18n'
import { useAdaptiveSession } from '@/hooks/use-adaptive-session'
import { studentProfile } from '@/lib/adaptive/mock-data'
import { FacultyDashboard } from '@/components/faculty/faculty-dashboard'

import { AdaptiveLesson } from './adaptive-lesson'
import { DecisionFlow } from './decision-flow'
import { HeroSection } from './hero-section'
import { IntelligenceGrid } from './intelligence-grid'
import { LearningPathTracker } from './learning-path-tracker'
import { LearningWorkspace } from './learning-workspace'
import { ProfileCard } from './profile-card'
import { ProgressPanel } from './progress-panel'
import { SectionHeading } from './section-heading'
import { SiteHeader } from './site-header'

export function AdaptiveApp() {
  const [language, setLanguage] = useState<Language>('en')
  const [activeView, setActiveView] = useState<'student' | 'faculty'>(
    'student',
  )

  const t = (key: Parameters<typeof translate>[1]) =>
    translate(language, key)

  const session = useAdaptiveSession()
  const answerRef = useRef<HTMLTextAreaElement>(null)
  const workspaceRef = useRef<HTMLElement>(null)

  const wordCount = session.answer.trim()
    ? session.answer.trim().split(/\s+/).length
    : 0

  const showResults =
    session.status === 'complete' && session.result

  const navLabels = {
    en: {
      overview: 'Overview',
      workspace: 'Learning workspace',
      intelligence: 'AI intelligence',
      progress: 'Learning progress',
      path: 'Learning path',
      profile: 'My profile',
    },
    kn: {
      overview: 'ಅವಲೋಕನ',
      workspace: 'ಕಲಿಕೆಯ ಕಾರ್ಯಕ್ಷೇತ್ರ',
      intelligence: 'AI ವಿಶ್ಲೇಷಣೆ',
      progress: 'ಕಲಿಕೆಯ ಪ್ರಗತಿ',
      path: 'ಕಲಿಕೆಯ ಹಾದಿ',
      profile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    },
    hi: {
      overview: 'अवलोकन',
      workspace: 'लर्निंग वर्कस्पेस',
      intelligence: 'AI विश्लेषण',
      progress: 'सीखने की प्रगति',
      path: 'सीखने का मार्ग',
      profile: 'मेरी प्रोफ़ाइल',
    },
  }[language]

  const startLearning = () => {
    workspaceRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    setTimeout(() => {
      answerRef.current?.focus({ preventScroll: true })
    }, 500)
  }

  const handleContinue = () => {
    session.continueLearning()
    startLearning()
  }

  const navigation = [
    {
      label: navLabels.overview,
      href: '#overview',
      icon: LayoutDashboard,
    },
    {
      label: navLabels.workspace,
      href: '#workspace',
      icon: BookOpen,
    },
    {
      label: navLabels.intelligence,
      href: '#engine',
      icon: BrainCircuit,
    },
    {
      label: navLabels.progress,
      href: '#progress',
      icon: TrendingUp,
    },
    {
      label: navLabels.path,
      href: '#learning-path',
      icon: GitBranch,
    },
    {
      label: navLabels.profile,
      href: '#profile',
      icon: UserRound,
    },
  ]

  const statusLabel =
    session.status === 'analyzing'
      ? 'Analyzing answer'
      : session.status === 'complete'
        ? 'Analysis complete'
        : session.status === 'error'
          ? 'Needs attention'
          : 'Ready to learn'

  const statusColor =
    session.status === 'analyzing'
      ? 'bg-amber-400'
      : session.status === 'error'
        ? 'bg-rose-400'
        : session.status === 'complete'
          ? 'bg-emerald-400'
          : 'bg-sky-400'

  return (
    <div className="min-h-screen bg-[#080d18] text-slate-100">
      {/* Shared header */}
      <SiteHeader
        profile={studentProfile}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Student / Faculty tabs */}
      <div className="sticky top-16 z-40 border-b border-white/10 bg-[#0a1020]/95 px-4 py-3 backdrop-blur-xl">
        <div
          className="mx-auto flex max-w-7xl gap-2"
          role="tablist"
          aria-label="Choose workspace"
        >
          <button
            id="student-tab"
            type="button"
            role="tab"
            aria-selected={activeView === 'student'}
            aria-controls="student-panel"
            onClick={() => setActiveView('student')}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              activeView === 'student'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <UserRound className="mr-2 inline size-4" />
            Student
          </button>

          <button
            id="faculty-tab"
            type="button"
            role="tab"
            aria-selected={activeView === 'faculty'}
            aria-controls="faculty-panel"
            onClick={() => setActiveView('faculty')}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              activeView === 'faculty'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="mr-2 inline size-4" />
            Faculty
          </button>
        </div>
      </div>

      {/* Faculty workspace */}
      {activeView === 'faculty' ? (
        <div id="faculty-panel" role="tabpanel" aria-labelledby="faculty-tab">
          <FacultyDashboard />
        </div>
      ) : (
        /* Student workspace */
        <div
          id="student-panel"
          role="tabpanel"
          aria-labelledby="student-tab"
          className="min-h-screen"
        >
          <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[245px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-32 flex h-[calc(100vh-8rem)] flex-col border-r border-white/[0.07] bg-[#0a1020] px-4 py-6">
                <div className="mb-8 flex items-center gap-3 px-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">
                    <BrainCircuit size={23} />
                  </div>

                  <div>
                    <p className="text-lg font-bold tracking-tight">
                      ADAPTIVE
                    </p>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                      Intelligent learning
                    </p>
                  </div>
                </div>

                <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  YOUR LEARNING
                </p>

                <nav aria-label="Main navigation" className="space-y-1">
                  {navigation.map((item, index) => {
                    const Icon = item.icon
                    const active = index === 1

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                          active
                            ? 'bg-indigo-500/15 font-semibold text-indigo-200 ring-1 ring-indigo-400/20'
                            : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <Icon
                          size={18}
                          className={
                            active
                              ? 'text-indigo-300'
                              : 'text-slate-500 group-hover:text-slate-300'
                          }
                        />
                        <span>{item.label}</span>

                        {active && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-300" />
                        )}
                      </a>
                    )
                  })}
                </nav>

                <div className="mt-auto space-y-4">
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Activity size={16} className="text-emerald-300" />
                      <span className="text-xs font-semibold text-slate-200">
                        Learning engine
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                      <span className="text-xs text-slate-400">
                        {statusLabel}
                      </span>
                    </div>

                    <p className="mt-3 text-[11px] leading-5 text-slate-500">
                      Your next learning step adapts to your answers.
                    </p>
                  </div>

                  <div className="px-3 text-[10px] text-slate-600">
                    ADAPTIVE · Learning that adjusts to you
                  </div>
                </div>
              </div>
            </aside>

            <main className="min-w-0 px-4 pb-12 pt-5 sm:px-6 lg:px-9 lg:pt-8">
              <div
                id="overview"
                className="mb-6 flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                    <span>Workspace</span>
                    <span>/</span>
                    <span className="text-slate-300">
                      Adaptive learning
                    </span>
                  </div>

                  <p className="text-sm text-slate-400">
                    Understand concepts. Discover gaps. Learn smarter.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                  <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                  <span className="text-xs text-slate-300">
                    {statusLabel}
                  </span>
                </div>
              </div>

              <div className="mb-8 lg:hidden">
                <nav
                  aria-label="Quick navigation"
                  className="flex gap-2 overflow-x-auto pb-2"
                >
                  {navigation.map((item) => {
                    const Icon = item.icon

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-slate-300 transition hover:bg-indigo-500/10"
                      >
                        <Icon size={14} />
                        {item.label}
                      </a>
                    )
                  })}
                </nav>
              </div>

              <div className="mb-12" id="hero">
                <HeroSection
                  onStart={startLearning}
                  result={session.result}
                  language={language}
                />
              </div>

              <div className="space-y-16 pb-12">
                <section
                  ref={workspaceRef}
                  id="workspace"
                  aria-labelledby="workspace-title"
                  className="scroll-mt-8 space-y-6"
                >
                  <SectionHeading
                    id="workspace-title"
                    eyebrow={t('learningWorkspace')}
                    title={t('showHowYouThink')}
                    description={t('workspaceDescription')}
                  />

                  <div className="rounded-2xl border border-white/[0.08] bg-[#0d1424] p-3 shadow-2xl shadow-black/10 sm:p-5">
                    <LearningWorkspace
                      ref={answerRef}
                      question={session.question}
                      questionNumber={session.questionNumber}
                      totalQuestions={session.totalQuestions}
                      answer={session.answer}
                      onAnswerChange={session.setAnswer}
                      onAnalyze={session.analyze}
                      status={session.status}
                      error={session.error}
                      isReinforcement={session.isReinforcement}
                      language={language}
                    />
                  </div>
                </section>

                <section
                  id="engine"
                  aria-labelledby="engine-title"
                  className="scroll-mt-8 space-y-6"
                >
                  <SectionHeading
                    id="engine-title"
                    eyebrow="LIVE ADAPTIVE DECISION FLOW"
                    title="Watch the system reason"
                    description="Agnes diagnoses understanding. Jeff decides the next best learning step."
                  />

                  <div className="rounded-2xl border border-white/[0.08] bg-[#0d1424] p-3 sm:p-5">
                    <DecisionFlow
                      status={session.status}
                      completedStages={session.completedStages}
                      result={session.result}
                      wordCount={wordCount}
                      language={language}
                    />
                  </div>
                </section>

                {showResults && session.result && (
                  <>
                    <section
                      id="intelligence"
                      aria-labelledby="intel-title"
                      className="scroll-mt-8 space-y-6"
                    >
                      <SectionHeading
                        id="intel-title"
                        eyebrow="AI LEARNING INTELLIGENCE"
                        title="What ADAPTIVE learned about you"
                        description="Explore the learning signals identified from your answer."
                      />

                      <IntelligenceGrid
                        result={session.result}
                        language={language}
                      />
                    </section>

                    <section
                      id="lesson"
                      aria-labelledby="lesson-title"
                      className="space-y-6"
                    >
                      <SectionHeading
                        id="lesson-title"
                        eyebrow="PERSONALIZED LESSON"
                        title="Built around your learning gap"
                        description="Review the feedback and continue with the next learning step."
                      />

                      <AdaptiveLesson
                        result={session.result}
                        onContinue={handleContinue}
                        language={language}
                      />
                    </section>
                  </>
                )}

                <section
                  id="progress"
                  aria-labelledby="progress-title"
                  className="scroll-mt-8 space-y-6"
                >
                  <SectionHeading
                    id="progress-title"
                    eyebrow="YOUR LEARNING JOURNEY"
                    title="Your progress, your next step"
                    description="Follow your learning progress and revisit concepts as you improve."
                  />

                  <ProgressPanel
                    progress={session.progress}
                    language={language}
                  />

                  <div
                    id="learning-path"
                    className="scroll-mt-8 rounded-2xl border border-white/[0.08] bg-[#0d1424] p-3 sm:p-5"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                        <GitBranch size={20} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-100">
                          Learning path
                        </h3>
                        <p className="text-xs text-slate-500">
                          Your progress through concepts
                        </p>
                      </div>
                    </div>

                    <LearningPathTracker
                      progress={session.progress}
                      language={language}
                    />
                  </div>

                  <div
                    id="profile"
                    className="scroll-mt-8 rounded-2xl border border-white/[0.08] bg-[#0d1424] p-3 sm:p-5"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                        <UserRound size={20} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-100">
                          Learner profile
                        </h3>
                        <p className="text-xs text-slate-500">
                          Your learning preferences
                        </p>
                      </div>
                    </div>

                    <ProfileCard
                      profile={studentProfile}
                      language={language}
                    />
                  </div>
                </section>

                <div className="rounded-2xl border border-indigo-400/15 bg-gradient-to-r from-indigo-500/[0.09] to-cyan-400/[0.04] p-5 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-300">
                        <Sparkles size={21} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          Ready to keep learning?
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          Return to your workspace and work through the next
                          question.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={startLearning}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-[#080d18]"
                    >
                      <BookOpen size={16} />
                      Continue learning
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 border-t border-white/[0.07] pt-7 text-xs text-slate-600">
                  <CheckCircle2 size={14} />
                  <span>ADAPTIVE · AI-powered adaptive learning</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  )
}
