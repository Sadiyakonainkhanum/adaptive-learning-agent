from learning_agent import AdaptiveLearningAgent

sources = [
    {
        "source": "Biology Notes",
        "information": "Chlorophyll absorbs light energy and helps drive photosynthesis."
    },
    {
        "source": "Study Website",
        "information": "Chlorophyll only gives plants their green color and has no role in energy conversion."
    }
]

topic = "Role of chlorophyll in photosynthesis"


agent = AdaptiveLearningAgent()


print("========== ATTEMPT 1 ==========")

question = "What is the role of chlorophyll in photosynthesis?"

answer1 = "Chlorophyll makes plants green."

result1 = agent.process_answer(
    question,
    answer1,
    sources,
    topic
)

print("\nAnalysis:")
print(result1["analysis"])

print("\nJeff's Decision:")
print(result1["next_action"])

print("\nLearner State:")
print(result1["learner_state"])
print("\nPredicted Gaps:")
print(result1["predicted_gaps"])

print("\nKnowledge Validation:")
print(result1["knowledge_validation"])

print("\nAdaptive Learning Content:")
print(result1["content"])


print("\n========== ATTEMPT 2 ==========")

answer2 = "Chlorophyll absorbs light energy."

result2 = agent.process_answer(question, answer2)

print("\nAnalysis:")
print(result2["analysis"])

print("\nJeff's Decision:")
print(result2["next_action"])

print("\nLearner State:")
print(result2["learner_state"])
print("\nPredicted Gaps:")
print(result2["predicted_gaps"])