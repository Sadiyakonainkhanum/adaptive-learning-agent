from learning_agent import run_learning_agent


test_cases = [
    {
        "question": "What is the role of chlorophyll in photosynthesis?",
        "answer": "Chlorophyll makes plants green."
    },
    {
        "question": "What is the role of chlorophyll in photosynthesis?",
        "answer": "Chlorophyll absorbs light energy and helps convert it into chemical energy."
    }
]


for i, test in enumerate(test_cases, 1):

    print(f"\n========== TEST {i} ==========")

    result = run_learning_agent(
        test["question"],
        test["answer"]
    )

    print("\nStudent answer:")
    print(test["answer"])

    print("\nAnalysis:")
    print(result["analysis"])

    print("\nJeff's Decision:")
    print(result["next_action"])

    print("\nAgnes Generated Content:")
    print(result["content"])