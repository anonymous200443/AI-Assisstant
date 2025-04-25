import { useEffect, useState } from "react";

export const useSpeechRecognition = (setMessage) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
      ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      : null;

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      setTranscript(event.results[0][0].transcript);
    };

    recognition.onend = () => setListening(false);
  }, [recognition]);

  const startListening = () => {
    if (!recognition) return;
    setTranscript("");
    setListening(true);
    recognition.start();
  };

  const resetTranscript = () => setTranscript("");

  return { startListening, listening, transcript, resetTranscript };
};
