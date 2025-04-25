
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import speakText from "./utils/speakText";
import axios from "axios"; // Import axios for HTTP requests
import Header from "./components/Header";
import MessageInput from "./components/MessageInput";
import LanguageSelector from "./components/LanguageSelector";
import Controls from "./components/Controls";
import ChatMessages from "./components/Chatmessages";
import { useState,useEffect,useRef } from "react";
import './App.css'
import OCRWithSpeech from "./components/OcrWithSpeech";


const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [voiceOutput, setVoiceOutput] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [availableVoices, setAvailableVoices] = useState([]);
  const [suggestedReplies, setSuggestedReplies] = useState([]);

  const chatEndRef = useRef(null);

  const { startListening, listening, transcript, resetTranscript } =
    useSpeechRecognition({ onResult: setMessage });

  // Load and store voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Detect user's browser language
  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    setSelectedLanguage(userLang.slice(0, 2)); // e.g., "en" from "en-US"
  }, []);

  // Update dark mode class
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Update message state when transcript changes
  useEffect(() => {
    if (transcript) setMessage(transcript);
  }, [transcript]);

  // Auto-scroll to bottom on message update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleSubmit = async () => {
    const userInput = message.trim();
    if (!userInput) return;

    setMessages((prev) => [...prev, { type: "user", content: userInput }]);

    try {
      setLoading(true);
      setResponse("");
      setMessage("");

      const formData = new FormData();
      formData.append("message", userInput);
      formData.append("tone", "polite and concise");
      formData.append("selected_language", selectedLanguage);

      const res = await axios.post("https://ai-assisstant.onrender.com/chat", formData);
      const reply = res.data.reply || "No response from AI";
      const lang = res.data.language || "en";

      setResponse(reply);
      if (voiceOutput) speakText(reply, lang);

      setMessages((prev) => [...prev, { type: "bot", content: reply }]);
      setSuggestedReplies(res.data.suggested_replies || []);
    } catch (error) {
      const errorMessage = "Error: " + error.message;
      setResponse(errorMessage);
      setMessages((prev) => [...prev, { type: "bot", content: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text, langCode) => {
    const synth = window.speechSynthesis;

    const selectedVoice = availableVoices.find((voice) =>
      voice.lang.toLowerCase().startsWith(langCode.toLowerCase())
    );

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedVoice ? selectedVoice.lang : langCode;
    if (selectedVoice) utterance.voice = selectedVoice;

    synth.cancel(); // stop any ongoing speech
    synth.speak(utterance);
  };

  const toggleVoice = () => setVoiceOutput((prev) => !prev);

  const clearChat = () => {
    setMessages([]);
    setMessage("");
    setResponse("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied!");
    });
  };

  const getLanguageName = (code) =>
    new Intl.DisplayNames([code], { type: "language" }).of(code);


  // Inside handleSubmit, update the suggestedReplies state
  // setSuggestedReplies(response.data.suggested_replies);
  return (
    <div
    className="container-fluid m-2"
      style={{
        // margin:0,
        backgroundColor: darkMode ? "#121212" : "#f9f9f9",
        color: darkMode ? "#fff" : "#000",
        // minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 20,
        fontFamily: "Arial, sans-serif",
        height: "100vh",
        // width: "100vw",
        // display: "flex",
        // flexDirection: "column",
        overflow: "hidden", // Don't allow body scroll
      }}
      >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
<div
className="container-fluid"
style={{
   flex: 1,
   display: "flex",
   flexDirection: "column",
   overflow: "hidden", // important!
}}>
  {/* <OCRWithSpeech/> */}

      {/* <LanguageSelector
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      /> */}
<LanguageSelector
  selectedLanguage={selectedLanguage}
  setSelectedLanguage={setSelectedLanguage}
/>


<ChatMessages
      messages={messages}
      darkMode={darkMode}
      copyToClipboard={copyToClipboard}
      chatEndRef={chatEndRef}
    />

    {/* Suggested Replies */}
   

    {/* Message Input */}
    <MessageInput
  message={message}
  setMessage={setMessage}
  handleSubmit={handleSubmit}
  startListening={startListening}
  listening={listening}
  voiceOutput={voiceOutput}
  toggleVoice={toggleVoice}
  clearChat={clearChat}
/>

       
      </div>
    
      </div>
    
  );
};

export default App;