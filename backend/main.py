from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from datetime import datetime
from groq import Groq

app = FastAPI()

# === Enable CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Groq Client ===
client = Groq(api_key="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")  # Replace with your key

# === Global User Preferences & Memory ===
user_language_memory = {}
chat_history = {}
language_map = {
    "en": "English", "hi": "Hindi", "te": "Telugu",
    "fr": "French", "es": "Spanish",  # Extend this if needed
}

@app.post("/chat")
async def chat(
    message: Optional[str] = Form(None),
    username: Optional[str] = Form("Guest"),
    tone: Optional[str] = Form("polite and concise"),
    selected_language: Optional[str] = Form("auto")  # From frontend
):
    if not message:
        return {"reply": "Please say something to start the conversation.", "language": "en"}

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Store user preference
    if selected_language != "auto":
        user_language_memory[username] = selected_language

    preferred_lang = user_language_memory.get(username, "auto")

    # === System Prompt ===
    if preferred_lang != "auto":
        lang_instruction = f"Always translate and reply only in {language_map.get(preferred_lang, 'the selected language')}."
    else:
        lang_instruction = "Detect the language and reply accordingly."

    system_prompt = (
        f"You are a multilingual AI assistant with a {tone} tone. "
        f"Respond briefly like a friendly chat assistant. "
        f"{lang_instruction} Do not include language codes or sentiment in the reply."
        f"Translate and respond to every user message strictly in {language_map.get(preferred_lang)}. "
        f"Do not use English under any condition."

    )

    # === Chat History Setup ===
    if username not in chat_history:
        chat_history[username] = []

    # Add user's message
    chat_history[username].append({"role": "user", "content": message})

    # Send system prompt + history
    messages = [{"role": "system", "content": system_prompt}] + chat_history[username]

    # === Call Groq ===
    completion = client.chat.completions.create(
        model="mistral-saba-24b",
        messages=messages
    )

    reply = completion.choices[0].message.content.strip()

    # Save assistant reply
    chat_history[username].append({"role": "assistant", "content": reply})

    # Trim history
    MAX_HISTORY = 10
    chat_history[username] = chat_history[username][-MAX_HISTORY:]

    return {
        "reply": reply,
        "language": preferred_lang,
        "language_name": language_map.get(preferred_lang, "Unknown"),
        "timestamp": timestamp,
        "user": username,
        "tone_used": tone,
        "typing_speed_ms_per_char": 45,
        "suggested_replies": [
            "Can you explain more?",
            "Give me an example.",
            "Translate this.",
            "What's the summary?"
        ]
    }
