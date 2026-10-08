def choose_next_action(analysis):
    """
    Jeff is the decision layer.

    It looks at the student's learning analysis
    and chooses the next learning action.
    """

    understanding = analysis["understanding"]
    recommended_action = analysis["recommended_action"]

    if understanding == "Good":
        return "Continue"

    if recommended_action == "Teach prerequisite":
        return "Teach prerequisite"

    if recommended_action == "Give practice":
        return "Give practice"

    if understanding == "Partial":
        return "Explain concept"

    return "Explain concept"