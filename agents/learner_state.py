class LearnerState:
    def __init__(self):
        self.attempts = 0
        self.history = []
        self.weak_concepts = []

    def update(self, question, student_answer, analysis, next_action):
        self.attempts += 1

        record = {
            "question": question,
            "student_answer": student_answer,
            "analysis": analysis,
            "next_action": next_action
        }

        self.history.append(record)

        missing_concept = analysis.get("missing_concept")

        if missing_concept and missing_concept != "None":
            if missing_concept not in self.weak_concepts:
                self.weak_concepts.append(missing_concept)

    def get_state(self):
        return {
            "attempts": self.attempts,
            "weak_concepts": self.weak_concepts,
            "history": self.history
        }