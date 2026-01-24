import os
import requests
from dotenv import load_dotenv
from typing import List, Dict

# Load environment variables
load_dotenv()

# Environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Groq API configuration
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

# ✅ Supported & active Groq model (IMPORTANT)
MODEL = "llama-3.1-8b-instant"

# Request timeout (prevents hanging requests)
TIMEOUT = 30


class GroqAPIError(Exception):
    """Custom exception for Groq API errors"""
    pass


def ask_llama(messages: List[Dict[str, str]]) -> str:
    """
    Sends a chat completion request to Groq's LLaMA API.

    Args:
        messages: List of messages in OpenAI-compatible format

    Returns:
        AI-generated response text
    """

    if not GROQ_API_KEY:
        raise GroqAPIError("GROQ_API_KEY not found. Check your .env file.")

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": MODEL,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 256,
        "top_p": 1.0,
        "stream": False
    }

    try:
        response = requests.post(
            GROQ_URL,
            headers=headers,
            json=payload,
            timeout=TIMEOUT
        )
    except requests.exceptions.RequestException as e:
        raise GroqAPIError(f"Network error while calling Groq API: {e}")

    # 🔴 Handle Groq API errors cleanly
    if response.status_code != 200:
        try:
            error_json = response.json()
        except Exception:
            error_json = response.text

        print("====== GROQ API ERROR ======")
        print(error_json)
        print("============================")

        raise GroqAPIError(
            f"Groq API returned {response.status_code}"
        )

    # ✅ Safe JSON parsing
    data = response.json()

    if "choices" not in data or not data["choices"]:
        raise GroqAPIError("Invalid response format from Groq API")

    return data["choices"][0]["message"]["content"]
