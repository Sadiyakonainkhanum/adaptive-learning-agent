export type Understanding = 'good' | 'partial' | 'poor'
export type ValidationStatus = 'agreement' | 'conflict'
export type DecisionAction = 'advance' | 'reinforce' | 'remediate'
export type Severity = 'low' | 'medium' | 'high'

export interface Question {
  id: string
  topic: string
  concept: string
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced'
  prompt: string
  hint: string
  sampleAnswers: { strong: string; weak: string }
}

export interface PracticeQuestion {
  prompt: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface LessonSection {
  heading: string
  /** Wrap key terms in **double asterisks** to highlight them. */
  body: string
}

export interface Lesson {
  title: string
  focusConcept: string
  estimatedMinutes: number
  summary: string
  sections: LessonSection[]
  keyConcepts: string[]
  keyTakeaway: string
  practice?: PracticeQuestion
}

export interface AnalysisResult {
  questionId: string
  understanding: Understanding
  confidence: number
  agnes: {
    summary: string
    detectedConcepts: string[]
    missingConcepts: string[]
  }
  decision: {
    action: DecisionAction
    label: string
    rationale: string
  }
  currentGap: {
    concept: string
    description: string
    severity: Severity
  }
  predictedGap: {
    concept: string
    description: string
    probability: number
    horizon: string
  }
  validation: {
    status: ValidationStatus
    detail: string
  }
  trustedKnowledge: {
    statement: string
    source: string
  }
  lesson: Lesson
}

export interface AnalyzeRequest {
  questionId: string
  answer: string
}

export type PathNodeStatus = 'mastered' | 'current' | 'at-risk' | 'upcoming'

export interface PathNode {
  id: string
  label: string
  status: PathNodeStatus
  predictedGap?: boolean
}

export interface LearningProgress {
  attempts: number
  masteredConcepts: string[]
  weakConcepts: string[]
  streakDays: number
  path: PathNode[]
}

export interface StudentProfile {
  name: string
  initials: string
  program: string
  learningStyle: string
  goal: string
}
