
import { NextResponse } from 'next/server'
import { runMockAnalysis } from '@/lib/adaptive/mock-engine'
import type { AnalyzeRequest } from '@/lib/adaptive/types'

const MAX_ANSWER_LENGTH = 5000

export async function POST(request: Request) {
  let body: Partial<AnalyzeRequest>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  const questionId =
    typeof body.questionId === 'string' ? body.questionId.trim() : ''

  const answer =
    typeof body.answer === 'string' ? body.answer.trim() : ''

  if (!questionId || !answer) {
    return NextResponse.json(
      { error: 'questionId and answer are required' },
      { status: 400 },
    )
  }

  if (answer.length > MAX_ANSWER_LENGTH) {
    return NextResponse.json(
      { error: 'Answer is too long' },
      { status: 413 },
    )
  }

  const backendUrl = process.env.ADAPTIVE_BACKEND_URL

  try {
    if (backendUrl) {
      const upstream = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, answer }),
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
      })

      const data: unknown = await upstream.json().catch(() => null)

      if (!upstream.ok) {
        return NextResponse.json(
          { error: 'The analysis backend could not complete the request.' },
          { status: 502 },
        )
      }

      if (
        typeof data !== 'object' ||
        data === null ||
        !('questionId' in data) ||
        data.questionId !== questionId ||
        !('understanding' in data) ||
        !['good', 'partial', 'poor'].includes(String(data.understanding)) ||
        !('decision' in data) ||
        typeof data.decision !== 'object' ||
        data.decision === null ||
        !('action' in data.decision) ||
        !['advance', 'reinforce', 'remediate'].includes(
          String(data.decision.action),
        )
      ) {
        return NextResponse.json(
          { error: 'The analysis backend returned an invalid response.' },
          { status: 502 },
        )
      }

      return NextResponse.json(data)
    }

    // Local development mode: use the mock engine.
    return NextResponse.json(runMockAnalysis(questionId, answer))
  } catch {
    return NextResponse.json(
      {
        error: backendUrl
          ? 'The analysis backend is unavailable or timed out.'
          : 'Analysis failed.',
      },
      { status: 502 },
    )
  }
}
