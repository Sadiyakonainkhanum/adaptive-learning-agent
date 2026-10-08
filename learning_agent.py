from agents.performance_analyzer import analyze_performance
from agents.jeff import choose_next_action
from agents.content_generator import generate_learning_content


def run_learning_agent(question, student_answer):
    # Step 1: Analyze the student's answer
    analysis = analyze_performance(question, student_answer)

    # Step 2: Jeff decides what should happen next
    next_action = choose_next_action(analysis)

    # Step 3: Agnes generates the appropriate learning content
    content = generate_learning_content(
        question,
        analysis,
        next_action
    )

    return {
        "analysis": analysis,
        "next_action": next_action,
        "content": content
    }