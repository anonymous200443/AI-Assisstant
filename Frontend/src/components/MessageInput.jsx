
// import '../App.css'
// import { Button,Flex } from "antd";
// import { Input } from 'antd';
// const { TextArea } = Input;

// export default function MessageInput({
//   message,
//   setMessage,
//   handleSubmit,
//   startListening,
//   listening
// }) {
//   return (
//     <>
//       <TextArea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Speak or type your question..."
//         rows={4}
//         cols={60}
//         style={{ width: "100%", marginBottom: 10 }}
//         autoSize={{ minRows: 2, maxRows: 5 }}
        
//       />
//       <br />
// <Flex gap="small">
//       <Button  style={{width:150}} width='50px' onClick={startListening} disabled={listening} >
//         {listening ? "🎙️ Listening..." : "🎙️ Start Voice Input"}
//       </Button>
//       <Button variant='outlined' onClick={handleSubmit} style={{ marginLeft: 10 ,width:50}}>
//         Send
//       </Button>
      
//       </Flex>
//     </>
//   );
// }
import React from "react";

import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  AudioOutlined,
} from '@ant-design/icons';
import { Button, Popover } from "antd";
import OCRWithSpeech from "./OcrWithSpeech";

const MessageInput = ({
  message,
  setMessage,
  handleSubmit,
  startListening,
  listening,
  voiceOutput,
  toggleVoice,
  clearChat,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        gap: "10px",
        backgroundColor: "",
        borderRadius: "10px",
        marginTop: "10px",
      }}
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          resize: "none",
          height: "40px",
          
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      
      {/* Send Button */}
      <Popover content="Send">
      <Button
        onClick={handleSubmit}
        title="Send"
        // backgroundColor={545356}
        style={{
          backgroundColor: "#545359",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "18px 12px",
          cursor: "pointer",
        }}
      >
        ➤
      </Button>
      </Popover>

      {/* Voice Input Button */}
      <Popover content="Microphone">
      <Button
        onClick={startListening}
        title="Voice Input"
        style={{
          backgroundColor: listening ? "#545359" : "#545359",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "18px 12px",
          cursor: "pointer",
        }}
      >
        <AudioOutlined/>
      </Button>
      </Popover>


      {/* Voice Toggle Button */}
      <Popover content={voiceOutput ? "Speaker On" : "Speaker Off"}>
      <Button
      
      
        onClick={toggleVoice}
        title="Toggle Voice Output"
        style={{
          backgroundColor: voiceOutput ? "#545359" : "🔇",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "18px 12px",
          cursor: "pointer",
          
        }}
      >
         {voiceOutput ? "🔊" : "🔇"}
      </Button>
      </Popover>

      {/* Clear Chat Button */}
      <Popover content="Clear Chat">
      <Button
        onClick={clearChat}
        title="Clear Chat"
       color="dark" variant="solid"
        style={{
          backgroundColor:"#545359" ,
          border: "none",
          borderRadius: "10px",
          padding: "18px 12px",
          cursor: "pointer",
        }}
      >
        🗑
      </Button>
      </Popover>
      <Popover content="Extract Text">
        <Button 
       
       color="dark" variant="solid"
        style={{
          backgroundColor:"#545359" ,
          border: "none",
          borderRadius: "10px",
          padding: "18px 15px",
          cursor: "pointer",
        }}>

          <OCRWithSpeech/>
        </Button>
        
        
      </Popover>
    </div>
  );
};

export default MessageInput;
