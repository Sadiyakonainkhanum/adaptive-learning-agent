from agents.agnes_client import ask_agnes


def analyze_performance(question, student_answer):
    prompt = f"""
You are an AI learning performance analyzer.

Analyze the student's answer to the question below.

Question:
{question}

Student answer:
{student_answer}

Return your analysis in exactly this format:

Understanding: [Good / Partial / Poor]
Missing concept: [short description]
Difficulty: [Easy / Medium / Hard]
Recommended action: [Continue / Explain concept / Teach prerequisite / Give practice]

Be concise and focus only on the student's learning needs.
"""

    return ask_agnes(prompt)