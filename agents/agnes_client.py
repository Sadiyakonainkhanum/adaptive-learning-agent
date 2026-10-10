import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("AGNES_API_KEY")
AGNES_URL = "https://apihub.agnes-ai.com/v1/chat/completions"
MODEL = "agnes-3.0-flash"


def ask_agnes(prompt):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    response = requests.post(
        AGNES_URL,
        headers=headers,
        json=data,
        timeout=60
    )

    response.raise_for_status()

    result = response.json()

    return result["choices"][0]["message"]["content"]