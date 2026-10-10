
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { analyzeAnswer } from '@/lib/adaptive/client'
import { initialProgress, questions } from '@/lib/adaptive/mock-data'
import { applyAnalysisToProgress } from '@/lib/adaptive/progress'
import type {
  AnalysisResult,
  LearningProgress,
} from '@/lib/adaptive/types'

export type SessionStatus = 'idle' | 'analyzing' | 'complete' | 'error'

export const FLOW_STAGE_COUNT = 5

const STAGE_INTERVAL_MS = 750
const PROGRESS_STORAGE_KEY = 'adaptive-learning-progress-v1'

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export function useAdaptiveSession() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState<SessionStatus>('idle')
  const [completedStages, setCompletedStages] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] =
    useState<LearningProgress>(initialProgress)
  const [progressLoaded, setProgressLoaded] = useState(false)
  const [isReinforcement, setIsReinforcement] = useState(false)

  const runId = useRef(0)

  // Restore saved progress from this browser.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY)

      if (saved) {
        const parsed: unknown = JSON.parse(saved)

        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          'attempts' in parsed &&
          typeof parsed.attempts === 'number' &&
          'masteredConcepts' in parsed &&
          Array.isArray(parsed.masteredConcepts) &&
          'weakConcepts' in parsed &&
          Array.isArray(parsed.weakConcepts) &&
          'streakDays' in parsed &&
          typeof parsed.streakDays === 'number' &&
          'path' in parsed &&
          Array.isArray(parsed.path)
        ) {
          setProgress(parsed as LearningProgress)
        }
      }
    } catch {
      setProgress(initialProgress)
    } finally {
      setProgressLoaded(true)
    }
  }, [])

  // Save progress after it has loaded.
  useEffect(() => {
    if (!progressLoaded) return

    try {
      localStorage.setItem(
        PROGRESS_STORAGE_KEY,
        JSON.stringify(progress),
      )
    } catch {
      // Continue working if browser storage is unavailable.
    }
  }, [progress, progressLoaded])

  const question = questions[questionIndex]

  // Analyze the student's answer.
  const analyze = useCallback(async () => {
    const trimmed = answer.trim()

    if (
      !trimmed ||
      status === 'analyzing' ||
      status === 'complete'
    ) {
      return
    }

    const currentRun = ++runId.current

    setStatus('analyzing')
    setError(null)
    setResult(null)
    setCompletedStages(0)

    const request = analyzeAnswer({
      questionId: question.id,
      answer: trimmed,
    })

    try {
      let data: AnalysisResult | null = null

      for (let stage = 1; stage <= FLOW_STAGE_COUNT; stage++) {
        await sleep(STAGE_INTERVAL_MS)

        if (runId.current !== currentRun) return

        if (stage === 2) {
          data = await request

          if (runId.current !== currentRun) return

          setResult(data)
        }

        setCompletedStages(stage)
      }

      if (runId.current !== currentRun) return

      if (!data) {
        data = await request
      }

      if (runId.current !== currentRun) return

      setProgress((previous) =>
        applyAnalysisToProgress(previous, data!),
      )

      setStatus('complete')
    } catch (err) {
      if (runId.current !== currentRun) return

      setError(
        err instanceof Error ? err.message : 'Analysis failed',
      )
      setStatus('error')
      setCompletedStages(0)
    }
  }, [answer, question.id, status])

  // Choose the next learning step based on the analysis decision.
  const continueLearning = useCallback(() => {
    if (status !== 'complete' || !result) {
      return
    }

    // Invalidate any unfinished work from the previous step.
    runId.current += 1

    const action = result.decision.action

    if (action === 'advance') {
      // The student is ready to move forward.
      const nextIndex = (questionIndex + 1) % questions.length

      setQuestionIndex(nextIndex)
      setIsReinforcement(false)
    } else if (action === 'reinforce') {
      // Revisit the same question for additional practice.
      setIsReinforcement(true)
    } else {
      // Remediation: revisit the current question.
      // A dedicated remedial exercise can be added later.
      setIsReinforcement(false)
    }

    setAnswer('')
    setResult(null)
    setError(null)
    setStatus('idle')
    setCompletedStages(0)
  }, [questionIndex, result, status])

  return {
    question,
    questionNumber: questionIndex + 1,
    totalQuestions: questions.length,
    answer,
    setAnswer,
    status,
    completedStages,
    result,
    error,
    progress,
    isReinforcement,
    analyze,
    continueLearning,
  }
}
