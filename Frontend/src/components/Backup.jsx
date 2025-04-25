// import React, { useState } from "react";
// import axios from "axios";
// import { Typewriter } from 'react-simple-typewriter';
// import Lottie from "lottie-react";
// import aiAvatar from "./assets/ai-avatar.json";
// import botui from "./assets/bot_ui.json";
// import { useEffect } from "react";
// import { useRef } from "react"; // make sure useRef and useEffect are imported
// import { motion, AnimatePresence } from "framer-motion";



// export default function App() {
//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem("darkMode") === "true";
//   });
  


  
//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode);
//     document.body.className = darkMode ? "dark-mode" : "";
//   }, [darkMode]);
  
  

//   const [message, setMessage] = useState("");
// const [messages, setMessages] = useState(() => {
//   const saved = localStorage.getItem("chatMessages");
//   return saved ? JSON.parse(saved) : [];
// });


// const [voiceOutput, setVoiceOutput] = useState(() => {
//   return localStorage.getItem("voiceOutput") === "false" ? false : true;
// });

// useEffect(() => {
//   localStorage.setItem("voiceOutput", voiceOutput);
// }, [voiceOutput]);



//   const [listening, setListening] = useState(false);
//   const [animationKey, setAnimationKey] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [voiceEnabled, setVoiceEnabled] = useState(() => {
//     const saved = localStorage.getItem("voiceEnabled");
//     return saved === null ? true : JSON.parse(saved);
//   });
  

//   const [selectedLanguage, setSelectedLanguage] = useState(() => {
//     return localStorage.getItem("selectedLanguage") || "en";
//   });
//   useEffect(() => {
//     localStorage.setItem("selectedLanguage", selectedLanguage);
//   }, [selectedLanguage]);
    
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  
//   const [response, setResponse] = useState("");

// // Save messages to localStorage whenever they change
// useEffect(() => {
//   localStorage.setItem("chatMessages", JSON.stringify(messages));
// }, [messages]);


//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();
//   recognition.continuous = false;
//   recognition.lang = "auto";

//   const startListening = () => {
//     setListening(true);
//     recognition.start();

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setMessage(transcript);
//       setListening(false);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       setListening(false);
//     };
//   };

//   const speakText = (text, lang = "en") => {
//     if (!voiceOutput) return; // Only speak if voice is enabled
  
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = lang || selectedLanguage;
//     window.speechSynthesis.speak(utterance);
//   };
  


  
  
//   const toggleVoice = () => {
//     setVoiceEnabled((prev) => {
//       const newState = !prev;
//       localStorage.setItem("voiceEnabled", JSON.stringify(newState));
//       return newState;
//     });
//   };
  

//   const handleSubmit = async () => {
//     const userInput = message.trim();
//     if (!userInput && !selectedImage) return;
  
//     const formData = new FormData();
//     if (userInput) formData.append("message", userInput);
//     if (selectedImage) formData.append("image", selectedImage);
  
//     // Add user message to messages list (if message exists)
//     if (userInput) {
//       setMessages((prev) => [...prev, { type: "user", content: userInput }]);
//     }
  
//     try {
//       setLoading(true);
//       setResponse("");
//       setMessage("");
//       setSelectedImage(null);
//       setImagePreviewUrl(null);
  
//       const res = await axios.post("http://localhost:8000/chat", formData);
//       const reply = res.data.reply || "No response from AI";
//       const lang = res.data.language || "en";
  
//       setResponse(reply);
//       setAnimationKey((prev) => prev + 1);
//       if (voiceOutput) speakText(reply, lang);
  
//       setMessages((prev) => [...prev, { type: "bot", content: reply }]);
  
//     } catch (error) {
//       const errorMessage = "Error: " + error.message;
//       setResponse(errorMessage);
//       setMessages((prev) => [...prev, { type: "bot", content: errorMessage }]);
//     } finally {
//       setLoading(false);
//     }
//   };
  



//   const clearChat = () => {
//     setMessages([]);
//     localStorage.removeItem("chatHistory");
//   };

//   useEffect(() => {
//     localStorage.setItem("chatHistory", JSON.stringify(messages));
//   }, [messages]);
  
  
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       alert("Copied to clipboard!");
//     });
//   };
  
