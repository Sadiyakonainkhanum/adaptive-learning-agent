from agents.knowledge_validator import validate_knowledge


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


result = validate_knowledge(
    sources,
    "Role of chlorophyll in photosynthesis"
)


print("=== KNOWLEDGE VALIDATION ===")
print(result)