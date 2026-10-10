
import {
  conceptKeywords,
  conceptKnowledge,
  questions,
} from './mock-data'

import type {
  AnalysisResult,
  Understanding,
} from './types'

/**
 * ADAPTIVE demo analysis engine.
 *
 * Uses configured keywords, sample-answer word overlap,
 * and answer length to estimate understanding.
 *
 * This is a rule-based demo, not semantic AI or independent
 * verification of whether an answer is factually correct.
 */

const MIN_WORDS_FOR_PARTIAL = 5
const MIN_WORDS_FOR_GOOD = 8

const STOP_WORDS = new Set([
  'about', 'after', 'also', 'been', 'being', 'does',
  'from', 'have', 'into', 'just', 'more', 'most',
  'that', 'their', 'them', 'then', 'there', 'these',
  'they', 'this', 'those', 'through', 'very', 'what',
  'when', 'where', 'which', 'while', 'with', 'would',
  'your', 'will', 'than', 'such', 'some', 'each',
  'only', 'because', 'function', 'functions', 'has',
  'are', 'was', 'were', 'for', 'and', 'but', 'the',
  'can', 'its', 'not',
])

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-z0-9]+/g) ?? []
}

/**
 * Match a complete word or phrase, rather than a substring
 * inside a longer word.
 */
function containsPhrase(text: string, phrase: string): boolean {
  const escaped = phrase
    .trim()
    .toLowerCase()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\s+/g, '\\s+')

  if (!escaped) return false

  const pattern = new RegExp(
    `(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`,
    'i',
  )

  return pattern.test(text)
}

/**
 * Extract meaningful words from a sample answer.
 */
function getMeaningfulSampleWords(sample: string): string[] {
  return Array.from(
    new Set(
      tokenize(sample).filter(
        (word) => word.length > 3 && !STOP_WORDS.has(word),
      ),
    ),
  )
}

export function runMockAnalysis(
  questionId: string,
  answer: string,
): AnalysisResult {
  const question = questions.find(
    (item) => item.id === questionId,
  )

  if (!question) {
    throw new Error(`Question not found: ${questionId}`)
  }

  const normalizedAnswer = answer.trim().toLowerCase()

  if (!normalizedAnswer) {
    throw new Error('Please enter an answer before analyzing.')
  }

  const knowledge = conceptKnowledge[questionId]
  const keywords = conceptKeywords[questionId] ?? []

  if (!knowledge) {
    throw new Error(`Concept knowledge not found: ${questionId}`)
  }

  const answerWords = tokenize(normalizedAnswer)
  const uniqueAnswerWords = new Set(answerWords)
  const answerWordCount = answerWords.length

  // Match configured keywords and phrases.
  const detectedKeywords = keywords.filter((keyword) =>
    containsPhrase(normalizedAnswer, keyword),
  )

  const keywordCount = detectedKeywords.length

  // Compare meaningful words with the strong sample answer.
  const strongSampleWords = getMeaningfulSampleWords(
    question.sampleAnswers.strong,
  )

  const matchingStrongWords = strongSampleWords.filter((word) =>
    uniqueAnswerWords.has(word),
  )

  const sampleCoverage =
    strongSampleWords.length > 0
      ? matchingStrongWords.length / strongSampleWords.length
      : 0

  // Transparent demo scoring; not a calibrated probability.
  const keywordSignal = Math.min(keywordCount / 3, 1)
  const sampleSignal = Math.min(sampleCoverage / 0.4, 1)
  const lengthSignal = Math.min(
    answerWordCount / MIN_WORDS_FOR_GOOD,
    1,
  )

  const demoSignalScore = Number(
    (
      keywordSignal * 0.5 +
      sampleSignal * 0.35 +
      lengthSignal * 0.15
    ).toFixed(2),
  )

  // Length alone cannot establish understanding.
  let understanding: Understanding

  if (
    answerWordCount >= MIN_WORDS_FOR_GOOD &&
    keywordCount >= 2 &&
    sampleCoverage >= 0.2
  ) {
    understanding = 'good'
  } else if (
    answerWordCount >= MIN_WORDS_FOR_PARTIAL &&
    (keywordCount >= 1 || sampleCoverage >= 0.15)
  ) {
    understanding = 'partial'
  } else {
    understanding = 'poor'
  }

  const scenario = knowledge.scenarios[understanding]

  const action: AnalysisResult['decision']['action'] =
    understanding === 'good'
      ? 'advance'
      : understanding === 'partial'
        ? 'reinforce'
        : 'remediate'

  const lesson =
    action === 'advance'
      ? knowledge.advanceLesson
      : knowledge.remediationLesson

  // Combine configured scenario concepts with matched keywords.
  const detectedConcepts = Array.from(
    new Set([
      ...scenario.detectedConcepts,
      ...detectedKeywords,
    ]),
  )

  // Avoid reporting a missing concept when its configured wording
  // overlaps a keyword that was actually detected.
  const missingConcepts = scenario.missingConcepts.filter(
    (concept) =>
      !detectedKeywords.some((keyword) => {
        const normalizedConcept = concept.toLowerCase()
        const normalizedKeyword = keyword.toLowerCase()

        return (
          normalizedConcept.includes(normalizedKeyword) ||
          normalizedKeyword.includes(normalizedConcept)
        )
      }),
  )

  const decisionRationale = {
    advance:
      'Multiple configured indicators matched the sample answer. This heuristic result does not prove mastery.',
    reinforce:
      'Some relevant indicators were found, but the evidence was insufficient for advancement. Try explaining the concept more clearly.',
    remediate:
      'Few relevant indicators were found. Review the fundamentals and try explaining the concept in your own words.',
  }[action]

  return {
    questionId,
    understanding,

    // A heuristic signal score, not calibrated AI confidence.
    confidence: demoSignalScore,

    agnes: {
      summary: scenario.summary,
      detectedConcepts,
      missingConcepts,
    },

    decision: {
      action,
      label:
        action === 'advance'
          ? 'Ready to advance'
          : action === 'reinforce'
            ? 'Reinforce understanding'
            : 'Review the fundamentals',
      rationale: decisionRationale,
    },

    currentGap: {
      concept: question.concept,
      description:
        understanding === 'good'
          ? `The demo rules found several indicators related to ${question.concept}. This does not guarantee full mastery.`
          : `Review ${question.concept} and explain the underlying idea in your own words.`,
      severity:
        understanding === 'good'
          ? 'low'
          : understanding === 'partial'
            ? 'medium'
            : 'high',
    },

    predictedGap: {
      concept: knowledge.predictedGap.concept,
      description: knowledge.predictedGap.description,
      // Illustrative mock data, not a validated prediction.
      probability: scenario.predictedProbability,
      horizon: knowledge.predictedGap.horizon,
    },

    validation: {
      status:
        understanding === 'good' ? 'agreement' : 'conflict',
      detail:
        'Demo-only rule-based analysis using keyword matching, sample-answer word overlap, and answer length. An insufficient match is not proof that an answer is factually incorrect. No independent AI verifier or calibrated confidence model is used.',
    },

    trustedKnowledge: {
      statement: knowledge.trustedKnowledge.statement,
      source: knowledge.trustedKnowledge.source,
    },

    lesson,
  }
}
