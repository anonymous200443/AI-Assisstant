// components/ChatMessages/ChatMessages.jsx
import ChatBubble from "./ChatBubble";
import { Spin } from 'antd';

export default function ChatMessages({ messages, darkMode, copyToClipboard, chatEndRef }) {
  // const [loading, setLoading] = useState(false);

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
       {/* {loading && (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
      <Spin
        height="40"
        width="40"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
        size="large"
      />
    </div>
  )} */}

      <div ref={chatEndRef} />
    </div>
  );
}
