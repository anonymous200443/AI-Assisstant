// components/ChatMessages/ChatMessages.jsx
import ChatBubble from "./ChatBubble";

export default function ChatMessages({ messages, darkMode, copyToClipboard, chatEndRef }) {
  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px 10px 10px 10px",
        border: "1px solid #ccc",
        borderRadius: 10,
        maxHeight: "75vh",
        maxWidth:"",
        scrollbarWidth: "thin",
      }}
    >
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          msg={msg}
          darkMode={darkMode}
          copyToClipboard={copyToClipboard}
        />
      ))}

      <div ref={chatEndRef} />
    </div>
  );
}
