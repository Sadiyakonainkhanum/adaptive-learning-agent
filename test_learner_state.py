from agents.learner_state import LearnerState


state = LearnerState()


analysis = {
    "understanding": "Partial",
    "missing_concept": "Light-dependent reactions",
    "difficulty": "Easy",
    "recommended_action": "Explain concept"
}


state.update(
    "What is the role of chlorophyll?",
    "Chlorophyll makes plants green.",
    analysis,
    "Explain concept"
)


print("=== LEARNER STATE ===")
print(state.get_state())