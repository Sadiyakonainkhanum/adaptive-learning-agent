
import type {
  LearningProgress,
  Lesson,
  Question,
  StudentProfile,
  Understanding,
} from './types'

export const studentProfile: StudentProfile = {
  name: 'Demo Learner',
  initials: 'DL',
  program: 'Computer Science',
  learningStyle: 'Concept-first learning',
  goal: 'Understand exoplanets and methods used to study them',
}

export const questions: Question[] = [
  {
    id: 'transit-method',
    topic: 'transit method',
    concept: 'Transit Method',
    difficulty: 'Foundational',
    prompt:
      'What is the transit method of detecting exoplanets, and how does it reveal a planet orbiting a star?',
    hint: 'Think about what happens to a star brightness when a planet passes in front of it.',
    sampleAnswers: {
      strong:
        'The transit method detects an exoplanet when it passes in front of its star and causes a measurable decrease in the star brightness.',
      weak:
        'The transit method detects planets by taking a direct photograph of every planet.',
    },
  },
  {
    id: 'kepler-mission',
    topic: 'kepler mission',
    concept: 'Kepler Mission',
    difficulty: 'Foundational',
    prompt:
      'What was NASA Kepler space telescope designed to discover, and how did it help identify exoplanets?',
    hint: 'Think about how Kepler monitored stars over time.',
    sampleAnswers: {
      strong:
        'Kepler searched for planets outside our solar system by monitoring stars for periodic brightness dips caused by planetary transits.',
      weak:
        'Kepler was designed mainly to explore the surface of planets in our solar system.',
    },
  },
  {
    id: 'habitable-zone',
    topic: 'habitable zone',
    concept: 'Habitable Zone',
    difficulty: 'Foundational',
    prompt:
      'What is the habitable zone around a star, and why is it important when studying exoplanets?',
    hint: 'Consider the conditions that could allow liquid water to exist on a planet surface.',
    sampleAnswers: {
      strong:
        'The habitable zone is the region around a star where conditions may allow liquid water on a planet surface, depending on its atmosphere and other factors.',
      weak:
        'The habitable zone is the region where a planet is guaranteed to contain life.',
    },
  },
  {
    id: 'exoplanet-detection',
    topic: 'exoplanet detection',
    concept: 'Exoplanet Detection',
    difficulty: 'Intermediate',
    prompt:
      'Describe two methods astronomers use to detect exoplanets.',
    hint: 'Consider changes in starlight and the movement of a star.',
    sampleAnswers: {
      strong:
        'The transit method detects dips in a star brightness, while the radial velocity method measures a star motion caused by a planet gravitational pull.',
      weak:
        'Astronomers can only detect exoplanets by visiting them with spacecraft.',
    },
  },
  {
    id: 'exoplanet-statistics',
    topic: 'exoplanet statistics',
    concept: 'Exoplanet Statistics',
    difficulty: 'Intermediate',
    prompt:
      'Why do astronomers use confirmed exoplanet counts and statistical surveys to study planetary systems?',
    hint: 'Think about what large samples reveal about how common different kinds of planets are.',
    sampleAnswers: {
      strong:
        'Confirmed counts and statistical surveys help astronomers estimate the frequency and diversity of planets and compare planetary systems while accounting for detection biases.',
      weak:
        'The number of planets discovered tells us every star has exactly the same planetary system.',
    },
  },
  {
    id: 'habitability-assessment',
    topic: 'habitability assessment',
    concept: 'Habitability Assessment',
    difficulty: 'Advanced',
    prompt:
      'What factors should scientists consider when assessing whether an exoplanet might be habitable?',
    hint: 'Consider its star, temperature, atmosphere, and possible presence of liquid water.',
    sampleAnswers: {
      strong:
        'Scientists consider stellar radiation, orbital distance, temperature, atmospheric composition, and the potential for liquid water. Being in the habitable zone alone does not prove that a planet supports life.',
      weak:
        'Any planet in the habitable zone must contain living organisms.',
    },
  },
]

