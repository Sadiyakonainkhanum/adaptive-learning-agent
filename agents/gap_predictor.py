from agents.agnes_client import ask_agnes
import json


def predict_learning_gaps(learner_state):
    """
    Predict concepts the student may struggle with next.
    """

    history = learner_state.get("history", [])
    weak_concepts = learner_state.get("weak_concepts", [])

    prompt = f"""
You are an AI learning gap predictor.

Analyze the student's learning history.

Learning history:
{history}

Known weak concepts:
{weak_concepts}

Predict the concepts the student is most likely to struggle with next.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside the JSON.

Use exactly these keys:

{{
    "predicted_gaps": [
        "concept 1",
        "concept 2"
    ],
    "reason": "short explanation"
}}

Rules:
- Predict only 1 or 2 concepts.
- Base predictions on the student's previous mistakes and weak concepts.
- Do not invent unrelated topics.
- Keep concepts specific.
"""

    result = ask_agnes(prompt)

    return json.loads(result)