from agents.performance_analyzer import analyze_performance
from agents.jeff import choose_next_action
from agents.content_generator import generate_learning_content
from agents.learner_state import LearnerState
from agents.gap_predictor import predict_learning_gaps
from agents.knowledge_validator import validate_knowledge


class AdaptiveLearningAgent:
    def __init__(self):
        self.learner_state = LearnerState()

    def process_answer(self, question, student_answer, sources=None, topic=None):
        # Step 1: Analyze the student's answer
        analysis = analyze_performance(
            question,
            student_answer
        )
        
        knowledge_validation = None

        if sources and topic:
            knowledge_validation = validate_knowledge(
                sources,
                topic
            )
        
        # Predict future learning gaps
        predicted_gaps = predict_learning_gaps(
            self.learner_state.get_state()
        )
        # Step 2: Jeff decides the next learning action
        next_action = choose_next_action(
            analysis,
            self.learner_state.get_state(),
            question,
            predicted_gaps
        )

        # Step 3: Save the student's learning progress
        self.learner_state.update(
            question,
            student_answer,
            analysis,
            next_action
        )
        predicted_gaps = predict_learning_gaps(
            self.learner_state.get_state()
        )

        # Step 4: Agnes generates adaptive learning content
        content = generate_learning_content(
            question,
            analysis,
            next_action,
            knowledge_validation["trusted_information"]
            if knowledge_validation
            else None
        )

        # Step 5: Get the student's current learning state
        state = self.learner_state.get_state()

        return {
            "analysis": analysis,
            "next_action": next_action,
            "content": content,
            "learner_state": state,
            "predicted_gaps": predicted_gaps,
            "knowledge_validation": knowledge_validation
        }