export const conceptKeywords: Record<string, string[]> = {
  'transit-method': [
    'transit method',
    'brightness',
    'decrease',
    'dims',
    'passes in front',
    'periodic',
    'light curve',
  ],
  'kepler-mission': [
    'kepler',
    'telescope',
    'monitoring stars',
    'brightness dips',
    'transits',
    'solar system',
    'exoplanets',
  ],
  'habitable-zone': [
    'habitable zone',
    'liquid water',
    'atmosphere',
    'orbital distance',
    'temperature',
    'star',
  ],
  'exoplanet-detection': [
    'transit method',
    'radial velocity',
    'brightness',
    'gravitational pull',
    'starlight',
    'wobble',
  ],
  'exoplanet-statistics': [
    'statistical surveys',
    'frequency',
    'diversity',
    'planetary systems',
    'detection biases',
    'confirmed planets',
  ],
  'habitability-assessment': [
    'stellar radiation',
    'orbital distance',
    'temperature',
    'atmosphere',
    'liquid water',
    'habitable zone',
    'magnetic field',
  ],
}

interface Scenario {
  summary: string
  detectedConcepts: string[]
  missingConcepts: string[]
  predictedProbability: number
}

interface ConceptKnowledge {
  scenarios: Record<Understanding, Scenario>
  predictedGap: {
    concept: string
    description: string
    horizon: string
  }
  trustedKnowledge: {
    statement: string
    source: string
  }
  advanceLesson: Lesson
  remediationLesson: Lesson
}

const topicDetails: Record<
  string,
  {
    summary: string
    sections: { heading: string; body: string }[]
    keyConcepts: string[]
    takeaway: string
    source: string
    nextConcept: string
  }
> = {
  'transit-method': {
    summary:
      'Learn how astronomers detect planets by measuring changes in starlight.',
    sections: [
      {
        heading: 'How a transit works',
        body:
          'When a planet passes in front of its star from our viewpoint, it blocks a small amount of light. This produces a measurable dip in the star brightness.',
      },
      {
        heading: 'Repeated observations',
        body:
          'A repeating pattern of brightness dips can provide evidence for an orbiting planet. The depth and timing of the dips provide useful clues.',
      },
    ],
    keyConcepts: ['Transit', 'Stellar brightness', 'Light curve'],
    takeaway:
      'The transit method looks for repeating dips in a star brightness.',
    source: 'NASA Exoplanet Exploration',
    nextConcept: 'Kepler Mission',
  },
  'kepler-mission': {
    summary:
      'Understand how the Kepler mission searched for planets beyond our solar system.',
    sections: [
      {
        heading: 'Monitoring stars',
        body:
          'NASA Kepler repeatedly measured the brightness of many stars to look for small, recurring changes that could indicate a planetary transit.',
      },
      {
        heading: 'Why it mattered',
        body:
          'The mission helped astronomers discover many exoplanets and estimate how common planets are around other stars.',
      },
    ],
    keyConcepts: ['Kepler', 'Space telescope', 'Planet discovery'],
    takeaway:
      'Kepler found exoplanet candidates by monitoring stars for brightness changes.',
    source: 'NASA Kepler Mission',
    nextConcept: 'Habitable Zone',
  },
  'habitable-zone': {
    summary:
      'Explore the region around a star where liquid water may be possible on a suitable planet.',
    sections: [
      {
        heading: 'Distance from a star',
        body:
          'The habitable zone is a range of orbital distances where conditions could allow liquid water on a planet surface.',
      },
      {
        heading: 'Not a guarantee of life',
        body:
          'Atmosphere, planetary conditions, and stellar activity also matter. Being in the habitable zone does not prove that a planet has life.',
      },
    ],
    keyConcepts: ['Liquid water', 'Orbital distance', 'Atmosphere'],
    takeaway:
      'The habitable zone identifies potentially suitable conditions, not confirmed life.',
    source: 'NASA Exoplanet Exploration',
    nextConcept: 'Exoplanet Detection',
  },
  'exoplanet-detection': {
    summary:
      'Compare the major techniques used to detect planets around other stars.',
    sections: [
      {
        heading: 'Transit method',
        body:
          'The transit method measures a small drop in a star brightness when a planet passes in front of it.',
      },
      {
        heading: 'Radial velocity',
        body:
          'A planet gravitationally influences its star. Astronomers can measure small changes in the star motion using its spectrum.',
      },
    ],
    keyConcepts: ['Transit method', 'Radial velocity', 'Stellar motion'],
    takeaway:
      'Different detection methods reveal different evidence about exoplanets.',
    source: 'NASA Exoplanet Exploration',
    nextConcept: 'Exoplanet Statistics',
  },
  'exoplanet-statistics': {
    summary:
      'Learn how population surveys help astronomers understand the diversity of exoplanets.',
    sections: [
      {
        heading: 'Studying populations',
        body:
          'Confirmed discoveries can be compared to estimate how frequently different planet types occur around stars.',
      },
      {
        heading: 'Accounting for bias',
        body:
          'Some planets are easier to detect than others. Astronomers account for observational limits when interpreting survey results.',
      },
    ],
    keyConcepts: ['Planet populations', 'Survey samples', 'Detection bias'],
    takeaway:
      'Planet counts are most useful when survey limitations are considered.',
    source: 'NASA Exoplanet Exploration',
    nextConcept: 'Habitability Assessment',
  },
  'habitability-assessment': {
    summary:
      'Review the multiple factors scientists consider when evaluating whether an exoplanet might be habitable.',
    sections: [
      {
        heading: 'Planet and star conditions',
        body:
          'Scientists consider stellar radiation, orbital distance, temperature, planetary size, and the atmosphere when evaluating possible habitability.',
      },
      {
        heading: 'Evidence and uncertainty',
        body:
          'The potential for liquid water is important, but habitability is complex. No single factor proves that a planet supports life.',
      },
    ],
    keyConcepts: ['Stellar radiation', 'Atmosphere', 'Liquid water'],
    takeaway:
      'Habitability assessment combines multiple lines of evidence and does not by itself establish that life exists.',
    source: 'NASA Exoplanet Exploration',
    nextConcept: 'Further Habitability Research',
  },
}

