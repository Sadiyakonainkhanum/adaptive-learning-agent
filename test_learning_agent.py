from learning_agent import AdaptiveLearningAgent


agent = AdaptiveLearningAgent()


print("========== ATTEMPT 1 ==========")

question = "What is the role of chlorophyll in photosynthesis?"

answer1 = "Chlorophyll makes plants green."

result1 = agent.process_answer(question, answer1)

print("\nAnalysis:")
print(result1["analysis"])

print("\nJeff's Decision:")
print(result1["next_action"])

print("\nLearner State:")
print(result1["learner_state"])


print("\n========== ATTEMPT 2 ==========")

answer2 = "Chlorophyll absorbs light energy."

result2 = agent.process_answer(question, answer2)

print("\nAnalysis:")
print(result2["analysis"])

print("\nJeff's Decision:")
print(result2["next_action"])

print("\nLearner State:")
print(result2["learner_state"])