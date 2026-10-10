def choose_next_action(
    analysis,
    learner_state=None,
    question=None,
    predicted_gaps=None
):
    """
    Jeff is the decision layer.

    It uses the student's current performance
    and previous learning history to choose
    the next learning action.
    """

    understanding = analysis["understanding"]
    recommended_action = analysis["recommended_action"]

    history = []

    if learner_state:
        history = learner_state.get("history", [])

    if predicted_gaps is None:
        predicted_gaps = []

    # If a future gap is predicted, prepare practice for it
    if predicted_gaps and understanding == "Good":
        return "Give practice"
    
    
    # If the student already understood it, move forward
    if understanding == "Good":
        return "Continue"

    # Follow important prerequisite recommendation
    if recommended_action == "Teach prerequisite":
        return "Teach prerequisite"

    # If Agnes specifically recommends practice
    if recommended_action == "Give practice":
        return "Give practice"

    # Check whether the student has attempted
    # the same question before
    seen_before = any(
        record.get("question") == question
        for record in history
    )

    # Student is struggling again after a previous attempt
    if understanding == "Partial" and seen_before:
        return "Give practice"

    # First time struggling
    if understanding == "Partial":
        return "Explain concept"

    # Poor understanding
    return "Teach prerequisite"