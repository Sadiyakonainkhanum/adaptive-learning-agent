from agents.performance_analyzer import analyze_performance
from agents.jeff import choose_next_action
from agents.content_generator import generate_learning_content
from agents.learner_state import LearnerState


class AdaptiveLearningAgent:
    def __init__(self):
        self.learner_state = LearnerState()

    def process_answer(self, question, student_answer):
        # Step 1: Analyze the student's answer
        analysis = analyze_performance(
            question,
            student_answer
        )

        # Step 2: Jeff decides the next learning action
        next_action = choose_next_action(
            analysis,
            self.learner_state.get_state(),
            question
        )

        # Step 3: Save the student's learning progress
        self.learner_state.update(
            question,
            student_answer,
            analysis,
            next_action
        )

        # Step 4: Agnes generates adaptive learning content
        content = generate_learning_content(
            question,
            analysis,
            next_action
        )

        # Step 5: Get the student's current learning state
        state = self.learner_state.get_state()

        return {
            "analysis": analysis,
            "next_action": next_action,
            "content": content,
            "learner_state": state
        }