//   const chatEndRef = useRef(null);
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

  
//   const bubbleVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 500,
//         damping: 26,
//       },
//     },
//     exit: { opacity: 0, y: -20, scale: 0.9 },
//   };
  
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           height: "100vh",
//           padding: 20,
//           maxWidth: 600,
//           margin: "0 auto",
//         }}
//       >
//         {/* Header and controls - FIXED */}
//         <div style={{ flexShrink: 0 }}>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             style={{
//               marginLeft: 10,
//               padding: "5px 10px",
//               borderRadius: 5,
//               backgroundColor: darkMode ? "#222" : "#eee",
//               color: darkMode ? "#fff" : "#000",
//               border: "1px solid",
//               borderColor: darkMode ? "#555" : "#ccc",
//               cursor: "pointer",
//             }}
//           >
//             {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//           </button>
    
//           <h1 style={{ textAlign: "center" }}>🤖 Groq AI Assistant</h1>
    
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Speak or type your question..."
//             rows={4}
//             cols={60}
//             style={{ width: "100%", marginBottom: 10 }}
//           />
//           <br />
//           <button onClick={startListening} disabled={listening}>
//             {listening ? "🎙️ Listening..." : "🎙️ Start Voice Input"}
//           </button>
//           <button onClick={handleSubmit} style={{ marginLeft: 10 }}>
//             Send
//           </button>
//           <button onClick={toggleVoice} style={{ marginLeft: 10 }}>
//             {voiceEnabled ? "🔊 Voice ON" : "🔇 Voice OFF"}
//           </button>
    
//           <div style={{ marginBottom: 20 }}>
//             <label htmlFor="language-select" style={{ marginRight: 10 }}>
//               🌐 Language:
//             </label>
//             <select
//               id="language-select"
//               value={selectedLanguage}
//               onChange={(e) => setSelectedLanguage(e.target.value)}
//               style={{ padding: "5px 10px", borderRadius: 5 }}
//             >
//               <option value="en">English</option>
//               <option value="hi">Hindi</option>
//               <option value="te">Telugu</option>
//               <option value="ta">Tamil</option>
//               <option value="bn">Bengali</option>
//               <option value="ml">Malayalam</option>
//             </select>
//           </div>
    
//           <button
//             onClick={() => setVoiceOutput(!voiceOutput)}
//             style={{
//               marginLeft: 10,
//               padding: "5px 10px",
//               borderRadius: 5,
//               backgroundColor: voiceOutput ? "#4caf50" : "#f44336",
//               color: "white",
//               border: "none",
//             }}
//           >
//             {voiceOutput ? "🔊 Voice ON" : "🔇 Voice OFF"}
//           </button>
//           <button
//             onClick={clearChat}
//             style={{
//               marginLeft: 10,
//               backgroundColor: "#ff4d4f",
//               color: "white",
//               border: "none",
//               borderRadius: 5,
//               padding: "5px 10px",
//             }}
//           >
//             🧹 Clear Chat
//           </button>
//         </div>
    
//         {/* Scrollable messages container */}
//         <div
//           style={{
//             flex: 1,
//             overflowY: "auto",
//             marginTop: 20,
//             paddingRight: 10,
//             border: "1px solid #ccc",
//             borderRadius: 10,
//           }}
//         >
//          {messages.map((msg, index) => (
//   <motion.div
//   key={index}
//   variants={bubbleVariants}
//   initial="hidden"
//   animate="visible"
//   exit="exit"
//   style={{
//     display: "flex",
//     justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
//     alignItems: "center",
//     marginBottom: 10,
//   }}
// >
//   {msg.type === "bot" && (
//     <Lottie
//       animationData={botui}
//       loop={true}
//       style={{ height: 60, marginRight: 10 }}
//     />
//   )}
//   <div
//     style={{
//       maxWidth: "70%",
//       backgroundColor: darkMode ? "#555" : "gray",
//       padding: "10px 15px",
//       borderRadius: 20,
//       color: "white",
//       position: "relative",
//     }}
//   >
//     {msg.content}
//     {msg.type === "bot" && (
//       <button
//         onClick={() => copyToClipboard(msg.content)}
//         style={{
//           marginTop: 5,
//           marginLeft: 10,
//           fontSize: 10,
//           padding: "2px 5px",
//           borderRadius: 5,
//           background: "#333",
//           color: "#fff",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Copy
//       </button>
//     )}
//   </div>
// </motion.div>

// ))}

//           <div ref={chatEndRef} />
//         </div>
//       </div>
//     );
  
// }
// // Export the App component
// // This is the main component of the application  import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import axios for HTTP requests