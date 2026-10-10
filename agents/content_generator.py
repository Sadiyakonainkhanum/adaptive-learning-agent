from agents.agnes_client import ask_agnes


def generate_learning_content(question, analysis, next_action, trusted_information=None):
    prompt = f"""
You are an adaptive learning tutor.

Original question:
{question}

Student performance analysis:
{analysis}

Next learning action:
{next_action}

Trusted information:
{trusted_information}

Based on the student's performance, provide the appropriate learning content.

Rules:
- If the action is "Explain concept", explain the missing concept in simple language.
- If the action is "Teach prerequisite", explain the prerequisite knowledge the student needs before learning the main concept.
- If the action is "Give practice", give one short practice question related to the missing concept. Do not give the answer.
- If the action is "Continue", briefly acknowledge the student's understanding and introduce the next related idea.
"""

    return ask_agnes(prompt)