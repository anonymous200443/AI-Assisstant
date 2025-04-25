import { motion } from "framer-motion";
import Lottie from "lottie-react";
import botui from "./../assets/bot_ui.json";
// import { TailSpin } from "react-loader-spinner"; // Make sure this is installed
import { Spin } from "antd";

const bubbleVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 26,
    },
  },
  exit: { opacity: 0, y: -20, scale: 0.9 },
};

export default function ChatBubble({ msg, darkMode, copyToClipboard, loading }) {
  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        display: "flex",
        justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      {msg.type === "bot" && (
        <div style={{ marginRight: 10 }}>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Lottie animationData={botui} loop style={{ height: 60 }} />
          )}
        </div>
      )}

      <div
        style={{
          maxWidth: "70%",
          backgroundColor: darkMode ? "#555" : "gray",
          padding: "10px 15px",
          borderRadius: 20,
          color: "white",
          position: "relative",
          wordBreak: "break-word",
        }}
      >
        {msg.content}
        {msg.type === "bot" && (
          <button
            onClick={() => copyToClipboard(msg.content)}
            style={{
              marginTop: 5,
              marginLeft: 10,
              fontSize: 10,
              padding: "2px 5px",
              borderRadius: 5,
              background: "#333",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Copy
          </button>
        )}
      </div>
    </motion.div>
  );
}
