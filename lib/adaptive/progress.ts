
import { predictedGapNode, questions } from './mock-data'
import type { AnalysisResult, LearningProgress } from './types'

export function applyAnalysisToProgress(
  progress: LearningProgress,
  result: AnalysisResult,
): LearningProgress {
  const question = questions.find(
    (item) => item.id === result.questionId,
  )

  // Ignore unknown questions.
  if (!question) return progress

  const concept = question.concept

  const nodeIndex = progress.path.findIndex(
    (node) => node.id === result.questionId,
  )

  // Ignore questions that are not represented in the learning path.
  if (nodeIndex === -1) return progress

  const currentNode = progress.path[nodeIndex]

  const successfulAnswer =
    result.understanding === 'good' &&
    result.decision.action === 'advance'

  // Previously mastered concepts remain mastered.
  const remainsMastered = currentNode.status === 'mastered'
  const isMastered = successfulAnswer || remainsMastered

  const threatenedNode = predictedGapNode[result.questionId]

  const path = progress.path.map((node, index) => {
    if (node.id === result.questionId) {
      return {
        ...node,
        status: isMastered ? ('mastered' as const) : ('at-risk' as const),
        predictedGap: node.id === threatenedNode,
      }
    }

    if (
      successfulAnswer &&
      index === nodeIndex + 1 &&
      node.status === 'upcoming'
    ) {
      return {
        ...node,
        status: 'current' as const,
        predictedGap: node.id === threatenedNode,
      }
    }

    return {
      ...node,
      predictedGap: node.id === threatenedNode,
    }
  })

  // Derive mastered concepts from the learning path so both stay synchronized.
  const masteredConcepts = Array.from(
    new Set(
      path
        .filter((node) => node.status === 'mastered')
        .map((node) => {
          const matchingQuestion = questions.find(
            (item) => item.id === node.id,
          )

          return matchingQuestion?.concept ?? node.label
        }),
    ),
  )

  // Keep mastered concepts out of the weak-concepts list.
  const weakConcepts = Array.from(
    new Set([
      ...progress.weakConcepts.filter(
        (item) => !masteredConcepts.includes(item),
      ),
      ...(!isMastered && !masteredConcepts.includes(concept)
        ? [concept]
        : []),
    ]),
  )

  return {
    ...progress,
    attempts: progress.attempts + 1,
    masteredConcepts,
    weakConcepts,
    path,
  }
}