function makeLesson(question: Question): Lesson {
  const details = topicDetails[question.id]

  return {
    title: `Understanding ${question.concept}`,
    focusConcept: question.concept,
    estimatedMinutes: question.difficulty === 'Advanced' ? 7 : 5,
    summary: details.summary,
    sections: details.sections,
    keyConcepts: details.keyConcepts,
    keyTakeaway: details.takeaway,
    practice: {
      prompt: `Which statement best describes ${question.concept}?`,
      options: [
        question.sampleAnswers.strong,
        question.sampleAnswers.weak,
        'Scientists can confirm every detail of a distant planet without observations.',
        'This topic has no role in studying planets beyond our solar system.',
      ],
      correctIndex: 0,
      explanation: details.takeaway,
    },
  }
}

export const conceptKnowledge: Record<string, ConceptKnowledge> =
  Object.fromEntries(
    questions.map((question, index) => {
      const details = topicDetails[question.id]
      const lesson = makeLesson(question)

      return [
        question.id,
        {
          scenarios: {
            good: {
              summary: `Your answer contains several relevant indicators about ${question.concept}. This is a rule-based estimate, not proof of mastery.`,
              detectedConcepts: details.keyConcepts,
              missingConcepts: [],
              predictedProbability: 0.2,
            },
            partial: {
              summary: `Your answer shows some understanding of ${question.concept}, but some details may need review.`,
              detectedConcepts: details.keyConcepts.slice(0, 1),
              missingConcepts: details.keyConcepts.slice(1),
              predictedProbability: 0.5,
            },
            poor: {
              summary: `Your answer needs more evidence of understanding ${question.concept}. Review the lesson and try again.`,
              detectedConcepts: [],
              missingConcepts: details.keyConcepts,
              predictedProbability: 0.8,
            },
          },
          predictedGap: {
            concept: details.nextConcept,
            description: `Review ${details.nextConcept} after strengthening your understanding of ${question.concept}.`,
            horizon: 'Next learning step',
          },
          trustedKnowledge: {
            statement: details.takeaway,
            source: details.source,
          },
          advanceLesson: lesson,
          remediationLesson: lesson,
        },
      ]
    }),
  )

export const initialProgress: LearningProgress = {
  attempts: 0,
  masteredConcepts: [],
  weakConcepts: [],
  streakDays: 0,
  path: questions.map((question, index) => ({
    id: question.id,
    label: question.concept,
    status: index === 0 ? 'current' : 'upcoming',
  })),
}

export const predictedGapNode: Record<string, string> = {
  'transit-method': 'kepler-mission',
  'kepler-mission': 'habitable-zone',
  'habitable-zone': 'exoplanet-detection',
  'exoplanet-detection': 'exoplanet-statistics',
  'exoplanet-statistics': 'habitability-assessment',
}
