from agents.gap_predictor import predict_learning_gaps


learner_state = {
    "attempts": 2,
    "weak_concepts": [
        "The process of absorbing light energy to convert it into chemical energy"
    ],
    "history": [
        {
            "question": "What is the role of chlorophyll in photosynthesis?",
            "student_answer": "Chlorophyll makes plants green.",
            "analysis": {
                "understanding": "Partial",
                "missing_concept": "The process of absorbing light energy to convert it into chemical energy",
                "difficulty": "Easy",
                "recommended_action": "Explain concept"
            },
            "next_action": "Explain concept"
        }
    ]
}


result = predict_learning_gaps(learner_state)

print("=== PREDICTED LEARNING GAPS ===")
print(result)