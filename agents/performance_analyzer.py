from agents.agnes_client import ask_agnes
import json


def analyze_performance(question, student_answer):
    prompt = f"""
You are an AI learning performance analyzer.

Analyze the student's answer to the question below.

Question:
{question}

Student answer:
{student_answer}

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside the JSON.

Use exactly these keys:

{{
    "understanding": "Good, Partial, or Poor",
    "missing_concept": "short description",
    "difficulty": "Easy, Medium, or Hard",
    "recommended_action": "Continue, Explain concept, Teach prerequisite, or Give practice"
}}
"""

    result = ask_agnes(prompt)

    return json.loads(result)