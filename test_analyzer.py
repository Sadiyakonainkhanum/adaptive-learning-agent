from agents.performance_analyzer import analyze_performance


question = "What is the role of chlorophyll in photosynthesis?"

student_answer = "Chlorophyll makes plants green and helps plants make food."


result = analyze_performance(question, student_answer)

print("=== STUDENT PERFORMANCE ANALYSIS ===")
print(result)