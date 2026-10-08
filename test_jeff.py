from agents.jeff import choose_next_action


test_cases = [
    {
        "understanding": "Good",
        "missing_concept": "None",
        "difficulty": "Easy",
        "recommended_action": "Continue"
    },
    {
        "understanding": "Partial",
        "missing_concept": "Important concept is unclear",
        "difficulty": "Medium",
        "recommended_action": "Explain concept"
    },
    {
        "understanding": "Poor",
        "missing_concept": "Basic prerequisite is missing",
        "difficulty": "Hard",
        "recommended_action": "Teach prerequisite"
    },
    {
        "understanding": "Partial",
        "missing_concept": "Needs more practice",
        "difficulty": "Medium",
        "recommended_action": "Give practice"
    }
]


print("=== JEFF DECISION TEST ===")

for i, analysis in enumerate(test_cases, 1):
    action = choose_next_action(analysis)

    print(f"\nTest {i}")
    print("Understanding:", analysis["understanding"])
    print("Recommended action:", analysis["recommended_action"])
    print("Jeff decision:", action)