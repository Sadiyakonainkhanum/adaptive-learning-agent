from agents.agnes_client import ask_agnes
import json


def validate_knowledge(sources, topic):
    """
    Compare information from multiple sources
    and identify the most trustworthy information.
    """

    prompt = f"""
You are an AI knowledge validator for an adaptive learning system.

Topic:
{topic}

Learning sources:
{sources}

Compare the information from the sources.

Identify:
1. Whether the sources agree or conflict.
2. Which information appears most reliable.
3. What information should be used for teaching the student.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside the JSON.

Use exactly these keys:

{{
    "status": "Agreement or Conflict",
    "trusted_information": "short explanation",
    "reason": "short explanation"
}}

Rules:
- Prefer scientifically accurate and well-supported information.
- If sources conflict, clearly identify the information that should be trusted.
- Do not invent information.
- Keep the response concise.
"""

    result = ask_agnes(prompt)

    return json.loads(result)