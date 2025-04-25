const speakText = (text, lang = "en") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };
  
  export default speakText;
  