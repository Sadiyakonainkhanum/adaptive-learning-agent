import os
import requests
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("AGNES_API_KEY")

url = "https://apihub.agnes-ai.com/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "model": "agnes-3.0-flash",
    "messages": [
        {
            "role": "user",
            "content": "Explain photosynthesis in 2 simple sentences."
        }
    ]
}

response = requests.post(
    url,
    headers=headers,
    json=data,
    timeout=60
)

print("Status:", response.status_code)
print(response.text)