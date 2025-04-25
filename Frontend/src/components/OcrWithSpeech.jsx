import React, { useState,useRef } from "react";
import Tesseract from "tesseract.js";
import { Button, Modal } from 'antd';


const OCRWithSpeech = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const speechRef = useRef(null); 
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setImage(null);
    setExtractedText(null)


  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setImage(null);
    setExtractedText(null)



  };
  const handleClose=()=>{
    window.speechSynthesis.cancel();
    
    // Clear the ref (optional, but good practice)
    if (speechRef.current) {
      speechRef.current = null;
    }
    setIsModalOpen(false);
    setImage(undefined);
    setExtractedText(null);

    
  }
  
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setExtractedText("");
    }
  };

  const handleOCR = () => {
    if (!image) return;

    setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .then(({ data: { text } }) => {
        setExtractedText(text);
        speakText(text); // Optional: Speak it
      })
      .catch((err) => {
        console.error("OCR Error:", err);
        setExtractedText("Error reading text");
      })
      .finally(() => setLoading(false));
  };

  const speakText = (text) => {
    if (!text) return; // Skip if text is empty/null
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // You can make this dynamic
    speechRef.current = utterance;
    utterance.onend = () => {
      speechRef.current = null; // Clear ref when done
    };
    window.speechSynthesis.speak(utterance);
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied!");
    });
  };

  return (
    <div style={{ maxWidth: "0px", margin: "0px", }}>
         <Button color="dark" variant="solid" 
        style={{
          backgroundColor:"#545359" ,
          border: "none",
          borderRadius: "10px",
          padding: "18px 10px 18px 0px",
          cursor: "pointer",
        }} type="" onClick={showModal}>
         <h2 className=""> <img width="25" height="25" src="https://img.icons8.com/color/48/document--v1.png" alt="document--v1"/></h2>     
          </Button>
          <Modal title="Text Recognition" open={isModalOpen } destroyOnClose onOk={handleOk} onCancel={handleCancel} onClose={handleClose} footer={null} >
          <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div style={{ marginTop: 20 }}>
          <img src={image} alt="Preview" style={{ width: "100%" }} />
          <button onClick={handleOCR} style={{ marginTop: 10 }}>
            📖 Start OCR
          </button>
          {/* {voiceOutput ? "🔊" : "🔇"} */}
        </div>
      )}

      {loading && <p>🔄 Recognizing text... {progress}%</p>}

      {extractedText && (
        <div style={{ marginTop: 20 }}>
          <h3>📝 Extracted Text</h3>
          <textarea
          className=""
          copyToClipboard={copyToClipboard}

            rows={8}
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
      )}
        
      </Modal>
  
      
    </div>
  );
};

export default OCRWithSpeech;
