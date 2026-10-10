
import type { AnalysisResult, AnalyzeRequest } from './types'

const ANALYZE_ENDPOINT =
  process.env.NEXT_PUBLIC_ADAPTIVE_API_URL ?? '/api/analyze'

export async function analyzeAnswer(
  payload: AnalyzeRequest,
): Promise<AnalysisResult> {
  let response: Response

  try {
    response = await fetch(ANALYZE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      'Unable to reach the analysis server. Check your connection and try again.',
    )
  }

  const data: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      typeof data === 'object' &&
      data !== null &&
      'error' in data &&
      typeof data.error === 'string'
        ? data.error
        : `Analysis failed (${response.status})`

    throw new Error(message)
  }

  if (
    typeof data !== 'object' ||
    data === null ||
    !('questionId' in data) ||
    data.questionId !== payload.questionId ||
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
    throw new Error('The analysis server returned an invalid response.')
  }

  return data as AnalysisResult
}
