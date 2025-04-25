
---

# 🌐 Real-Time Multilingual AI Assistant 🤖

A blazing-fast AI assistant that supports **real-time text, voice, and image input** with **multilingual output**, powered by **Groq LPU inference**, **FastAPI**, and **React**.
View Website at https://aiassisstant.netlify.app/

---

## 🚀 Features

- 💬 Real-time multilingual chat (text & voice)
- 🎤 Speech recognition & speech synthesis
- 🖼️ Image text recognition (OCR) using Tesseract.js
- 🧠 Context-aware responses with memory
- 🌍 Automatic language detection
- 🔁 Suggested replies & auto-scroll
- 🌙 Dark mode toggle
- 🗣️ Voice output toggle
- 📋 Copy-to-clipboard button
- 🧹 Clear chat functionality
- ⚡ Ultra-fast inference with Groq
- 🧪 Lottie animation bot avatar
- 🔄 Loading spinner for bot responses

---

## 📸 Demo

![Demo Screenshot](./demo-screenshot.png)

---

## 🛠 Technologies Used

**Frontend**:  
React, JavaScript, Lottie, TailwindCSS (or your CSS choice), react-speech-recognition, Tesseract.js, Axios, Framer Motion

**Backend**:  
FastAPI, Python, Uvicorn, Groq LPU Inference API, TTS, Langchain (if used), OpenAI-compatible format

---

## 📦 Installation

### 🔧 Backend Setup

1. Clone the repo  
   ```bash
   git clone https://github.com/your-username/ai-assistant-groq.git
   cd backend
   ```

2. Create and activate a virtual environment  
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   ```

3. Install dependencies  
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server  
   ```bash
   uvicorn main:app --reload
   ```

> ✅ Make sure your backend binds to `0.0.0.0` if deploying on Render or similar.

---

### 🧑‍💻 Frontend Setup

1. Go to the frontend folder  
   ```bash
   cd ../frontend
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Start the development server  
   ```bash
   npm start
   ```

---

## 📄 How to Use

- Type or speak your message using the mic button.
- Receive real-time responses from the AI.
- Upload images to extract text.
- Toggle between dark/light mode, language, and voice output.
- Copy bot replies or clear chat history.

---

## 🧩 Folder Structure

```
ai-assistant-groq/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── public/
│       └── index.html
└── README.md
```

---

## 🧠 Challenges I Faced

- Managing consistent voice output across languages with Web Speech API
- Deploying backend with proper port binding for platforms like Render
- Integrating Tesseract OCR without blocking the UI thread
- Handling automatic language detection with user preferences

---

## ✨ Future Enhancements

- User authentication & conversation history
- File and document support
- Emotion detection for voice/video
- Push-to-talk and whisper-to-respond modes
- Mobile-first PWA version

---

## 📬 Feedback & Contributions

PRs and feature suggestions are welcome! Feel free to fork and build your own version.

---

## 🧠 Powered by Groq

Groq’s blazing-fast LPU inference unlocks the power of large language models in real-time across modalities. This project is built to showcase Groq's ability to handle multilingual and multimodal AI assistants with speed and efficiency.

---

