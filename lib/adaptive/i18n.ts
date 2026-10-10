
export type Language = 'en' | 'kn' | 'hi'

export const translations = {
  en: {
    dashboard: 'Dashboard',
    learningPath: 'Learning Path',
    progress: 'Progress',
    profile: 'Profile',
    startLearning: 'Start Learning',
    showHowYouThink: 'Show us how you think',
    learningWorkspace: 'Learning workspace',
    analyzeAnswer: 'Analyze Answer',
    seeHowItAdapts: 'See how it adapts',

    workspaceDescription:
      'Answer in your own words. The more reasoning you share, the more precisely ADAPTIVE can diagnose and adapt.',
    decisionFlow: 'Live adaptive decision flow',
    watchSystemReason: 'Watch the system reason',
    decisionDescription:
      'Every answer travels through two specialized agents — Agnes diagnoses understanding, Jeff decides the next best move.',
    learningIntelligence: 'AI learning intelligence',
    whatLearned: 'What ADAPTIVE learned about you',
    intelligenceDescription:
      'Six signals extracted from a single answer, each validated against trusted knowledge.',
    adaptiveLesson: 'Adaptive lesson',
    builtForYourGap: 'Built for your exact gap',
    lessonDescription:
      'Generated in response to your answer — not a generic chapter.',
    yourPath: 'Your path, recalculated',
    progressDescription:
      'Progress updates after every analysis. Predicted gaps are flagged before you reach them.',
    demoFooter: 'ADAPTIVE · AI-powered adaptive learning · Demo data shown',
  },

  kn: {
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    learningPath: 'ಕಲಿಕೆಯ ಹಾದಿ',
    progress: 'ಪ್ರಗತಿ',
    profile: 'ಪ್ರೊಫೈಲ್',
    startLearning: 'ಕಲಿಕೆ ಪ್ರಾರಂಭಿಸಿ',
    showHowYouThink: 'ನೀವು ಹೇಗೆ ಯೋಚಿಸುತ್ತೀರಿ ಎಂದು ತೋರಿಸಿ',
    learningWorkspace: 'ಕಲಿಕೆಯ ಕಾರ್ಯಕ್ಷೇತ್ರ',
    analyzeAnswer: 'ಉತ್ತರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
    seeHowItAdapts: 'ಇದು ಹೇಗೆ ಹೊಂದಿಕೊಳ್ಳುತ್ತದೆ ನೋಡಿ',

    workspaceDescription:
      'ನಿಮ್ಮದೇ ಪದಗಳಲ್ಲಿ ಉತ್ತರಿಸಿ. ನಿಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ಹಂಚಿಕೊಂಡಷ್ಟು ADAPTIVE ನಿಮ್ಮ ಕಲಿಕೆಯನ್ನು ಹೆಚ್ಚು ನಿಖರವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಂಡು ಹೊಂದಿಕೊಳ್ಳುತ್ತದೆ.',
    decisionFlow: 'ನೇರ ಹೊಂದಾಣಿಕೆಯ ನಿರ್ಧಾರ ಪ್ರಕ್ರಿಯೆ',
    watchSystemReason: 'ವ್ಯವಸ್ಥೆ ಹೇಗೆ ನಿರ್ಧರಿಸುತ್ತದೆ ನೋಡಿ',
    decisionDescription:
      'ಪ್ರತಿಯೊಂದು ಉತ್ತರವನ್ನು ಎರಡು ವಿಶೇಷ ಏಜೆಂಟ್‌ಗಳು ವಿಶ್ಲೇಷಿಸುತ್ತವೆ — Agnes ನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ಗುರುತಿಸುತ್ತಾಳೆ ಮತ್ತು Jeff ಮುಂದಿನ ಉತ್ತಮ ಹಂತವನ್ನು ನಿರ್ಧರಿಸುತ್ತಾನೆ.',
    learningIntelligence: 'AI ಕಲಿಕಾ ಬುದ್ಧಿಮತ್ತೆ',
    whatLearned: 'ADAPTIVE ನಿಮ್ಮ ಬಗ್ಗೆ ಕಲಿತದ್ದು',
    intelligenceDescription:
      'ಒಂದೇ ಉತ್ತರದಿಂದ ಆರು ಪ್ರಮುಖ ಅಂಶಗಳನ್ನು ಗುರುತಿಸಿ, ವಿಶ್ವಾಸಾರ್ಹ ಜ್ಞಾನದೊಂದಿಗೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.',
    adaptiveLesson: 'ಹೊಂದಾಣಿಕೆಯ ಪಾಠ',
    builtForYourGap: 'ನಿಮ್ಮ ಕಲಿಕಾ ಕೊರತೆಗೆ ತಕ್ಕ ಪಾಠ',
    lessonDescription:
      'ಸಾಮಾನ್ಯ ಅಧ್ಯಾಯವಲ್ಲ; ನಿಮ್ಮ ಉತ್ತರಕ್ಕೆ ಅನುಗುಣವಾಗಿ ರಚಿಸಲಾಗಿದೆ.',
    yourPath: 'ನಿಮ್ಮ ಕಲಿಕೆಯ ಹಾದಿ',
    progressDescription:
      'ಪ್ರತಿ ವಿಶ್ಲೇಷಣೆಯ ನಂತರ ಪ್ರಗತಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ. ಮುಂದಿನ ಹಂತಕ್ಕೆ ಮುನ್ನ ಕಲಿಕಾ ಕೊರತೆಗಳನ್ನು ಗುರುತಿಸಲಾಗುತ್ತದೆ.',
    demoFooter: 'ADAPTIVE · AI ಆಧಾರಿತ ಹೊಂದಾಣಿಕೆಯ ಕಲಿಕೆ · ಡೆಮೊ ಡೇಟಾ',
  },

  hi: {
    dashboard: 'डैशबोर्ड',
    learningPath: 'सीखने का मार्ग',
    progress: 'प्रगति',
    profile: 'प्रोफ़ाइल',
    startLearning: 'सीखना शुरू करें',
    showHowYouThink: 'आप कैसे सोचते हैं, हमें दिखाएँ',
    learningWorkspace: 'सीखने का कार्यक्षेत्र',
    analyzeAnswer: 'उत्तर का विश्लेषण करें',
    seeHowItAdapts: 'यह कैसे अनुकूल होता है, देखें',

    workspaceDescription:
      'अपने शब्दों में उत्तर दें। आप जितना अधिक तर्क साझा करेंगे, ADAPTIVE उतनी ही सटीकता से आपकी समझ का आकलन करके सीखने के अनुभव को अनुकूल बनाएगा।',
    decisionFlow: 'लाइव अनुकूली निर्णय प्रक्रिया',
    watchSystemReason: 'सिस्टम को तर्क करते हुए देखें',
    decisionDescription:
      'हर उत्तर का विश्लेषण दो विशेष एजेंट करते हैं — Agnes आपकी समझ का आकलन करती है और Jeff अगला सबसे अच्छा कदम तय करता है।',
    learningIntelligence: 'AI शिक्षण बुद्धिमत्ता',
    whatLearned: 'ADAPTIVE ने आपके बारे में क्या सीखा',
    intelligenceDescription:
      'एक उत्तर से छह प्रमुख संकेत निकाले जाते हैं और विश्वसनीय ज्ञान के आधार पर जाँचे जाते हैं।',
    adaptiveLesson: 'अनुकूलित पाठ',
    builtForYourGap: 'आपकी सीखने की आवश्यकता के अनुसार',
    lessonDescription:
      'यह सामान्य अध्याय नहीं, बल्कि आपके उत्तर के आधार पर तैयार किया गया पाठ है।',
    yourPath: 'आपकी सीखने की प्रगति',
    progressDescription:
      'हर विश्लेषण के बाद प्रगति अपडेट होती है। आगे बढ़ने से पहले संभावित कमियों की पहचान की जाती है।',
    demoFooter: 'ADAPTIVE · AI-आधारित अनुकूली शिक्षा · डेमो डेटा',
  },
} as const

export type TranslationKey = keyof typeof translations.en

export function translate(
  language: Language,
  key: TranslationKey,
): string {
  return translations[language][key]
}
